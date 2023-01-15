package service

import (
	"context"
	"database/sql"
	"github.com/mikethehud/glancegg/packages/server/db/queries"
	"github.com/mikethehud/glancegg/packages/server/types"
	"github.com/mikethehud/glancegg/packages/server/utils"
	"github.com/pkg/errors"
)

func (s *Service) CreateShoutOut(ctx context.Context, userID string, orgID string, checkInID *string, shoutOut string, receiverIDs []string) (string, error) {
	tx := s.dbx.MustBegin()
	so := types.ShoutOut{
		CheckInID:      checkInID,
		UserID:         userID,
		ShoutOut:       shoutOut,
		OrganizationID: orgID,
	}
	shoutOutID, err := queries.CreateShoutOut(ctx, tx, so)
	if err != nil {
		tx.Rollback()
		return "", utils.InternalError(s.Logger, err, "couldn't save shoutOut")
	}

	for _, rID := range receiverIDs {
		err := queries.AddShoutOutReceiver(ctx, tx, shoutOutID, rID)
		if err != nil {
			tx.Rollback()
			return "", utils.InternalError(s.Logger, err, "couldn't add receiver to shoutOut")
		}
	}

	err = tx.Commit()
	if err != nil {
		return "", utils.InternalError(s.Logger, err, "couldn't commit transaction")
	}

	return shoutOutID, nil
}

func (s *Service) GetShoutOutsByOrganizationID(ctx context.Context, organizationID string, checkInID *string) ([]*types.ShoutOut, error) {
	shoutOuts, err := queries.GetShoutOutsByOrganizationID(ctx, s.dbx, organizationID, checkInID)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, nil
		}
		return nil, utils.InternalError(s.Logger, err, "couldn't retrieve shout outs")
	}
	return shoutOuts, nil
}
