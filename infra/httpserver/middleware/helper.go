package middleware

import (
	"github.com/labstack/echo/v4"
	"github.com/rlawnsxo131/madre-server/infra/httpserver/logger"
)

const (
	_logEntryCtxKey = "logEntryCtxKey"
)

func setLogEntryCtx(c echo.Context, l logger.HTTPLogEntry) {
	c.Set(_logEntryCtxKey, l)
}

func getLogEntryFromCtx(c echo.Context) logger.HTTPLogEntry {
	return c.Get(_logEntryCtxKey).(logger.HTTPLogEntry)
}

func getRequestId(c echo.Context) string {
	id := c.Request().Header.Get(echo.HeaderXRequestID)
	if id == "" {
		id = c.Response().Header().Get(echo.HeaderXRequestID)
	}
	return id
}
