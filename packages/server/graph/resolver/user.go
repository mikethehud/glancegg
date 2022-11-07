package resolver

import (
	"context"
	"github.com/mikethehud/glancegg/packages/server/graph/model"
	"github.com/mikethehud/glancegg/packages/server/utils"
	"github.com/pkg/errors"
)

func (r *queryResolver) User(ctx context.Context) (*model.User, error) {
	if !utils.IsAuthenticated(ctx) {
		return nil, errors.New(utils.ErrorNoAccess)
	}

	user, err := r.Service.GetUserByID(ctx, utils.ContextUserID(ctx))
	if err != nil {
		return nil, err
	}

	return &model.User{
		ID:    user.ID,
		Name:  user.Name,
		Email: user.Email,
	}, nil
}
