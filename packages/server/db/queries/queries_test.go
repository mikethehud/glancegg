package queries

import (
	"context"
	"github.com/go-playground/validator/v10"
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
	"github.com/mikethehud/glancegg/packages/server/test"
	"github.com/mikethehud/glancegg/packages/server/types"
	"testing"
)

var (
	val *validator.Validate
)

func init() {
	test.RegisterTXDB("../../.env.development")
	val = types.NewValidator()
}

func createBaseTestValues(t *testing.T, ctx context.Context, db *sqlx.DB) (*types.Organization, *types.User, *types.User) {
	org := createTestOrg(t, ctx, db, types.Organization{
		Name: "Test Org",
	})
	reviewer := createTestUser(t, context.TODO(), db, types.User{
		FirstName:      "Mike",
		LastName:       "Hudson",
		Email:          "reporter@hudson.nz",
		OrganizationID: &org.ID,
		ReportsTo:      nil,
		Password:       "this is my password",
		Role:           types.AdminRole,
	})
	user := createTestUser(t, context.TODO(), db, types.User{
		FirstName:      "Mike",
		LastName:       "Hudson",
		Email:          "test@hudson.nz",
		OrganizationID: &org.ID,
		ReportsTo:      &reviewer.ID,
		Password:       "this is my password",
		Role:           types.UserRole,
	})

	return org, reviewer, user
}
