package cloud_functions

import (
	"context"
	"github.com/jmoiron/sqlx"
	"github.com/mikethehud/glancegg/packages/server/service"
	"github.com/mikethehud/glancegg/packages/server/types"
	"github.com/sirupsen/logrus"
)

func RefreshCheckIns(log *logrus.Logger, dbx *sqlx.DB) {
	log.Info("running refresh check in")
	s := service.NewService(dbx, types.NewValidator(), log)
	s.RefreshCheckIns(context.Background())
}
