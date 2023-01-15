package resolver

import (
	"context"
	"github.com/mikethehud/glancegg/packages/server/graph/model"
	"github.com/mikethehud/glancegg/packages/server/utils"
	"github.com/pkg/errors"
)

func (r *mutationResolver) CreateShoutOut(ctx context.Context, input model.ShoutOutInput) (string, error) {
	if !utils.IsAuthenticated(ctx) {
		return "", errors.New(utils.ErrorNoAccess)
	}

	orgID := utils.ContextOrgID(ctx)
	if orgID == "" {
		return "", errors.New(utils.ErrorNoAccess)
	}

	shoutOutID, err := r.Service.CreateShoutOut(ctx, utils.ContextUserID(ctx), orgID, input.CheckInID, input.ShoutOut, input.ReceiverIDs)
	if err != nil {
		return "", err
	}

	return shoutOutID, err
}

func (r *queryResolver) ShoutOuts(ctx context.Context) ([]*model.ShoutOut, error) {
	if !utils.IsAuthenticated(ctx) {
		return nil, errors.New(utils.ErrorNoAccess)
	}
	
	shoutOuts, err := r.Service.GetShoutOutsByOrganizationID(ctx, utils.ContextOrgID(ctx), nil)
	if err != nil {
		return nil, err
	}

	var modelShoutOuts []*model.ShoutOut
	for _, shoutOut := range shoutOuts {
		modelShoutOuts = append(modelShoutOuts, shoutOut.ToModel())
	}

	return modelShoutOuts, nil
}

func (r *queryResolver) ShoutOutsByCheckInID(ctx context.Context, checkInID string) ([]*model.ShoutOut, error) {
	if !utils.IsAuthenticated(ctx) {
		return nil, errors.New(utils.ErrorNoAccess)
	}

	shoutOuts, err := r.Service.GetShoutOutsByOrganizationID(ctx, utils.ContextOrgID(ctx), &checkInID)
	if err != nil {
		return nil, err
	}

	var modelShoutOuts []*model.ShoutOut
	for _, shoutOut := range shoutOuts {
		modelShoutOuts = append(modelShoutOuts, shoutOut.ToModel())
	}

	return modelShoutOuts, nil
}
