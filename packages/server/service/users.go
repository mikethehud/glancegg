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

func (s *Service) UpdateRole(ctx context.Context, userID string, orgID string, role types.Role) (*types.User, error) {
	u, err := queries.UpdateRole(ctx, s.dbx, userID, orgID, role)
	if err != nil {
		return nil, utils.InternalError(s.Logger, err, "cannot update user")
	}
	return u, nil
}

func (s *Service) UpdateReportsTo(ctx context.Context, userID string, orgID string, reportingTo *string) (*types.User, error) {
	tx := s.dbx.MustBegin()
	u, err := queries.UpdateReportsTo(ctx, tx, userID, orgID, reportingTo)
	if err != nil {
		tx.Rollback()
		return nil, utils.InternalError(s.Logger, err, "error updating reportingTo")
	}

	err = queries.DeleteOpenCheckInsForUserID(ctx, tx, userID)
	if err != nil {
		tx.Rollback()
		return nil, utils.InternalError(s.Logger, err, "error deleting open check ins")
	}

	if reportingTo != nil {
		_, err = s.createCheckInAndQuestionsWithTx(ctx, tx, userID)
		if err != nil {
			tx.Rollback()
			return nil, utils.InternalError(s.Logger, err, "error deleting open check ins")
		}
	}

	err = tx.Commit()
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

func (s *Service) CreateAndJoinOrganization(ctx context.Context, name string, timeZone string) (*types.User, error) {
	tx := s.dbx.MustBegin()
	orgID, err := s.createOrganization(ctx, tx, name, timeZone)
	if err != nil {
		tx.Rollback()
		return nil, err
	}
	user, err := queries.JoinOrganization(ctx, tx, utils.ContextUserID(ctx), orgID, types.AdminRole)
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

func (s *Service) GetReviewerFromCheckIn(ctx context.Context, checkInID string) (*types.User, error) {
	u, err := queries.GetReviewerFromCheckIn(ctx, s.dbx, checkInID)
	if err != nil {
		return nil, utils.InternalError(s.Logger, err, "cannot fetch user")
	}
	return u, nil
}

func (s *Service) JoinOrganization(ctx context.Context, userID string, orgID string) (*types.User, error) {
	user, err := queries.JoinOrganization(ctx, s.dbx, userID, orgID, types.UserRole)
	if err != nil {
		return nil, utils.InternalError(s.Logger, err, "error joining organization")
	}
	return user, nil
}

// internal functions

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
