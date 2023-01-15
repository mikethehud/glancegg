package types

import (
	"github.com/mikethehud/glancegg/packages/server/graph/model"
	"github.com/pkg/errors"
	"time"
)

type Role string

const (
	AdminRole Role = "ADMIN"
	UserRole  Role = "USER"
)

func (r *Role) ToModel() model.Role {
	switch *r {
	case AdminRole:
		return model.RoleAdmin
	case UserRole:
		return model.RoleUser
	default:
		return ""
	}
}

func RoleFromModelRole(r model.Role) Role {
	switch r {
	case model.RoleAdmin:
		return AdminRole
	case model.RoleUser:
		return UserRole
	default:
		return ""
	}
}

func RoleFromString(s string) (Role, error) {
	switch s {
	case "ADMIN":
		return AdminRole, nil
	case "USER":
		return UserRole, nil
	}
	return "", errors.New("incorrect role")
}

type User struct {
	ID             string     `db:"id"`
	FirstName      string     `db:"first_name" validate:"required,gte=2"`
	LastName       string     `db:"last_name" validate:"required,gte=2"`
	Email          string     `db:"email" validate:"required,email"`
	CreatedAt      *time.Time `db:"created_at"`
	OrganizationID *string    `db:"organization_id" validate:"required,uuid4"`
	Password       string     `db:"password" validate:"gte=8"'`
	ReportsTo      *string    `db:"reports_to"`
	Role           Role       `db:"role"`
}

func (user *User) ToModel() *model.User {
	return &model.User{
		ID:        user.ID,
		FirstName: user.FirstName,
		LastName:  user.LastName,
		Email:     user.Email,
		ReportsTo: user.ReportsTo,
		Role:      user.Role.ToModel(),
	}
}
