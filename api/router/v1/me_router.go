package routerv1

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/rlawnsxo131/madre-server/api/infra/persistence"
)

type meRouter struct{}

func InitMeRouter(e *echo.Group, conn persistence.Conn) {
	me := e.Group("/me")

	rr := &meRouter{}

	me.GET("", rr.getMe())
	me.PUT("/username", rr.updateUsername())
	me.PUT("/email", rr.updateEmail())
}

func (rr *meRouter) getMe() echo.HandlerFunc {
	return func(c echo.Context) error {
		return c.JSON(http.StatusOK, "getMe")
	}
}

func (rr *meRouter) updateUsername() echo.HandlerFunc {
	return func(c echo.Context) error {
		return c.JSON(http.StatusOK, "updateUsername")
	}
}

func (rr *meRouter) updateEmail() echo.HandlerFunc {
	return func(c echo.Context) error {
		return c.JSON(http.StatusOK, "updateEmail")
	}
}
