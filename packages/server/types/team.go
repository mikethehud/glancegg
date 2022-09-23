package types

import "time"

type Team struct {
	id             string     `db:"id"`
	name           string     `db:"name"`
	createdAt      *time.Time `db:"created_at"`
	organizationID string     `db:"organization_id"`
}
