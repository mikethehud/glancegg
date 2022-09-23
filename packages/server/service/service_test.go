package service

import (
	"github.com/go-playground/validator/v10"
	_ "github.com/lib/pq"
	"github.com/mikethehud/glancegg/packages/server/test"
	"github.com/mikethehud/glancegg/packages/server/types"
	"github.com/sirupsen/logrus"
)

var (
	val *validator.Validate
	log *logrus.Logger
)

func init() {
	test.RegisterTXDB("../.env.development")
	val = types.NewValidator()
	log = logrus.New()
}
