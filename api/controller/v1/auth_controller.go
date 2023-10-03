package controllerv1

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/rlawnsxo131/madre-server/api/infra/persistence"
	"github.com/rlawnsxo131/madre-server/api/service"
)

type authController struct {
	userService *service.UserService
}

func InitAuthController(e *echo.Group, conn persistence.Conn) {
	auth := e.Group("/auth")

	ctrl := &authController{
		userService: service.NewUserService(conn),
	}

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
