package service

import (
	"context"
	"github.com/mikethehud/glancegg/packages/server/db/queries"
	"github.com/mikethehud/glancegg/packages/server/types"
	"github.com/pkg/errors"
)

func (s *Service) GetUserWithID(ctx context.Context, userID string) (*types.User, error) {
	u, err := queries.GetUserByID(ctx, s.dbx, userID)
	if err != nil {
		return nil, errors.Wrap(err, "cannot retrieve user")
	}
	return u, nil
}
