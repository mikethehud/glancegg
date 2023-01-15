package queries

import (
	"context"
	"github.com/mikethehud/glancegg/packages/server/test"
	"github.com/mikethehud/glancegg/packages/server/types"
	"github.com/mikethehud/glancegg/packages/server/utils"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"testing"
)

func TestCreateUser(t *testing.T) {
	t.Run("Works with valid data", func(t *testing.T) {
		ctx := context.TODO()
		db := test.CreateTestDB(t)
		org := createTestOrg(t, ctx, db, types.Organization{
			Name: "Test Org",
		})
		user := types.User{
			FirstName:      "Mike",
			LastName:       "Hudson",
			Email:          "poop",
			OrganizationID: &org.ID,
			Password:       "this is my password",
			Role:           types.AdminRole,
		}
		userID, err := CreateUser(context.TODO(), db, user)
		resUser, err := GetUserByID(context.TODO(), db, userID)
		require.NoError(t, err)
		assert.Equal(t, user.FirstName, resUser.FirstName)
		assert.Equal(t, user.LastName, resUser.LastName)
		assert.Equal(t, user.Email, resUser.Email)
		err = utils.ComparePassword(resUser.Password, user.Password)
		assert.NoError(t, err)
	})
	t.Run("Invalid email", func(t *testing.T) {
		db := test.CreateTestDB(t)
		org := createTestOrg(t, context.TODO(), db, types.Organization{
			Name: "Test Org",
		})
		_, err := CreateUser(context.TODO(), db, types.User{
			FirstName:      "Mike",
			LastName:       "Hudson",
			Email:          "poop",
			OrganizationID: &org.ID,
			Password:       "this is my password",
		})
		require.Error(t, err)
	})
}

func TestUpdateUserPermissions(t *testing.T) {
	t.Run("Works", func(t *testing.T) {
		db := test.CreateTestDB(t)
		org := createTestOrg(t, context.TODO(), db, types.Organization{
			Name: "Test Org",
		})
		user := createTestUser(t, context.TODO(), db, types.User{
			FirstName:      "Mike",
			LastName:       "Hudson",
			Email:          "testing@hudson.nz",
			OrganizationID: &org.ID,
			ReportsTo:      nil,
			Password:       "this is my password",
			Role:           types.AdminRole,
		})
		reviewer := createTestUser(t, context.TODO(), db, types.User{
			FirstName:      "Mike",
			LastName:       "Hudson",
			Email:          "reviewer@hudson.nz",
			OrganizationID: &org.ID,
			ReportsTo:      nil,
			Password:       "this is my password",
			Role:           types.AdminRole,
		})
		role := types.UserRole
		u, err := UpdateUserPermissions(context.TODO(), db, user.ID, org.ID, &role, nil)
		require.NoError(t, err)
		require.Equal(t, types.UserRole, u.Role)
		require.Nil(t, u.ReportsTo)
		u, err = UpdateUserPermissions(context.TODO(), db, user.ID, org.ID, &role, &reviewer.ID)
		require.NoError(t, err)
		require.Equal(t, types.UserRole, u.Role)
		require.Equal(t, reviewer.ID, *u.ReportsTo)
	})
}

func createTestUser(t *testing.T, ctx context.Context, q QueryRunner, user types.User) *types.User {
	userID, err := CreateUser(ctx, q, user)
	user.ID = userID
	require.NoError(t, err)
	return &user
}
