package types

import (
	"github.com/mikethehud/glancegg/packages/server/graph/model"
	"time"
)

type Question struct {
	ID           string       `db:"id"`
	CheckInID    string       `db:"check_in_id" validate:"required,uuid4"`
	QuestionType string       `db:"question_type"`
	Position     int          `db:"position"`
	Text         string       `db:"text" validate:"required"`
	ResponseType ResponseType `db:"response_type"`
}

func (q *Question) ToModel() *model.Question {
	return &model.Question{
		ID:           q.ID,
		Position:     q.Position,
		QuestionType: q.QuestionType,
		Text:         q.Text,
		ResponseType: model.ResponseType(q.ResponseType),
	}
}

type ResponseType string

const (
	ResponseTypeText  ResponseType = "TEXT"
	ResponseTypeTask  ResponseType = "TASK"
	ResponseTypeScale ResponseType = "SCALE"
)

type QuestionType struct {
	Type         string
	Text         string
	ResponseType ResponseType
}

func GQTPulse() QuestionType {
	return QuestionType{
		Type:         "PULSE",
		Text:         "How are you feeling?",
		ResponseType: ResponseTypeScale,
	}
}

func GQTPriorities() QuestionType {
	return QuestionType{
		Type:         "PRIORITIES",
		Text:         "What are your priorities until your next check-in?",
		ResponseType: ResponseTypeTask,
	}
}

func GQTSuccesses() QuestionType {
	return QuestionType{
		Type:         "SUCCESSES",
		Text:         "What is going well?",
		ResponseType: ResponseTypeText,
	}
}

func GQTChallenges() QuestionType {
	return QuestionType{
		Type:         "CHALLENGES",
		Text:         "What challenges are you facing?",
		ResponseType: ResponseTypeText,
	}
}

type Response struct {
	ID          string     `db:"id"`
	QuestionID  string     `db:"question_id" validate:"required,uuid4"`
	Position    int        `db:"position"`
	Response    string     `db:"response"`
	CompletedAt *time.Time `db:"completed_at"`
}
