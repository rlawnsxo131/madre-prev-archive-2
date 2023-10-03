package controllerv1

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/rlawnsxo131/madre-server/api/infra/persistence"
)

type meController struct {
	conn persistence.Conn
}

func InitMeController(e *echo.Group, conn persistence.Conn) {
	me := e.Group("/me")

	ctrl := &meController{conn}

	me.GET("", ctrl.getMe())
	me.PUT("/username", ctrl.updateUsername())
	me.PUT("/email", ctrl.updateEmail())
}

func (ctrl *meController) getMe() echo.HandlerFunc {
	return func(c echo.Context) error {
		return c.JSON(http.StatusOK, "getMe")
	}
}

func (ctrl *meController) updateUsername() echo.HandlerFunc {
	return func(c echo.Context) error {
		return c.JSON(http.StatusOK, "updateUsername")
	}
}

func (ctrl *meController) updateEmail() echo.HandlerFunc {
	return func(c echo.Context) error {
		return c.JSON(http.StatusOK, "updateEmail")
	}
}
