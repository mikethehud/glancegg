package resolver

import (
	"context"
	"github.com/mikethehud/glancegg/packages/server/graph/model"
	"github.com/mikethehud/glancegg/packages/server/types"
	"github.com/mikethehud/glancegg/packages/server/utils"
	"github.com/pkg/errors"
	"github.com/sirupsen/logrus"
)

// SignUpWithOrg creates a new user at the existing org
func (r *mutationResolver) SignUpWithOrg(ctx context.Context, input model.SignUpWithOrgInput) (string, error) {
	u, err := r.Service.SignUpWithOrg(ctx, &input)
	if err != nil {
		return "", err
	}
	return returnTokens(ctx, r.Service.Logger, u)
}

// SignUpWithoutOrg creates a new user and a new org
func (r *mutationResolver) SignUpWithoutOrg(ctx context.Context, input model.SignUpWithoutOrgInput) (string, error) {
	u, err := r.Service.SignUpWithoutOrg(ctx, &input)
	if err != nil {
		return "", err
	}
	return returnTokens(ctx, r.Service.Logger, u)
}

func returnTokens(ctx context.Context, logger *logrus.Logger, user *types.User) (string, error) {
	authToken, refreshToken, err := utils.GenerateTokens(user)
	if err != nil {
		return "", utils.InternalError(logger, err, "error generating tokens")
	}

	// set refresh token cookie
	err = utils.SetRefreshToken(ctx, refreshToken)
	if err != nil {
		return "", errors.Wrap(err, "errors setting refresh token")
	}

	return authToken, nil
}

// LogIn lets a user log in and returns a JWT
func (r *mutationResolver) LogIn(ctx context.Context, input model.LogInInput) (string, error) {
	u, err := r.Service.LogInWithPassword(ctx, input.Email, input.Password)
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
