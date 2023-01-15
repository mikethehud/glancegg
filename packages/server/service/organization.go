package service

import (
	"context"
	"database/sql"
	"github.com/mikethehud/glancegg/packages/server/db/queries"
	"github.com/mikethehud/glancegg/packages/server/types"
	"github.com/mikethehud/glancegg/packages/server/utils"
	"github.com/pkg/errors"
)

func (s *Service) GetOrganizationByID(ctx context.Context, orgID string) (*types.Organization, error) {
	org, err := queries.GetOrganizationByID(ctx, s.dbx, orgID)
	if err != nil {
		return nil, errors.Wrap(err, "error retrieving organization")
	}
	return org, nil
}

func (s *Service) GetOrganizationByUserID(ctx context.Context, userID string) (*types.Organization, error) {
	org, err := queries.GetOrganizationByUserID(ctx, s.dbx, userID)
	if err != nil && err != sql.ErrNoRows {
		return nil, errors.Wrap(err, "error retrieving organization")
	}
	return org, nil
}

func (s *Service) RemoveUserFromOrganization(ctx context.Context, userID string, orgID string) (*types.Organization, error) {
	_, err := queries.RemoveOrganizationFromUser(ctx, s.dbx, userID, orgID)
	if err != nil {
		return nil, utils.InternalError(s.Logger, err, "error removing organization from user")
	}
	// we want to return the org with new member list
	return s.GetOrganizationByID(ctx, orgID)
}

func (s *Service) DeleteOrganization(ctx context.Context) error {
	orgID := utils.ContextOrgID(ctx)

	tx := s.dbx.MustBegin()

	// remove all references
	err := queries.RemoveOrganizationFromUsers(ctx, tx, orgID)
	if err != nil {
		_ = tx.Rollback()
		return utils.InternalError(s.Logger, err, "error removing organization from users")
	}

	// remove org
	err = queries.DeleteOrganization(ctx, tx, orgID)
	if err != nil {
		_ = tx.Rollback()
		return utils.InternalError(s.Logger, err, "error deleting organization")
	}

	err = tx.Commit()
	if err != nil {
		return utils.InternalError(s.Logger, err, "error committing delete user transaction")
	}
	return nil
}

func (s *Service) UpdateOrgSettings(ctx context.Context, orgID, timeZone string, checkInWeekday int) (*types.Organization, error) {
	tx := s.dbx.MustBegin()
	o, err := queries.UpdateOrgSettings(ctx, tx, orgID, timeZone, checkInWeekday)
	if err != nil {
		_ = tx.Rollback()
		return nil, utils.InternalError(s.Logger, err, "error updating org settings")
	}

	expiresAt, err := utils.GetNextExpiration(timeZone, checkInWeekday)
	if err != nil {
		_ = tx.Rollback()
		return nil, utils.InternalError(s.Logger, err, "error updating org settings")
	}

	_, err = queries.ExtendCheckInExpiresByOrganizationID(ctx, tx, orgID, expiresAt)
	if err != nil {
		_ = tx.Rollback()
		return nil, utils.InternalError(s.Logger, err, "error extending expires by")
	}

	err = tx.Commit()
	if err != nil {
		return nil, utils.InternalError(s.Logger, err, "error committing update org transaction")
	}
	return o, nil
}

func (s *Service) createOrganization(ctx context.Context, q queries.QueryRunner, name string, timezone string) (string, error) {
	// create org
	org := types.Organization{
		Name:     name,
		Timezone: timezone,
	}
	err := s.valid.Struct(org)
	if err != nil {
		return "", errors.New(utils.ErrorInvalidInput)
	}
	orgID, err := queries.CreateOrganization(ctx, q, org)
	if err != nil {
		return "", utils.InternalError(s.Logger, err, "error inserting organization into db")
	}
	return orgID, nil
}
