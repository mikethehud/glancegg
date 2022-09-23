package queries

import (
	"context"
	"github.com/go-playground/validator/v10"
	"github.com/google/uuid"
	"github.com/mikethehud/glancegg/packages/server/types"
	"github.com/pkg/errors"
)

const createTeamQuery = `
	INSERT INTO users (id, name, email, password, organization_id)
	VALUES (:id, :name, :email, :password, :organization_id)
`

func CreateTeam(ctx context.Context, q QueryRunner, valid *validator.Validate, user *types.User) error {
	user.ID = uuid.NewString()
	err := valid.Struct(user)
	if err != nil {
		return errors.Wrap(err, "user struct validation failed")
	}
	_, err = q.NamedExecContext(ctx, createTeamQuery, user)
	if err != nil {
		return errors.Wrap(err, "error creating user")
	}
	return nil
}
