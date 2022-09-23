package queries

import (
	"context"
	"github.com/mikethehud/glancegg/packages/server/test"
	"github.com/mikethehud/glancegg/packages/server/types"
	"github.com/stretchr/testify/require"
	"testing"
)

func TestCreateOrganization(t *testing.T) {
	t.Run("Can create valid org", func(t *testing.T) {
		db := test.CreateTestDB(t)
		_, err := CreateOrganization(context.TODO(), db, val, &types.Organization{
			Name: "Test Org",
		})
		require.NoError(t, err)
	})
}
