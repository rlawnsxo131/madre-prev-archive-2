package controllerv1

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func InitAuthController(e *echo.Group) {
	auth := e.Group("/auth")

	auth.POST("/signup-login/:provider", func(c echo.Context) error {
		res := map[string]string{"body": "body"}
		return c.JSON(http.StatusOK, res)
	})
	auth.DELETE("/logout", func(c echo.Context) error { return nil })
	auth.DELETE("/", func(c echo.Context) error { return nil })
}
