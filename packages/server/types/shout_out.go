package types

import (
	"github.com/mikethehud/glancegg/packages/server/graph/model"
	"time"
)

type ShoutOut struct {
	ID             string    `db:"id"`
	CheckInID      *string   `db:"check_in_id"`
	UserID         string    `db:"user_id"`
	OrganizationID string    `db:"organization_id"`
	ShoutOut       string    `db:"shout_out"`
	CreatedAt      time.Time `db:"created_at"`
	User           *User
	Receivers      []*User
}

func (s *ShoutOut) ToModel() *model.ShoutOut {
	var modelReceivers []*model.User
	for _, receiver := range s.Receivers {
		modelReceivers = append(modelReceivers, receiver.ToModel())
	}

	return &model.ShoutOut{
		ID:        s.ID,
		ShoutOut:  s.ShoutOut,
		User:      s.User.ToModel(),
		Receivers: modelReceivers,
		CreatedAt: s.CreatedAt,
	}
}
