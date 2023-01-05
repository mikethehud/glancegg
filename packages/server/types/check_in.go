package types

import (
	"github.com/mikethehud/glancegg/packages/server/graph/model"
	"time"
)

type CheckIn struct {
	ID             string     `db:"id"`
	OrganizationID string     `db:"organization_id" validate:"required,uuid4"`
	UserID         string     `db:"user_id" validate:"required,uuid4"`
	ReviewerUserID *string    `db:"reviewer_user_id" validate:"required,uuid4"`
	CreatedAt      *time.Time `db:"created_at"`
	CompletedAt    *time.Time `db:"completed_at"`
	ReviewedAt     *time.Time `db:"reviewed_at"`
}

func (c *CheckIn) ToModel() *model.CheckIn {
	return &model.CheckIn{
		ID:        c.ID,
		CreatedAt: *c.CreatedAt,
	}
}

func (c *CheckIn) CanBeViewedByUser(userID string) bool {
	return c.UserID == userID || *c.ReviewerUserID == userID
}
