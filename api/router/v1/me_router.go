package routerv1

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/rlawnsxo131/madre-server/domain/persist"
)

type meRouter struct{}

func InitMeRouter(e *echo.Group, conn persist.Conn) {
	me := e.Group("/me")

	router := &meRouter{}

	me.GET("", router.getMe())
	me.PUT("/username", router.updateUsername())
	me.PUT("/email", router.updateEmail())
}

func (router *meRouter) getMe() echo.HandlerFunc {
	return func(c echo.Context) error {
		return c.JSON(http.StatusOK, "getMe")
	}
}

func (router *meRouter) updateUsername() echo.HandlerFunc {
	return func(c echo.Context) error {
		return c.JSON(http.StatusOK, "updateUsername")
	}
}

func (router *meRouter) updateEmail() echo.HandlerFunc {
	return func(c echo.Context) error {
		return c.JSON(http.StatusOK, "updateEmail")
	}
}
