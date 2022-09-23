package queries

import (
	"context"
	"database/sql"
	"github.com/jmoiron/sqlx"
)

type QueryRunner interface {
	sqlx.ExtContext

	GetContext(ctx context.Context, dest interface{}, query string, args ...interface{}) error
	SelectContext(ctx context.Context, dest interface{}, query string, args ...interface{}) error
	NamedExecContext(ctx context.Context, query string, arg interface{}) (sql.Result, error)
}
