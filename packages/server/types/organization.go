package types

import "time"

type Organization struct {
	ID        string     `db:"id"`
	Name      string     `db:"name" validate:"required,gte=2"`
	CreatedAt *time.Time `db:"created_at"`
}
