package queries

import (
	"context"
	"github.com/google/uuid"
	"github.com/mikethehud/glancegg/packages/server/types"
	"github.com/pkg/errors"
	"time"
)

func CreateCheckIn(ctx context.Context, q QueryRunner, checkIn types.CheckIn) (string, error) {
	query := `
		INSERT INTO check_ins (id, organization_id, user_id, reviewer_user_id, expires_at)
		VALUES (:id, :organization_id, :user_id, :reviewer_user_id, :expires_at)
	`

	checkIn.ID = uuid.NewString()
	_, err := q.NamedExecContext(ctx, query, checkIn)
	if err != nil {
		return "", err
	}
	return checkIn.ID, nil
}

func GetCheckInByID(ctx context.Context, q QueryRunner, checkInID string) (*types.CheckIn, error) {
	query := `
		SELECT * FROM check_ins WHERE id = $1
	`

	c := &types.CheckIn{}
	err := q.GetContext(ctx, c, query, checkInID)
	if err != nil {
		return nil, err
	}
	return c, nil
}

func GetCheckInsByUserID(ctx context.Context, q QueryRunner, userID string) ([]*types.CheckIn, error) {
	query := `
		SELECT * FROM check_ins WHERE user_id = $1 ORDER BY created_at DESC
	`

	var checkIns []*types.CheckIn
	err := q.SelectContext(ctx, &checkIns, query, userID)
	if err != nil {
		return nil, errors.Wrap(err, "error selecting users")
	}
	return checkIns, nil
}

func GetCheckInsByReviewerID(ctx context.Context, q QueryRunner, reviewerUserID string) ([]*types.CheckIn, error) {
	query := `
		SELECT * FROM check_ins WHERE reviewer_user_id = $1 ORDER BY created_at DESC
	`

	var checkIns []*types.CheckIn
	err := q.SelectContext(ctx, &checkIns, query, reviewerUserID)
	if err != nil {
		return nil, errors.Wrap(err, "error selecting users")
	}
	return checkIns, nil
}

func SetCheckInCompleted(ctx context.Context, q QueryRunner, checkInID string) (*types.CheckIn, error) {
	query := `
UPDATE check_ins
SET completed_at = NOW()
WHERE id = $1
RETURNING *`
	var c types.CheckIn
	err := q.QueryRowxContext(ctx, query, checkInID).StructScan(&c)
	return &c, err
}

func CreateQuestion(ctx context.Context, q QueryRunner, qt types.QuestionType, checkInID string, position int) (string, error) {
	query := `
		INSERT INTO questions (id, check_in_id, question_type, text, response_type, position)
		VALUES (:id, :check_in_id, :question_type, :text, :response_type, :position)
	`

	question := types.Question{
		ID:           uuid.NewString(),
		CheckInID:    checkInID,
		QuestionType: qt.Type,
		Text:         qt.Text,
		ResponseType: qt.ResponseType,
		Position:     position,
	}

	_, err := q.NamedExecContext(ctx, query, question)
	if err != nil {
		return "", err
	}
	return question.ID, nil
}

func GetCheckInQuestions(ctx context.Context, q QueryRunner, checkInID string) ([]*types.Question, error) {
	query := `
		SELECT * FROM questions WHERE check_in_id = $1 ORDER BY position ASC
	`

	var questions []*types.Question
	err := q.SelectContext(ctx, &questions, query, checkInID)
	if err != nil {
		return nil, errors.Wrap(err, "error retrieving questions")
	}
	return questions, nil
}

func CreateResponse(ctx context.Context, q QueryRunner, response types.Response) (string, error) {
	// todo: ensure response type on question corresponds with response value
	query := `
		INSERT INTO responses (id, question_id, response, position)
		VALUES (:id, :question_id, :response, :position)
	`

	id := uuid.NewString()
	response.ID = uuid.NewString()

	_, err := q.NamedExecContext(ctx, query, response)
	if err != nil {
		return "", err
	}

	return id, nil
}

func GetQuestionResponses(ctx context.Context, q QueryRunner, questionID string) ([]*types.Response, error) {
	query := `
		SELECT * FROM responses WHERE question_id = $1 ORDER BY position ASC
	`

	var responses []*types.Response
	err := q.SelectContext(ctx, &responses, query, questionID)
	if err != nil {
		return nil, errors.Wrap(err, "error retrieving responses")
	}
	return responses, nil
}

func UpdateCheckInReview(ctx context.Context, q QueryRunner, checkInID string, review string) (*types.CheckIn, error) {
	query := `
UPDATE check_ins
SET reviewed_at = NOW(), review = $1
WHERE id = $2
RETURNING *`
	var c types.CheckIn
	err := q.QueryRowxContext(ctx, query, review, checkInID).StructScan(&c)
	return &c, err
}

func SetCheckInsExpired(ctx context.Context, q QueryRunner) ([]*types.CheckIn, error) {
	query := `
UPDATE check_ins
SET expired = true
WHERE expires_at < NOW()
AND expired = false
RETURNING *`
	var c []*types.CheckIn
	err := q.SelectContext(ctx, &c, query)
	return c, err
}

func DeleteOpenCheckInsForUserID(ctx context.Context, q QueryRunner, userID string) error {
	query := `
		DELETE FROM check_ins WHERE user_id = $1 AND completed_at IS NULL AND expired = false 
	`

	_, err := q.ExecContext(ctx, query, userID)
	return err
}

func ExtendCheckInExpiresByOrganizationID(ctx context.Context, q QueryRunner, orgID string, expiresAt time.Time) ([]*types.CheckIn, error) {
	query := `
UPDATE check_ins
SET expires_at = $1
WHERE organization_id = $2
AND expired = false
RETURNING *`
	var c []*types.CheckIn
	err := q.SelectContext(ctx, &c, query, expiresAt, orgID)
	return c, err
}
