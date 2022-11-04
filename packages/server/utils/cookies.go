package utils

import (
	"context"
	"github.com/pkg/errors"
	"net/http"
	"time"
)

const (
	refreshCookieName = "refresh_token"
)

type CookieWriter struct {
	writer *http.ResponseWriter
}

func NewCookieWriter(writer *http.ResponseWriter) *CookieWriter {
	return &CookieWriter{
		writer: writer,
	}
}

func (cw *CookieWriter) setRefreshToken(token string, expires *time.Time) error {
	http.SetCookie(*cw.writer, &http.Cookie{
		Name:     refreshCookieName,
		Value:    token,
		HttpOnly: true,
		Expires:  *expires,
		Path:     "/",
	})

	return nil
}

func SetRefreshToken(ctx context.Context, token string) error {
	cw := ContextCookieWriter(ctx)
	t, err := ParseRefreshToken(token)
	if err != nil {
		return errors.Wrap(err, "error parsing refresh token")
	}
	return cw.setRefreshToken(token, t.Expires)
}

func GetRefreshToken(r *http.Request) (string, error) {
	c, err := r.Cookie(refreshCookieName)
	if err != nil || c == nil {
		return "", errors.Wrap(err, "invalid refresh cookie")
	}
	return c.Value, nil
}

func DeleteRefreshToken(ctx context.Context, token string) error {
	cw := ContextCookieWriter(ctx)
	deleteExpires := time.Unix(0, 0)
	return cw.setRefreshToken(token, &deleteExpires)
}
