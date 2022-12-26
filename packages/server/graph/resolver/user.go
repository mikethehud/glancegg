package resolver

import (
	"context"
	"github.com/mikethehud/glancegg/packages/server/graph/generated"
	"github.com/mikethehud/glancegg/packages/server/graph/model"
	"github.com/mikethehud/glancegg/packages/server/types"
	"github.com/mikethehud/glancegg/packages/server/utils"
	"github.com/pkg/errors"
)

type userResolver struct{ *Resolver }

// User returns generated.UserResolver implementation.
func (r *Resolver) User() generated.UserResolver { return &userResolver{r} }

func (r *userResolver) Organization(ctx context.Context, user *model.User) (*model.Organization, error) {
	if !utils.IsAuthenticated(ctx) {
		return nil, errors.New(utils.ErrorNoAccess)
	}

	org, err := r.Service.GetOrganizationByUserID(ctx, user.ID)
	if err != nil {
		return nil, err
	}

	return org.ToModel(), nil
}

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

func (r *mutationResolver) UpdateUserPermissions(ctx context.Context, userID string, input model.UpdateUserPermissionsInput) (*model.User, error) {
	if !utils.IsAuthenticated(ctx) || !utils.IsAdmin(ctx) {
		return nil, errors.New(utils.ErrorNoAccess)
	}

	role, err := types.RoleFromString(*input.Role)
	if err != nil {
		return nil, errors.New(utils.ErrorInvalidInput)
	}

	user, err := r.Service.UpdateUserPermissions(ctx, userID, utils.ContextOrgID(ctx), role, input.ReportsTo)
	if err != nil {
		return nil, err
	}
	return user.ToModel(), nil
}

func (r *mutationResolver) RemoveUserFromOrganization(ctx context.Context, userID string) (*model.Organization, error) {
	if !utils.IsAuthenticated(ctx) || !utils.IsAdmin(ctx) {
		return nil, errors.New(utils.ErrorNoAccess)
	}

	if utils.ContextUserID(ctx) == userID {
		// removing themselves, use leave logic instead
		return nil, r.Service.LeaveOrganization(ctx, userID, utils.ContextOrgID(ctx))
	}

	org, err := r.Service.RemoveUserFromOrganization(ctx, userID, utils.ContextOrgID(ctx))
	if err != nil {
		return nil, err
	}
	return org.ToModel(), nil
}

func (r *mutationResolver) LeaveOrganization(ctx context.Context) (*bool, error) {
	if !utils.IsAuthenticated(ctx) {
		return nil, errors.New(utils.ErrorNoAccess)
	}

	err := r.Service.LeaveOrganization(ctx, utils.ContextUserID(ctx), utils.ContextOrgID(ctx))
	return nil, err
}

func (r *mutationResolver) CreateOrganizationAndJoin(ctx context.Context, input model.CreateOrganizationAndJoinInput) (*model.User, error) {
	user, err := r.Service.CreateAndJoinOrganization(ctx, input.Name)
	if err != nil {
		return nil, err
	}
	return user.ToModel(), nil
}

func (r *mutationResolver) DeleteUser(ctx context.Context) (*bool, error) {
	return nil, r.Service.DeleteUser(ctx)
}
