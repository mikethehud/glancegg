package queries

import (
	"github.com/go-playground/validator/v10"
	_ "github.com/lib/pq"
	"github.com/mikethehud/glancegg/packages/server/test"
	"github.com/mikethehud/glancegg/packages/server/types"
)

var (
	val *validator.Validate
)

func init() {
	test.RegisterTXDB("../../.env.development")
	val = types.NewValidator()
}
