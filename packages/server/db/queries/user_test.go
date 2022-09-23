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
		db := test.CreateTestDB(t)
		orgID, err := CreateOrganization(context.TODO(), db, val, &types.Organization{
			Name: "Test Org",
		})
		require.NoError(t, err)
		insertUser := &types.User{
			Name:           "Mike Hudson",
			Email:          "mike@hudson.nz",
			OrganizationID: orgID,
			Password:       "this is my password",
		}
		userID, err := CreateUser(context.TODO(), db, val, insertUser)
		require.NoError(t, err)
		resUser, err := GetUserByID(context.TODO(), db, userID)
		require.NoError(t, err)
		assert.Equal(t, insertUser.Name, "Mike Hudson")
		assert.Equal(t, insertUser.Email, "mike@hudson.nz")
		err = utils.ComparePassword(resUser.Password, "this is my password")
		assert.NoError(t, err)
	})
	t.Run("Invalid email", func(t *testing.T) {
		db := test.CreateTestDB(t)
		orgID, err := CreateOrganization(context.TODO(), db, val, &types.Organization{
			Name: "Test Org",
		})
		require.NoError(t, err)
		_, err = CreateUser(context.TODO(), db, val, &types.User{
			Name:           "Mike Hudson",
			Email:          "poop",
			OrganizationID: orgID,
			Password:       "this is my password",
		})
		require.Error(t, err)
	})
}
