package resolver

import (
	"context"
	"github.com/mikethehud/glancegg/packages/server/graph/model"
	"github.com/mikethehud/glancegg/packages/server/utils"
	"github.com/pkg/errors"
)

func (r *mutationResolver) CreateCheckIn(ctx context.Context, input model.CreateCheckInInput) (string, error) {
	if !utils.IsAdmin(ctx) {
		return "", errors.New(utils.ErrorNoAccess)
	}

	checkInID, err := r.Service.CreateCheckIn(ctx, input.UserID)
	if err != nil {
		return "", err
	}

	return checkInID, nil
}
