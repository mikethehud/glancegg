package queries

import (
	"context"
	"github.com/go-playground/validator/v10"
	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"
	"github.com/mikethehud/glancegg/packages/server/types"
)

const createOrganizationQuery = `
	INSERT INTO organizations (id, name)
	VALUES (:id, :name)
`

func CreateOrganization(ctx context.Context, q QueryRunner, val *validator.Validate, org *types.Organization) (string, error) {
	org.ID = uuid.NewString()
	_, err := sqlx.NamedExecContext(ctx, q, createOrganizationQuery, org)
	if err != nil {
		return "", err
	}
	return org.ID, nil
}
