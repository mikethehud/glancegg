package types

import (
	"time"
)

type User struct {
	ID             string     `db:"id"`
	Name           string     `db:"name" validate:"required,gte=2"`
	Email          string     `db:"email" validate:"required,email"`
	CreatedAt      *time.Time `db:"created_at"`
	OrganizationID string     `db:"organization_id" validate:"required,uuid4"`
	Password       string     `db:"password" validate:"gte=8"'`
}
