package utils

import (
	"context"
	"github.com/mikethehud/glancegg/packages/server/types"
)

type contextKey int

const (
	userIDContextKey contextKey = iota
	orgIDContextKey
	roleContextKey
	refreshTokenContextKey
	httpWriterContextKey
)

func ContextUserID(ctx context.Context) string {
	userID := ctx.Value(userIDContextKey)
	if userID != nil {
		return userID.(string)
	}
	return ""
}

func ContextOrgID(ctx context.Context) string {
	orgID, ok := ctx.Value(orgIDContextKey).(*string)
	if !ok || orgID == nil {
		return ""
	}
	return *orgID
}

func ContextRole(ctx context.Context) *types.Role {
	role := ctx.Value(roleContextKey)
	if role != nil {
		return role.(*types.Role)
	}
	return nil
}

func ContextRefreshToken(ctx context.Context) string {
	refreshToken := ctx.Value(refreshTokenContextKey)
	if refreshToken != nil {
		return refreshToken.(string)
	}
	return ""
}

func ContextCookieWriter(ctx context.Context) *CookieWriter {
	w := ctx.Value(httpWriterContextKey)
	if w != nil {
		return w.(*CookieWriter)
	}
	return nil
}

func ContextWithAuthClaims(ctx context.Context, claims *AuthClaims) context.Context {
	ctx = context.WithValue(ctx, userIDContextKey, claims.UserID)
	ctx = context.WithValue(ctx, orgIDContextKey, claims.OrgID)
	ctx = context.WithValue(ctx, roleContextKey, claims.Role)
	return ctx
}

func ContextWithRefreshToken(ctx context.Context, token string) context.Context {
	ctx = context.WithValue(ctx, refreshTokenContextKey, token)
	return ctx
}

func ContextWithCookieWriter(ctx context.Context, cw *CookieWriter) context.Context {
	ctx = context.WithValue(ctx, httpWriterContextKey, cw)
	return ctx
}

func IsAuthenticated(ctx context.Context) bool {
	return ctx.Value(userIDContextKey) != nil && ctx.Value(orgIDContextKey) != nil && ctx.Value(roleContextKey) != nil
}

func IsAdmin(ctx context.Context) bool {
	role := ContextRole(ctx)
	if role == nil {
		return false
	}
	return *role == types.AdminRole
}
