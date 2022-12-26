package types

import "time"

type CheckIn struct {
	ID             string     `db:"id"`
	OrganizationID string     `db:"organization_id" validate:"required,uuid4"`
	UserID         string     `db:"user_id" validate:"required,uuid4"`
	ReviewerUserID *string    `db:"reviewer_user_id" validate:"required,uuid4"`
	CreatedAt      *time.Time `db:"created_at"`
	CompletedAt    *time.Time `db:"completed_at"`
	ReviewedAt     *time.Time `db:"reviewed_at"`
}
