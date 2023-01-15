package service

import (
	"context"
	"github.com/mikethehud/glancegg/packages/server/db/queries"
	"github.com/mikethehud/glancegg/packages/server/types"
	"github.com/mikethehud/glancegg/packages/server/utils"
)

func (s *Service) GetQuestionResponses(ctx context.Context, questionID string) ([]*types.Response, error) {
	r, err := queries.GetQuestionResponses(ctx, s.dbx, questionID)
	if err != nil {
		return nil, utils.InternalError(s.Logger, err, "cannot retrieve responses")
	}
	return r, nil
}
