package utils

import (
	"fmt"
	"github.com/golang-jwt/jwt"
	"github.com/mikethehud/glancegg/packages/server/types"
	"github.com/pkg/errors"
	"time"
)

var SecretKey = []byte("secret")

var (
	authExpiryDuration    = time.Minute * 10
	refreshExpiryDuration = time.Hour * 500
)

type AuthClaims struct {
	UserID string
	OrgID  string
}

type RefreshClaims struct {
	UserID string
}

func GenerateTokens(user *types.User) (string, string, error) {
	authToken, err := newToken(jwt.MapClaims{
		"userID": user.ID,
		"orgID":  user.OrganizationID,
		"exp":    time.Now().Add(authExpiryDuration).Unix(),
	})
	if err != nil {
		return "", "", errors.Wrap(err, "error generating auth token")
	}
	refreshToken, err := newToken(jwt.MapClaims{
		"userID": user.ID,
		"exp":    time.Now().Add(refreshExpiryDuration).Unix(),
	})
	if err != nil {
		return "", "", errors.Wrap(err, "error generating refresh token")
	}

	return authToken, refreshToken, nil
}

func newToken(claims jwt.MapClaims) (string, error) {
	token := jwt.New(jwt.SigningMethodHS256)
	token.Claims = claims

	signedToken, err := token.SignedString(SecretKey)
	if err != nil {
		return "", errors.Wrap(err, "error signing token")
	}
	return signedToken, nil
}

func ParseAuthToken(tokenStr string) (*AuthClaims, error) {
	claims, err := parseToken(tokenStr, authExpiryDuration)
	if err != nil {
		return nil, errors.Wrap(err, "could not parse auth token")
	}

	userID, ok := claims["userID"].(string)
	if !ok {
		return nil, errors.New("could not cast userID as string")
	}

	orgID, ok := claims["orgID"].(string)
	if !ok {
		return nil, errors.New("could not cast orgID as string")
	}

	return &AuthClaims{
		UserID: userID,
		OrgID:  orgID,
	}, nil
}

func ParseRefreshToken(tokenStr string) (*RefreshClaims, error) {
	claims, err := parseToken(tokenStr, refreshExpiryDuration)
	if err != nil {
		return nil, errors.Wrap(err, "could not parse refresh token")
	}

	userID, ok := claims["userId"].(string)
	if !ok {
		return nil, errors.New("could not cast userID as string")
	}

	return &RefreshClaims{
		UserID: userID,
	}, nil
}

func parseToken(tokenStr string, expiry time.Duration) (jwt.MapClaims, error) {
	token, err := jwt.Parse(tokenStr, func(token *jwt.Token) (interface{}, error) {
		return SecretKey, nil
	})

	if err != nil {
		return nil, errors.Wrap(err, "error parsing token")
	}
	if token == nil {
		return nil, errors.New("token must be parsed before it can be verified")
	}
	if !token.Valid {
		return nil, errors.New("signature invalid")
	}

	claims := token.Claims.(jwt.MapClaims)
	if err = validateExpiry(claims["exp"], expiry); err != nil {
		return nil, errors.Wrap(err, "token expired")
	}

	return claims, nil
}

func validateExpiry(expiryClaim interface{}, duration time.Duration) error {
	// parse expiry
	exp, ok := expiryClaim.(float64)
	if !ok {
		fmt.Println(expiryClaim)
		return errors.New("could not cast jwt expiry as float64")
	}

	expTime := time.Unix(int64(exp), 0)

	// make sure expiry is not set too far in the future
	if expTime.After(time.Now().Add(duration)) {
		return errors.New("jwt expiry set too far in future")
	}

	// make sure token is not expired
	if expTime.Before(time.Now()) {
		return errors.New("jwt is expired")
	}

	return nil
}
