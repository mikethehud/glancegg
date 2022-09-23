package resolver

import (
	"context"
	"github.com/mikethehud/glancegg/packages/server/graph/model"
)

// SignUp lets a user create a new org + user
func (r *mutationResolver) SignUp(ctx context.Context, input model.SignUpInput) (*model.User, error) {
	u, _, err := r.Service.SignUpWithPassword(ctx, input.OrganizationName, input.UserName, input.UserEmail, input.UserPassword)
	if err != nil {
		return nil, err
	}
	return &model.User{
		ID:    u.ID,
		Name:  u.Name,
		Email: u.Email,
	}, nil
}

// LogIn lets a user log in and returns a JWT
func (r *queryResolver) LogIn(ctx context.Context, input model.LogInInput) (*model.User, error) {
	u, err := r.Service.LogInWithPassword(ctx, input.UserEmail, input.UserPassword)
	if err != nil {
		return nil, err
	}
	return &model.User{
		ID:    u.ID,
		Name:  u.Name,
		Email: u.Email,
	}, nil
}
