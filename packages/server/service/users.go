package service

import (
	"context"
	"github.com/mikethehud/glancegg/packages/server/db/queries"
	"github.com/mikethehud/glancegg/packages/server/types"
	"github.com/mikethehud/glancegg/packages/server/utils"
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
	users, err := queries.GetUsersByOrganizationID(ctx, s.dbx, orgID)
	if err != nil {
		return nil, utils.InternalError(s.Logger, err, "cannot retrieve user")
	}
	return users, nil
}
