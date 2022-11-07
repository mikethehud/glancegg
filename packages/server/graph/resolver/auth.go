package resolver

import (
	"context"
	"github.com/mikethehud/glancegg/packages/server/graph/model"
	"github.com/mikethehud/glancegg/packages/server/utils"
	"github.com/pkg/errors"
)

// SignUp lets a user create a new org + user
func (r *mutationResolver) SignUp(ctx context.Context, input model.SignUpInput) (*model.SignUpResponse, error) {
	u, _, err := r.Service.SignUpWithPassword(ctx, input.OrganizationName, input.UserName, input.UserEmail, input.UserPassword)
	if err != nil {
		return nil, err
	}

	authToken, refreshToken, err := utils.GenerateTokens(u)
	if err != nil {
		return nil, utils.InternalError(r.Service.Logger, err, "error generating tokens")
	}

	// set refresh token cookie
	err = utils.SetRefreshToken(ctx, refreshToken)
	if err != nil {
		return nil, errors.Wrap(err, "errors setting refresh token")
	}

	return &model.SignUpResponse{
		User: &model.User{
			ID:    u.ID,
			Name:  u.Name,
			Email: u.Email,
		},
		AuthToken: authToken,
	}, nil
}

// LogIn lets a user log in and returns a JWT
func (r *mutationResolver) LogIn(ctx context.Context, input model.LogInInput) (*model.LogInResponse, error) {
	u, err := r.Service.LogInWithPassword(ctx, input.UserEmail, input.UserPassword)
	if err != nil {
		return nil, err
	}

	authToken, refreshToken, err := utils.GenerateTokens(u)
	if err != nil {
		return nil, utils.InternalError(r.Service.Logger, err, "error generating tokens")
	}

	// set refresh token cookie
	err = utils.SetRefreshToken(ctx, refreshToken)
	if err != nil {
		return nil, errors.Wrap(err, "errors setting refresh token")
	}

	return &model.LogInResponse{
		User: &model.User{
			ID:    u.ID,
			Name:  u.Name,
			Email: u.Email,
		},
		AuthToken: authToken,
	}, nil
}

func (r *queryResolver) AuthToken(ctx context.Context) (string, error) {
	// get refresh token from cookie
	token := utils.ContextRefreshToken(ctx)

	r.Service.Logger.Infof("Refresh token: %s", token)

	if token == "" {
		return "", errors.New(utils.ErrorNoAccess)
	}

	claims, err := utils.ParseRefreshToken(token)
	// todo: check if permissions to get new token
	if err != nil {
		return "", err
	}

	u, err := r.Service.GetUserByID(ctx, claims.UserID)
	if err != nil {
		return "", err
	}

	authToken, refreshToken, err := utils.GenerateTokens(u)
	if err != nil {
		return "", utils.InternalError(r.Service.Logger, err, "error generating tokens")
	}

	// set refresh token cookie
	err = utils.SetRefreshToken(ctx, refreshToken)
	if err != nil {
		return "", errors.Wrap(err, "errors setting refresh token")
	}

	return authToken, nil
}

func (r *mutationResolver) LogOut(ctx context.Context) (*bool, error) {
	// get refresh token from cookie
	token := utils.ContextRefreshToken(ctx)
	err := utils.DeleteRefreshToken(ctx, token)
	if err != nil {
		return nil, utils.InternalError(r.Service.Logger, err, "Error deleting refresh token")
	}
	return nil, nil
}
