package service

import (
	"context"
	"database/sql"
	"github.com/mikethehud/glancegg/packages/server/db/queries"
	"github.com/mikethehud/glancegg/packages/server/graph/model"
	"github.com/mikethehud/glancegg/packages/server/types"
	"github.com/mikethehud/glancegg/packages/server/utils"
	"github.com/pkg/errors"
)

//func (s *Service) SignUpWithPassword(ctx context.Context, input *model.SignUpInput) (*types.User, *types.Organization, error) {
//	tx := s.dbx.MustBegin()
//	var orgID string
//	// default to user role
//	role := types.UserRole
//
//	// no organization ID, create organization
//	if input.OrganizationID == nil {
//		if input.OrganizationName == nil {
//			return nil, nil, errors.New(utils.ErrorInvalidInput)
//		}
//
//		// signup without org id, create org
//		org := &types.Organization{
//			Name: *input.OrganizationName,
//		}
//		err := s.valid.Struct(org)
//		if err != nil {
//			return nil, nil, errors.New(utils.ErrorInvalidInput)
//		}
//		orgID, err = queries.CreateOrganization(ctx, tx, s.valid, org)
//		if err != nil {
//			return nil, nil, utils.InternalError(s.Logger, err, "error inserting organization into db")
//		}
//	} else {
//		orgID = input.OrganizationID
//	}
//
//	// create user
//	user := &types.User{
//		FirstName:      *input.FirstName,
//		LastName:       *input.LastName,
//		Email:          *input.Email,
//		OrganizationID: orgID,
//		Password:       *input.Password,
//		Role:           role,
//	}
//	err = s.valid.Struct(user)
//	if err != nil {
//		return nil, nil, errors.New(utils.ErrorInvalidInput)
//	}
//	userID, err := queries.CreateUser(ctx, tx, s.valid, user)
//	if err != nil {
//		if strings.Contains(err.Error(), "unique constraint") {
//			return nil, nil, errors.New(utils.ErrorAuthUserNotUnique)
//		}
//		return nil, nil, utils.InternalError(s.Logger, err, "error inserting user into db")
//	}
//	user.ID = userID
//
//	err = tx.Commit()
//	if err != nil {
//		return nil, nil, utils.InternalError(s.Logger, err, "error committing signup transaction")
//	}
//	return user, org, nil
//}

func (s *Service) LogInWithPassword(ctx context.Context, email, password string) (*types.User, error) {
	u, err := queries.GetUserByEmail(ctx, s.dbx, email)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, errors.New(utils.ErrorAuthNoUser)
		}
		return nil, utils.InternalError(s.Logger, err, "error selecting user from db")
	}
	err = utils.ComparePassword(u.Password, password)
	if err != nil {
		return nil, errors.New(utils.ErrorAuthWrongPassword)
	}

	return u, nil
}

func (s *Service) SignUpWithoutOrg(ctx context.Context, input *model.SignUpWithoutOrgInput) (*types.User, error) {
	tx := s.dbx.MustBegin()
	orgID, err := s.createOrganization(ctx, tx, input.OrganizationName)
	if err != nil {
		tx.Rollback()
		return nil, err
	}
	user, err := s.createUser(ctx, tx, types.User{
		FirstName: input.FirstName,
		LastName:  input.LastName,
		Email:     input.Email,
		Password:  input.Password,
		// AdminRole as this is a new org
		Role:           types.AdminRole,
		OrganizationID: &orgID,
	})
	if err != nil {
		tx.Rollback()
		return nil, utils.InternalError(s.Logger, err, "error creating user")
	}
	err = tx.Commit()
	if err != nil {
		return nil, utils.InternalError(s.Logger, err, "error committing signup transaction")
	}
	return user, nil
}

func (s *Service) SignUpWithOrg(ctx context.Context, input *model.SignUpWithOrgInput) (*types.User, error) {
	user, err := s.createUser(ctx, s.dbx, types.User{
		FirstName:      input.FirstName,
		LastName:       input.LastName,
		Email:          input.Email,
		Password:       input.Password,
		Role:           types.UserRole,
		OrganizationID: &input.OrganizationID,
	})
	if err != nil {
		return nil, err
	}
	return user, nil
}
