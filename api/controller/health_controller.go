package controller

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func InitHealthController(e *echo.Group) {
	e.GET("/ping", func(c echo.Context) error {
		return c.JSON(http.StatusOK, map[string]string{"pong": "pong"})
	})
}
