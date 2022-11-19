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

	return user.ToModel(), nil
}

func (r *queryResolver) GetUsersReportingTo(ctx context.Context) ([]*model.User, error) {
	if !utils.IsAuthenticated(ctx) {
		return nil, errors.New(utils.ErrorNoAccess)
	}

	users, err := r.Service.GetUsersReportingTo(ctx, utils.ContextUserID(ctx))
	if err != nil {
		return nil, err
	}

	var modelUsers []*model.User
	for _, user := range users {
		modelUsers = append(modelUsers, user.ToModel())
	}

	return modelUsers, nil
}
