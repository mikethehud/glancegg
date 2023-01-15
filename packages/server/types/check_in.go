package types

import (
	"github.com/mikethehud/glancegg/packages/server/graph/model"
	"time"
)

type CheckIn struct {
	ID             string     `db:"id"`
	OrganizationID string     `db:"organization_id" validate:"required,uuid4"`
	UserID         string     `db:"user_id" validate:"required,uuid4"`
	ReviewerUserID string     `db:"reviewer_user_id" validate:"required,uuid4"`
	Review         *string    `db:"review"`
	CreatedAt      *time.Time `db:"created_at"`
	CompletedAt    *time.Time `db:"completed_at"`
	ReviewedAt     *time.Time `db:"reviewed_at"`
	ExpiresAt      time.Time  `db:"expires_at"`
	Expired        bool       `db:"expired"`
}

func (c *CheckIn) ToModel() *model.CheckIn {
	return &model.CheckIn{
		ID:          c.ID,
		Review:      c.Review,
		CreatedAt:   *c.CreatedAt,
		CompletedAt: c.CompletedAt,
		ReviewedAt:  c.ReviewedAt,
		ExpiresAt:   c.ExpiresAt,
		Expired:     c.Expired,
	}
}

func (c *CheckIn) CanBeViewedByUser(userID string) bool {
	return c.UserID == userID || c.ReviewerUserID == userID
}
