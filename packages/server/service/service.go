package service

import (
	"github.com/go-playground/validator/v10"
	"github.com/jmoiron/sqlx"
	"github.com/sirupsen/logrus"
)

type Service struct {
	dbx   *sqlx.DB
	valid *validator.Validate
	log   *logrus.Logger
}

func NewService(dbx *sqlx.DB, valid *validator.Validate, log *logrus.Logger) *Service {
	return &Service{
		dbx:   dbx,
		valid: valid,
		log:   log,
	}
}
