package resolver

import (
	"context"
	"github.com/mikethehud/glancegg/packages/server/graph/model"
	"github.com/mikethehud/glancegg/packages/server/utils"
	"github.com/pkg/errors"
)

func (r *queryResolver) Organization(ctx context.Context) (*model.Organization, error) {
	if !utils.IsAuthenticated(ctx) {
		return nil, errors.New(utils.ErrorNoAccess)
	}

	org, err := r.Service.GetOrganizationByID(ctx, utils.ContextOrgID(ctx))
	if err != nil {
		return nil, err
	}

	return &model.Organization{
		ID:   org.ID,
		Name: org.Name,
	}, nil
}
