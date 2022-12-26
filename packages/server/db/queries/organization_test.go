package queries

import (
	"context"
	"github.com/mikethehud/glancegg/packages/server/test"
	"github.com/mikethehud/glancegg/packages/server/types"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"testing"
)

func TestCreateOrganization(t *testing.T) {
	t.Run("Can create valid org", func(t *testing.T) {
		db := test.CreateTestDB(t)
		orgID, err := CreateOrganization(context.TODO(), db, types.Organization{
			Name: "Test Org",
		})
		require.NoError(t, err)
		assert.NotEmpty(t, orgID)
	})
}

func TestGetOrganizationByUserID(t *testing.T) {
	t.Run("Can request org by user ID", func(t *testing.T) {
		ctx := context.TODO()
		db := test.CreateTestDB(t)
		org := createTestOrg(t, ctx, db, types.Organization{
			Name: "Test Org",
		})
		user := createTestUser(t, ctx, db, types.User{
			FirstName:      "Mike",
			LastName:       "Hudson",
			Email:          "poop",
			OrganizationID: &org.ID,
			Password:       "this is my password",
			Role:           types.UserRole,
		})
		org, err := GetOrganizationByUserID(context.TODO(), db, user.ID)
		require.NoError(t, err)
		require.Equal(t, "Test Org", org.Name)
	})
}

func createTestOrg(t *testing.T, ctx context.Context, q QueryRunner, org types.Organization) *types.Organization {
	orgID, err := CreateOrganization(ctx, q, org)
	org.ID = orgID
	require.NoError(t, err)
	return &org
}
