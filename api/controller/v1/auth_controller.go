package controllerv1

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/rlawnsxo131/madre-server/api/persistence"
)

type authController struct {
	conn persistence.Conn
}

func InitAuthController(e *echo.Group, conn persistence.Conn) {
	auth := e.Group("/auth")

	ctrl := &authController{conn}

	auth.POST("/signup-login/:provider", ctrl.signupLogin())
	auth.DELETE("/logout", ctrl.logout())
	auth.DELETE("/account", ctrl.deleteAccount())
}

func (ctrl *authController) signupLogin() echo.HandlerFunc {
	return func(c echo.Context) error {
		return c.JSON(http.StatusOK, "signupLogin")
	}
}

func (ctrl *authController) logout() echo.HandlerFunc {
	return func(c echo.Context) error {
		return c.JSON(http.StatusOK, "logout")
	}
}

func (ctrl *authController) deleteAccount() echo.HandlerFunc {
	return func(c echo.Context) error {
		return c.JSON(http.StatusOK, "deleteAccount")
	}
}
