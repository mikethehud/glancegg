package queries

import (
	"context"
	"github.com/go-playground/validator/v10"
	"github.com/google/uuid"
	"github.com/mikethehud/glancegg/packages/server/types"
	"github.com/pkg/errors"
	"golang.org/x/crypto/bcrypt"
)

func CreateUser(ctx context.Context, q QueryRunner, valid *validator.Validate, user *types.User) (string, error) {
	query := `
		INSERT INTO users (id, name, email, password, organization_id, role)
		VALUES (:id, :name, :email, :password, :organization_id, :role)
	`

	user.ID = uuid.NewString()
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	user.Password = string(hashedPassword)
	_, err = q.NamedExecContext(ctx, query, user)
	if err != nil {
		return "", err
	}
	return user.ID, nil
}

func GetUserByID(ctx context.Context, q QueryRunner, userID string) (*types.User, error) {
	query := `
		SELECT * FROM users WHERE id = $1
	`

	u := &types.User{}
	err := q.GetContext(ctx, u, query, userID)
	if err != nil {
		return nil, err
	}
	return u, nil
}

func GetUserByEmail(ctx context.Context, q QueryRunner, email string) (*types.User, error) {
	query := `
		SELECT * FROM users WHERE email = $1
	`

	u := &types.User{}
	err := q.GetContext(ctx, u, query, email)
	if err != nil {
		return nil, err
	}
	return u, nil
}

func GetUsersByOrganizationID(ctx context.Context, q QueryRunner, orgID string) ([]*types.User, error) {
	query := `
		SELECT * FROM users WHERE organization_id = $1
	`

	var users []*types.User
	err := q.SelectContext(ctx, &users, query, orgID)
	if err != nil {
		return nil, errors.Wrap(err, "error selecting users")
	}
	return users, nil
}

func GetUsersReportingToID(ctx context.Context, q QueryRunner, userID string) ([]*types.User, error) {
	query := `
		SELECT * FROM users WHERE reports_to = $1
	`

	var users []*types.User
	err := q.SelectContext(ctx, users, query, userID)
	if err != nil {
		return nil, err
	}
	return users, nil
}
