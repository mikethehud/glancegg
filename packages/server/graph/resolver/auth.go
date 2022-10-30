package resolver

import (
	"context"
	"github.com/mikethehud/glancegg/packages/server/graph/model"
	"github.com/mikethehud/glancegg/packages/server/utils"
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
func (r *queryResolver) LogIn(ctx context.Context, input model.LogInInput) (*model.LogInResponse, error) {
	u, err := r.Service.LogInWithPassword(ctx, input.UserEmail, input.UserPassword)

	authToken, refreshToken, err := utils.GenerateTokens(u)
	if err != nil {
		return nil, utils.InternalError(r.Service.Logger, err, "error generating tokens")
	}

	if err != nil {
		return nil, err
	}
	return &model.LogInResponse{
		User: &model.User{
			ID:    u.ID,
			Name:  u.Name,
			Email: u.Email,
		},
		Tokens: &model.Tokens{
			AuthToken:    authToken,
			RefreshToken: refreshToken,
		},
	}, nil
}

func (r *queryResolver) NewTokens(ctx context.Context, oldToken string) (*model.Tokens, error) {
	claims, err := utils.ParseRefreshToken(oldToken)
	// todo: check if permissions to get new token
	if err != nil {
		return nil, err
	}

	u, err := r.Service.GetUserWithID(ctx, claims.UserID)
	if err != nil {
		return nil, err
	}

	authToken, refreshToken, err := utils.GenerateTokens(u)
	if err != nil {
		return nil, utils.InternalError(r.Service.Logger, err, "error generating tokens")
	}

	return &model.Tokens{
		AuthToken:    authToken,
		RefreshToken: refreshToken,
	}, nil
}
