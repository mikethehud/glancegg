package queries

import (
	"context"
	"github.com/mikethehud/glancegg/packages/server/test"
	"github.com/mikethehud/glancegg/packages/server/types"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"testing"
)

func TestCreateShoutOut(t *testing.T) {
	ctx := context.TODO()
	db := test.CreateTestDB(t)
	org, userA, userB := createBaseTestValues(t, ctx, db)

	t.Run("without checkin", func(t *testing.T) {
		shoutOutID, err := CreateShoutOut(ctx, db, types.ShoutOut{
			UserID:         userA.ID,
			ShoutOut:       "Nice work",
			CheckInID:      nil,
			OrganizationID: org.ID,
		})
		require.NoError(t, err)
		assert.NotEmpty(t, shoutOutID)
	})

	t.Run("with checkin", func(t *testing.T) {
		checkInID, err := CreateCheckIn(ctx, db, types.CheckIn{
			OrganizationID: *userB.OrganizationID,
			UserID:         userB.ID,
			ReviewerUserID: userA.ID,
		})
		require.NoError(t, err)
		shoutOutID, err := CreateShoutOut(ctx, db, types.ShoutOut{
			UserID:         userB.ID,
			ShoutOut:       "Nice work",
			CheckInID:      &checkInID,
			OrganizationID: org.ID,
		})
		require.NoError(t, err)
		assert.NotEmpty(t, shoutOutID)
	})
}

func TestAddShoutOutReceiver(t *testing.T) {
	ctx := context.TODO()
	db := test.CreateTestDB(t)
	org, userA, userB := createBaseTestValues(t, ctx, db)
	shoutOutID, err := CreateShoutOut(ctx, db, types.ShoutOut{
		UserID:         userA.ID,
		ShoutOut:       "Nice work",
		OrganizationID: org.ID,
	})
	require.NoError(t, err)
	err = AddShoutOutReceiver(ctx, db, shoutOutID, userB.ID)
	require.NoError(t, err)
}

func TestGetShoutOutsByOrganizationID(t *testing.T) {
	ctx := context.TODO()
	db := test.CreateTestDB(t)
	org, userA, userB := createBaseTestValues(t, ctx, db)

	// shoutOut 1
	shoutOutID, err := CreateShoutOut(ctx, db, types.ShoutOut{
		UserID:         userA.ID,
		ShoutOut:       "Nice work",
		OrganizationID: org.ID,
	})
	require.NoError(t, err)
	err = AddShoutOutReceiver(ctx, db, shoutOutID, userB.ID)
	require.NoError(t, err)

	// shoutOut 1
	shoutOut2ID, err := CreateShoutOut(ctx, db, types.ShoutOut{
		UserID:         userA.ID,
		ShoutOut:       "Nice work",
		OrganizationID: org.ID,
	})
	require.NoError(t, err)
	err = AddShoutOutReceiver(ctx, db, shoutOut2ID, userB.ID)
	require.NoError(t, err)
	err = AddShoutOutReceiver(ctx, db, shoutOut2ID, userA.ID)
	require.NoError(t, err)

	result, err := GetShoutOutsByOrganizationID(ctx, db, org.ID, nil)
	require.NoError(t, err)
	assert.Equal(t, 2, len(result))
	assert.Equal(t, 1, len(result[0].Receivers))
	assert.Equal(t, 2, len(result[1].Receivers))
}
