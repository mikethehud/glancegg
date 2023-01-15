package queries

import (
	"context"
	"github.com/google/uuid"
	"github.com/mikethehud/glancegg/packages/server/types"
	"time"
)

type ShoutOutRow struct {
	ID                string    `db:"id"`
	UserID            string    `db:"user_id"`
	ShoutOut          string    `db:"shout_out"`
	CreatedAt         time.Time `db:"created_at"`
	UserFirstName     string    `db:"first_name"`
	UserLastName      string    `db:"last_name"`
	ReceiverUserID    string    `db:"receiver_user_id"`
	ReceiverFirstName string    `db:"receiver_first_name"`
	ReceiverLastName  string    `db:"receiver_last_name"`
}

func GetShoutOutsByOrganizationID(ctx context.Context, q QueryRunner, organizationID string, checkInID *string) ([]*types.ShoutOut, error) {
	query := `
SELECT s.id, s.user_id, s.shout_out, s.created_at, u1.first_name, u1.last_name, u2.id AS receiver_user_id, u2.first_name AS receiver_first_name, u2.last_name AS receiver_last_name 
FROM shout_outs s
INNER JOIN shout_out_receivers r ON s.id = r.shout_out_id
INNER JOIN users u1 ON s.user_id = u1.id
INNER JOIN users u2 ON r.receiver_user_id = u2.id
WHERE s.organization_id = $1
`
	args := []interface{}{organizationID}
	if checkInID != nil {
		query += `AND check_in_id = $2`
		args = append(args, checkInID)
	}

	query += `
ORDER BY created_at DESC`

	var rows []*ShoutOutRow
	err := q.SelectContext(ctx, &rows, query, args...)
	if err != nil {
		return nil, err
	}

	shoutOuts := make(map[string]*types.ShoutOut)
	for _, row := range rows {
		if shoutOuts[row.ID] != nil {
			shoutOuts[row.ID].Receivers = append(shoutOuts[row.ID].Receivers, &types.User{
				ID:        row.ReceiverUserID,
				FirstName: row.ReceiverFirstName,
				LastName:  row.ReceiverLastName,
			})
		} else {
			shoutOuts[row.ID] = rowToShoutOut(row)
		}
	}

	out := make([]*types.ShoutOut, 0, len(shoutOuts))
	for _, shoutOut := range shoutOuts {
		out = append(out, shoutOut)
	}

	return out, nil
}

func CreateShoutOut(ctx context.Context, q QueryRunner, shoutOut types.ShoutOut) (string, error) {
	query := `
INSERT INTO shout_outs (id, user_id, organization_id, shout_out, check_in_id)
VALUES (:id, :user_id, :organization_id, :shout_out, :check_in_id)
	`

	shoutOut.ID = uuid.NewString()
	_, err := q.NamedExecContext(ctx, query, shoutOut)
	if err != nil {
		return "", err
	}
	return shoutOut.ID, nil
}

func AddShoutOutReceiver(ctx context.Context, q QueryRunner, shoutOutID, receiverID string) error {
	query := `
INSERT INTO shout_out_receivers (shout_out_id, receiver_user_id)
VALUES ($1, $2)
	`

	_, err := q.ExecContext(ctx, query, shoutOutID, receiverID)
	return err
}

func rowToShoutOut(row *ShoutOutRow) *types.ShoutOut {
	return &types.ShoutOut{
		ID:        row.ID,
		ShoutOut:  row.ShoutOut,
		CreatedAt: row.CreatedAt,
		User: &types.User{
			ID:        row.UserID,
			FirstName: row.UserFirstName,
			LastName:  row.UserLastName,
		},
		Receivers: []*types.User{{
			ID:        row.ReceiverUserID,
			FirstName: row.ReceiverFirstName,
			LastName:  row.ReceiverLastName,
		}},
	}
}
