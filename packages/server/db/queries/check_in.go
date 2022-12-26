package queries

import (
	"context"
	"github.com/google/uuid"
	"github.com/mikethehud/glancegg/packages/server/types"
	"github.com/pkg/errors"
)

func CreateCheckIn(ctx context.Context, q QueryRunner, checkIn types.CheckIn) (string, error) {
	query := `
		INSERT INTO check_ins (id, organization_id, user_id, reviewer_user_id)
		VALUES (:id, :organization_id, :user_id, :reviewer_user_id)
	`

	checkIn.ID = uuid.NewString()
	_, err := q.NamedExecContext(ctx, query, checkIn)
	if err != nil {
		return "", err
	}
	return checkIn.ID, nil
}

func GetCheckInsByUserID(ctx context.Context, q QueryRunner, userID string) ([]*types.CheckIn, error) {
	query := `
		SELECT * FROM check_ins WHERE user_id = $1
	`

	var checkIns []*types.CheckIn
	err := q.SelectContext(ctx, &checkIns, query, userID)
	if err != nil {
		return nil, errors.Wrap(err, "error selecting users")
	}
	return checkIns, nil
}

//
//func GetCheckInsByReviewerID(ctx context.Context, q QueryRunner, reviewerUserID string) ([]*types.CheckIn, error) {
//	query := `
//		SELECT * FROM check_ins WHERE reviewer_user_id = $1
//	`
//
//	var users []*types.User
//	err := q.SelectContext(ctx, &users, query, reviewerUserID)
//	if err != nil {
//		return nil, errors.Wrap(err, "error selecting users")
//	}
//	return users, nil
//}

//func CompleteCheckIn(ctx context.Context, q QueryRunner, checkIn *types.CheckIn) (string, error) {
//
//}
//

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

// func CompleteResponse(ctx context.Context, q QueryRunner, responseID) {}
