package queries

import (
	"context"
	"github.com/mikethehud/glancegg/packages/server/test"
	"github.com/mikethehud/glancegg/packages/server/types"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"testing"
)

func TestCreateCheckIn(t *testing.T) {
	ctx := context.TODO()
	db := test.CreateTestDB(t)
	_, reviewer, user := createBaseTestValues(t, ctx, db)
	_, err := CreateCheckIn(ctx, db, types.CheckIn{
		OrganizationID: *user.OrganizationID,
		UserID:         user.ID,
		ReviewerUserID: reviewer.ID,
	})
	require.NoError(t, err)
}

func TestGetCheckInsByUserID(t *testing.T) {
	ctx := context.TODO()
	db := test.CreateTestDB(t)
	org, reviewer, user := createBaseTestValues(t, ctx, db)
	_, err := CreateCheckIn(ctx, db, types.CheckIn{
		OrganizationID: *user.OrganizationID,
		UserID:         user.ID,
		ReviewerUserID: reviewer.ID,
	})
	require.NoError(t, err)
	checkIns, err := GetCheckInsByUserID(ctx, db, user.ID)
	require.NoError(t, err)
	assert.Len(t, checkIns, 1)
	assert.Equal(t, checkIns[0].UserID, user.ID)
	assert.Equal(t, checkIns[0].OrganizationID, org.ID)
}

func TestCreateQuestion(t *testing.T) {
	ctx := context.TODO()
	db := test.CreateTestDB(t)
	_, reviewer, user := createBaseTestValues(t, ctx, db)
	checkInID, err := CreateCheckIn(ctx, db, types.CheckIn{
		OrganizationID: *user.OrganizationID,
		UserID:         user.ID,
		ReviewerUserID: reviewer.ID,
	})
	require.NoError(t, err)
	q1ID, err := CreateQuestion(ctx, db, types.GQTPulse(), checkInID, 1)
	require.NoError(t, err)
	assert.NotEmpty(t, q1ID)
	q2ID, err := CreateQuestion(ctx, db, types.GQTPriorities(), checkInID, 2)
	require.NoError(t, err)
	assert.NotEmpty(t, q2ID)
	q3ID, err := CreateQuestion(ctx, db, types.GQTSuccesses(), checkInID, 3)
	require.NoError(t, err)
	assert.NotEmpty(t, q3ID)
	q4ID, err := CreateQuestion(ctx, db, types.GQTChallenges(), checkInID, 4)
	require.NoError(t, err)
	assert.NotEmpty(t, q4ID)
}

func TestGetCheckInQuestions(t *testing.T) {
	ctx := context.TODO()
	db := test.CreateTestDB(t)
	_, reviewer, user := createBaseTestValues(t, ctx, db)
	checkInID, err := CreateCheckIn(ctx, db, types.CheckIn{
		OrganizationID: *user.OrganizationID,
		UserID:         user.ID,
		ReviewerUserID: reviewer.ID,
	})
	require.NoError(t, err)
	pulse := types.GQTPulse()
	priorities := types.GQTPriorities()
	successes := types.GQTSuccesses()
	challenges := types.GQTChallenges()
	_, err = CreateQuestion(ctx, db, pulse, checkInID, 1)
	require.NoError(t, err)
	_, err = CreateQuestion(ctx, db, priorities, checkInID, 2)
	require.NoError(t, err)
	_, err = CreateQuestion(ctx, db, successes, checkInID, 3)
	require.NoError(t, err)
	_, err = CreateQuestion(ctx, db, challenges, checkInID, 4)
	require.NoError(t, err)
	questions, err := GetCheckInQuestions(ctx, db, checkInID)
	require.NoError(t, err)
	assert.Len(t, questions, 4)
	assert.Equal(t, "PULSE", questions[0].QuestionType)
	assert.Equal(t, "PRIORITIES", questions[1].QuestionType)
	assert.Equal(t, "SUCCESSES", questions[2].QuestionType)
	assert.Equal(t, "CHALLENGES", questions[3].QuestionType)
}

func TestCreateResponse(t *testing.T) {
	ctx := context.TODO()
	db := test.CreateTestDB(t)
	_, reviewer, user := createBaseTestValues(t, ctx, db)
	checkInID, err := CreateCheckIn(ctx, db, types.CheckIn{
		OrganizationID: *user.OrganizationID,
		UserID:         user.ID,
		ReviewerUserID: reviewer.ID,
	})
	require.NoError(t, err)
	qID, err := CreateQuestion(ctx, db, types.GQTPulse(), checkInID, 1)
	require.NoError(t, err)
	r, err := CreateResponse(ctx, db, types.Response{
		QuestionID: qID,
		Response:   "5",
		Position:   1,
	})
	require.NoError(t, err)
	assert.NotEmpty(t, r)
}

func TestGetQuestionResponses(t *testing.T) {
	ctx := context.TODO()
	db := test.CreateTestDB(t)
	_, reviewer, user := createBaseTestValues(t, ctx, db)
	checkInID, err := CreateCheckIn(ctx, db, types.CheckIn{
		OrganizationID: *user.OrganizationID,
		UserID:         user.ID,
		ReviewerUserID: reviewer.ID,
	})
	require.NoError(t, err)
	qID, err := CreateQuestion(ctx, db, types.GQTPriorities(), checkInID, 1)
	require.NoError(t, err)
	_, err = CreateResponse(ctx, db, types.Response{
		QuestionID: qID,
		Response:   "First priority",
		Position:   1,
	})
	require.NoError(t, err)
	_, err = CreateResponse(ctx, db, types.Response{
		QuestionID: qID,
		Response:   "Second Priority",
		Position:   2,
	})
	require.NoError(t, err)
	responses, err := GetQuestionResponses(ctx, db, qID)
	require.NoError(t, err)
	assert.Len(t, responses, 2)
}

func TestSetCheckInCompleted(t *testing.T) {
	ctx := context.TODO()
	db := test.CreateTestDB(t)
	_, reviewer, user := createBaseTestValues(t, ctx, db)
	checkInID, err := CreateCheckIn(ctx, db, types.CheckIn{
		OrganizationID: *user.OrganizationID,
		UserID:         user.ID,
		ReviewerUserID: reviewer.ID,
	})
	require.NoError(t, err)
	checkIn, err := GetCheckInByID(ctx, db, checkInID)
	require.NoError(t, err)
	assert.Nil(t, checkIn.CompletedAt)
	completedCheckIn, err := SetCheckInCompleted(ctx, db, checkInID)
	require.NoError(t, err)
	assert.NotNil(t, completedCheckIn.CompletedAt)
}
