package queries

import (
	"context"
	"github.com/google/uuid"
	"github.com/mikethehud/glancegg/packages/server/types"
	"github.com/pkg/errors"
	"golang.org/x/crypto/bcrypt"
)

func CreateUser(ctx context.Context, q QueryRunner, user types.User) (string, error) {
	query := `
		INSERT INTO users (id, first_name, last_name, email, password, organization_id, role)
		VALUES (:id, :first_name, :last_name, :email, :password, :organization_id, :role)
	`

	user.ID = uuid.NewString()
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	user.Password = string(hashedPassword)
	_, err = q.NamedExecContext(ctx, query, user)
	if err != nil {
		return "", err
	}
	return user.ID, nil
}

func GetUserByID(ctx context.Context, q QueryRunner, userID string) (*types.User, error) {
	query := `
		SELECT * FROM users WHERE id = $1
	`

	u := &types.User{}
	err := q.GetContext(ctx, u, query, userID)
	if err != nil {
		return nil, err
	}
	return u, nil
}

func GetUserByEmail(ctx context.Context, q QueryRunner, email string) (*types.User, error) {
	query := `
		SELECT * FROM users WHERE email = $1
	`

	u := &types.User{}
	err := q.GetContext(ctx, u, query, email)
	if err != nil {
		return nil, err
	}
	return u, nil
}

func GetUsersByOrganizationID(ctx context.Context, q QueryRunner, orgID string, role *types.Role) ([]*types.User, error) {
	query := `
		SELECT * FROM users WHERE organization_id = $1
	`
	args := []interface{}{orgID}
	if role != nil {
		query += `AND role = $2`
		args = append(args, role)
	}

	var users []*types.User
	err := q.SelectContext(ctx, &users, query, args...)
	if err != nil {
		return nil, errors.Wrap(err, "error selecting users")
	}
	return users, nil
}

func GetUsersReportingToID(ctx context.Context, q QueryRunner, userID string) ([]*types.User, error) {
	query := `
		SELECT * FROM users WHERE reports_to = $1
	`

	var users []*types.User
	err := q.SelectContext(ctx, users, query, userID)
	if err != nil {
		return nil, err
	}
	return users, nil
}

func UpdateUserPermissions(ctx context.Context, q QueryRunner, userID string, orgID string, role types.Role, reportingTo *string) (*types.User, error) {
	query := `
UPDATE users SET
role = COALESCE($1, role),
reports_to = COALESCE($2, reports_to)
WHERE id = $3 AND organization_id = $4
RETURNING *
	`

	u := types.User{}

	err := q.QueryRowxContext(ctx, query, role, reportingTo, userID, orgID).StructScan(&u)
	if err != nil {
		return nil, err
	}

	return &u, nil
}

func RemoveOrganizationFromUser(ctx context.Context, q QueryRunner, userID string, orgID string) (*types.User, error) {
	var u types.User
	query := `
UPDATE users
SET organization_id = NULL,
reports_to = NULL,
role = $1
WHERE id = $2
AND organization_id = $3
RETURNING *`
	err := q.QueryRowxContext(ctx, query, types.UserRole, userID, orgID).StructScan(&u)
	return &u, err
}

func RemoveOrganizationFromUsers(ctx context.Context, q QueryRunner, orgID string) error {
	query := `
UPDATE users
SET organization_id = NULL,
reports_to = NULL,
role = $1
WHERE organization_id = $2`

	_, err := q.ExecContext(ctx, query, types.UserRole, orgID)
	return err
}

func JoinOrganization(ctx context.Context, q QueryRunner, userID string, orgID string, role types.Role) (*types.User, error) {
	var u types.User
	query := `
UPDATE users
SET organization_id = $1, role = $2
WHERE id = $3
RETURNING *`
	err := q.QueryRowxContext(ctx, query, orgID, role, userID).StructScan(&u)
	return &u, err
}

func DeleteUser(ctx context.Context, q QueryRunner, userID string) error {
	query := `
		DELETE FROM users WHERE id = $1
	`

	_, err := q.ExecContext(ctx, query, userID)
	return err
}
