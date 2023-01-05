package service

import (
	"context"
	"github.com/mikethehud/glancegg/packages/server/db/queries"
	"github.com/mikethehud/glancegg/packages/server/types"
	"github.com/mikethehud/glancegg/packages/server/utils"
	"github.com/pkg/errors"
	"strings"
)

func (s *Service) GetUserByID(ctx context.Context, userID string) (*types.User, error) {
	u, err := queries.GetUserByID(ctx, s.dbx, userID)
	if err != nil {
		return nil, utils.InternalError(s.Logger, err, "cannot retrieve user")
	}
	return u, nil
}

func (s *Service) GetUsersReportingTo(ctx context.Context, userID string) ([]*types.User, error) {
	users, err := queries.GetUsersReportingToID(ctx, s.dbx, userID)
	if err != nil {
		return nil, utils.InternalError(s.Logger, err, "cannot retrieve user")
	}
	return users, nil
}

func (s *Service) GetUsersByOrganizationID(ctx context.Context, orgID string) ([]*types.User, error) {
	users, err := queries.GetUsersByOrganizationID(ctx, s.dbx, orgID, nil)
	if err != nil {
		return nil, utils.InternalError(s.Logger, err, "cannot retrieve user")
	}
	return users, nil
}

func (s *Service) UpdateUserPermissions(ctx context.Context, userID string, orgID string, role types.Role, reportingTo *string) (*types.User, error) {
	u, err := queries.UpdateUserPermissions(ctx, s.dbx, userID, orgID, role, reportingTo)
	if err != nil {
		return nil, utils.InternalError(s.Logger, err, "cannot update user")
	}
	return u, nil
}

func (s *Service) LeaveOrganization(ctx context.Context, userID string, orgID string) error {
	if utils.IsAdmin(ctx) {
		adminRole := types.AdminRole
		// make sure we don't allow the last remaining admin to leave
		users, err := queries.GetUsersByOrganizationID(ctx, s.dbx, orgID, &adminRole)
		// count admins
		if err != nil {
			return err
		}
		if len(users) == 1 {
			return errors.New(utils.ErrorOrgLastAdmin)
		}
	}
	_, err := queries.RemoveOrganizationFromUser(ctx, s.dbx, userID, orgID)
	if err != nil {
		return utils.InternalError(s.Logger, err, "error leaving organization")
	}
	return nil
}

func (s *Service) CreateAndJoinOrganization(ctx context.Context, name string) (*types.User, error) {
	tx := s.dbx.MustBegin()
	orgID, err := s.createOrganization(ctx, tx, name)
	if err != nil {
		tx.Rollback()
		return nil, err
	}
	user, err := s.joinOrganization(ctx, tx, utils.ContextUserID(ctx), orgID, types.AdminRole)
	if err != nil {
		tx.Rollback()
		return nil, err
	}
	err = tx.Commit()
	if err != nil {
		return nil, utils.InternalError(s.Logger, err, "error committing CreateAndJoinOrganization transaction")
	}
	return user, nil
}

func (s *Service) DeleteUser(ctx context.Context) error {
	if utils.IsAdmin(ctx) {
		adminRole := types.AdminRole
		// make sure we don't allow the last remaining admin to delete
		users, err := queries.GetUsersByOrganizationID(ctx, s.dbx, utils.ContextOrgID(ctx), &adminRole)
		// count admins
		if err != nil {
			return err
		}
		if len(users) == 1 {
			return errors.New(utils.ErrorOrgLastAdmin)
		}
	}

	return queries.DeleteUser(ctx, s.dbx, utils.ContextUserID(ctx))
}

func (s *Service) GetUserFromCheckIn(ctx context.Context, checkInID string) (*types.User, error) {
	u, err := queries.GetUserFromCheckIn(ctx, s.dbx, checkInID)
	if err != nil {
		return nil, utils.InternalError(s.Logger, err, "cannot fetch user")
	}
	return u, nil
}

// internal functions
func (s *Service) joinOrganization(ctx context.Context, q queries.QueryRunner, userID string, orgID string, role types.Role) (*types.User, error) {
	user, err := queries.JoinOrganization(ctx, q, userID, orgID, role)
	if err != nil {
		return nil, utils.InternalError(s.Logger, err, "error joining organization")
	}
	return user, nil
}

func (s *Service) createUser(ctx context.Context, tx queries.QueryRunner, user types.User) (*types.User, error) {
	// create user
	err := s.valid.Struct(user)
	if err != nil {
		return nil, errors.New(utils.ErrorInvalidInput)
	}
	userID, err := queries.CreateUser(ctx, tx, user)
	if err != nil {
		if strings.Contains(err.Error(), "unique constraint") {
			return nil, errors.New(utils.ErrorAuthUserNotUnique)
		}
		return nil, utils.InternalError(s.Logger, err, "error inserting user into db")
	}
	user.ID = userID

	return &user, nil
}
