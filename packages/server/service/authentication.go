package service

import (
	"context"
	"database/sql"
	"github.com/mikethehud/glancegg/packages/server/db/queries"
	"github.com/mikethehud/glancegg/packages/server/types"
	"github.com/mikethehud/glancegg/packages/server/utils"
	"github.com/pkg/errors"
	"strings"
)

func (s *Service) SignUpWithPassword(ctx context.Context, orgName, userName, userEmail, userPassword string) (*types.User, *types.Organization, error) {
	tx := s.dbx.MustBegin()

	// create org
	org := &types.Organization{
		Name: orgName,
	}
	err := s.valid.Struct(org)
	if err != nil {
		return nil, nil, errors.New(utils.ErrorInvalidInput)
	}
	orgID, err := queries.CreateOrganization(ctx, tx, s.valid, org)
	if err != nil {
		return nil, nil, utils.InternalError(s.Logger, err, "error inserting organisation into db")
	}
	org.ID = orgID

	// create user
	user := &types.User{
		Name:           userName,
		Email:          userEmail,
		OrganizationID: orgID,
		Password:       userPassword,
	}
	err = s.valid.Struct(user)
	if err != nil {
		return nil, nil, errors.New(utils.ErrorInvalidInput)
	}
	userID, err := queries.CreateUser(ctx, tx, s.valid, user)
	if err != nil {
		if strings.Contains(err.Error(), "unique constraint") {
			return nil, nil, errors.New(utils.ErrorAuthUserNotUnique)
		}
		return nil, nil, utils.InternalError(s.Logger, err, "error inserting user into db")
	}
	user.ID = userID

	err = tx.Commit()
	if err != nil {
		return nil, nil, utils.InternalError(s.Logger, err, "error committing signup transaction")
	}
	return user, org, nil
}

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
