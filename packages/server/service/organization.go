package service

import (
	"context"
	"github.com/mikethehud/glancegg/packages/server/db/queries"
	"github.com/mikethehud/glancegg/packages/server/types"
	"github.com/pkg/errors"
)

func (s *Service) GetOrganizationByID(ctx context.Context, orgID string) (*types.Organization, error) {
	org, err := queries.GetOrganizationByID(ctx, s.dbx, orgID)
	if err != nil {
		return nil, errors.Wrap(err, "error retrieving organization")
	}
	return org, nil
}
