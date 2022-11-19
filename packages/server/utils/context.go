package utils

import (
	"context"
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
	orgID := ctx.Value(orgIDContextKey)
	if orgID != nil {
		return orgID.(string)
	}
	return ""
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
