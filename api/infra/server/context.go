package server

import (
	"github.com/labstack/echo/v4"
	"github.com/rlawnsxo131/madre-server/api/infra/server/logger"
)

const (
	_logEntryCtxKey = "logEntryCtxKey"
)

func SetLogEntryCtx(c echo.Context, l logger.HTTPLogEntry) {
	c.Set(_logEntryCtxKey, l)
}

func GetLogEntryFromCtx(c echo.Context) logger.HTTPLogEntry {
	return c.Get(_logEntryCtxKey).(logger.HTTPLogEntry)
}
