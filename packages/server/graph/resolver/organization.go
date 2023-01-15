package resolver

import (
	"context"
	"github.com/mikethehud/glancegg/packages/server/graph/generated"
	"github.com/mikethehud/glancegg/packages/server/graph/model"
	"github.com/mikethehud/glancegg/packages/server/utils"
	"github.com/pkg/errors"
)

type organizationResolver struct{ *Resolver }

// Organization returns generated.OrganizationResolver implementation.
func (r *Resolver) Organization() generated.OrganizationResolver { return &organizationResolver{r} }

func (r *organizationResolver) Members(ctx context.Context, org *model.Organization) ([]*model.User, error) {
	if !utils.IsAuthenticated(ctx) {
		return nil, errors.New(utils.ErrorNoAccess)
	}

	users, err := r.Service.GetUsersByOrganizationID(ctx, org.ID)
	if err != nil {
		return nil, err
	}

	var modelUsers []*model.User
	for _, user := range users {
		modelUsers = append(modelUsers, user.ToModel())
	}

	return modelUsers, nil
}

func (r *queryResolver) Organization(ctx context.Context) (*model.Organization, error) {
	if !utils.IsAuthenticated(ctx) {
		return nil, errors.New(utils.ErrorNoAccess)
	}
	orgID := utils.ContextOrgID(ctx)
	if orgID == "" {
		return nil, nil
	}

	org, err := r.Service.GetOrganizationByID(ctx, utils.ContextOrgID(ctx))
	if err != nil {
		return nil, err
	}

	return org.ToModel(), nil
}

func (r *queryResolver) OrganizationInfo(ctx context.Context, id string) (*model.OrganizationInfo, error) {
	org, err := r.Service.GetOrganizationByID(ctx, id)
	if err != nil {
		return nil, err
	}

	return &model.OrganizationInfo{
		ID:   org.ID,
		Name: org.Name,
	}, nil
}

func (r *mutationResolver) DeleteOrganization(ctx context.Context) (*bool, error) {
	if !utils.IsAuthenticated(ctx) || !utils.IsAdmin(ctx) {
		return nil, errors.New(utils.ErrorNoAccess)
	}

	return nil, r.Service.DeleteOrganization(ctx)
}

func (r *mutationResolver) UpdateOrgSettings(ctx context.Context, input model.OrgSettingsInput) (*model.Organization, error) {
	if !utils.IsAuthenticated(ctx) || !utils.IsAdmin(ctx) {
		return nil, errors.New(utils.ErrorNoAccess)
	}

	org, err := r.Service.UpdateOrgSettings(ctx, utils.ContextOrgID(ctx), input.Timezone, input.CheckInWeekday)
	if err != nil {
		return nil, err
	}
	return org.ToModel(), err
}
