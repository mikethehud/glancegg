package types

import (
	"github.com/mikethehud/glancegg/packages/server/graph/model"
	"time"
)

type Organization struct {
	ID             string     `db:"id"`
	Name           string     `db:"name" validate:"required,gte=2"`
	CreatedAt      *time.Time `db:"created_at"`
	Timezone       string     `db:"timezone"`
	CheckInWeekday int        `db:"check_in_weekday"`
}

func (org *Organization) ToModel() *model.Organization {
	if org == nil {
		return nil
	}
	return &model.Organization{
		ID:             org.ID,
		Name:           org.Name,
		Timezone:       org.Timezone,
		CheckInWeekday: org.CheckInWeekday,
	}
}
