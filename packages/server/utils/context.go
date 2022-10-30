package utils

import (
	"context"
)

type contextKey int

const (
	userIDContextKey contextKey = iota
	orgIDContextKey  contextKey = iota
)

func ContextUserID(ctx context.Context) string {
	userID := ctx.Value(userIDContextKey)
	if userID != nil {
		return userID.(string)
	}
	return ""
}

func ContextOrgID(ctx context.Context) string {
	orgID := ctx.Value(orgIDContextKey)
	if orgID != nil {
		return orgID.(string)
	}
	return ""
}

func ContextWithAuthClaims(ctx context.Context, claims *AuthClaims) context.Context {
	ctx = context.WithValue(ctx, userIDContextKey, claims.UserID)
	ctx = context.WithValue(ctx, orgIDContextKey, claims.OrgID)
	return ctx
}

func IsAuthenticated(ctx context.Context) bool {
	return ctx.Value(userIDContextKey) != nil && ctx.Value(orgIDContextKey) != nil
}
