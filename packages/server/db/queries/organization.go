package queries

import (
	"context"
	"github.com/google/uuid"
	"github.com/mikethehud/glancegg/packages/server/types"
)

func CreateOrganization(ctx context.Context, q QueryRunner, org types.Organization) (string, error) {
	query := `
		INSERT INTO organizations (id, name, timezone)
		VALUES (:id, :name, :timezone)
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

func GetOrganizationByUserID(ctx context.Context, q QueryRunner, userID string) (*types.Organization, error) {
	query := `
		SELECT * FROM organizations
		WHERE id = (SELECT organization_id FROM users WHERE id = $1)
	`
	org := &types.Organization{}
	err := q.GetContext(ctx, org, query, userID)

	if err != nil {
		return nil, err
	}
	return org, nil
}

func DeleteOrganization(ctx context.Context, q QueryRunner, orgID string) error {
	query := `
		DELETE FROM organizations WHERE id = $1

	`

	_, err := q.ExecContext(ctx, query, orgID)
	return err
}

func UpdateOrgSettings(ctx context.Context, q QueryRunner, orgID string, timeZone string, checkInWeekday int) (*types.Organization, error) {
	query := `
UPDATE organizations SET
timezone = $1,
check_in_weekday = $2
WHERE id = $3
RETURNING *
	`

	o := types.Organization{}

	err := q.QueryRowxContext(ctx, query, timeZone, checkInWeekday, orgID).StructScan(&o)
	if err != nil {
		return nil, err
	}

	return &o, nil
}
