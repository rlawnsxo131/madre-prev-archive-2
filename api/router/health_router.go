package router

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/rlawnsxo131/madre-server/api/infra/server/response"
)

func InitHealthRouter(e *echo.Group) {
	e.GET("/ping", func(c echo.Context) error {
		return c.JSON(
			http.StatusOK,
			response.NewHTTPResponse(
				http.StatusOK,
				map[string]string{"pong": "pong"},
			),
		)
	})
}
