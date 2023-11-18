package routerv1

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/rlawnsxo131/madre-server/api/persist"
	"github.com/rlawnsxo131/madre-server/api/service"
)

type authRouter struct {
	userService *service.UserService
}

func InitAuthRouter(e *echo.Group, conn persist.Conn) {
	auth := e.Group("/auth")

	router := &authRouter{
		userService: service.NewUserService(conn),
	}

	auth.POST("/signup-login/:provider", router.signupLogin())
	auth.DELETE("/logout", router.logout())
	auth.DELETE("/account", router.deleteAccount())
}

func (router *authRouter) signupLogin() echo.HandlerFunc {
	return func(c echo.Context) error {
		return c.JSON(http.StatusOK, "signupLogin")
	}
}

func (router *authRouter) logout() echo.HandlerFunc {
	return func(c echo.Context) error {
		return c.JSON(http.StatusOK, "logout")
	}
}

func (router *authRouter) deleteAccount() echo.HandlerFunc {
	return func(c echo.Context) error {
		return c.JSON(http.StatusOK, "deleteAccount")
	}
}
