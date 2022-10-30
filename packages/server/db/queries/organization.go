package queries

import (
	"context"
	"github.com/go-playground/validator/v10"
	"github.com/google/uuid"
	"github.com/mikethehud/glancegg/packages/server/types"
)

func CreateOrganization(ctx context.Context, q QueryRunner, val *validator.Validate, org *types.Organization) (string, error) {
	query := `
		INSERT INTO organizations (id, name)
		VALUES (:id, :name)
	`

	org.ID = uuid.NewString()
	_, err := q.NamedExecContext(ctx, query, org)
	if err != nil {
		return "", err
	}
	return org.ID, nil
}

func GetOrganizationByID(ctx context.Context, q QueryRunner, orgID string) (*types.Organization, error) {
	query := `
		SELECT * FROM organizations
		WHERE id = $1
	`
	org := &types.Organization{}
	err := q.GetContext(ctx, org, query, orgID)

	if err != nil {
		return nil, err
	}
	return org, nil
}
