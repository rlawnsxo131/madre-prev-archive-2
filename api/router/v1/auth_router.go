package routerv1

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/rlawnsxo131/madre-server/api/infra/persistence"
	"github.com/rlawnsxo131/madre-server/api/service"
)

type authRouter struct {
	userService *service.UserService
}

func InitAuthRouter(e *echo.Group, conn persistence.Conn) {
	auth := e.Group("/auth")

	rr := &authRouter{
		userService: service.NewUserService(conn),
	}

	auth.POST("/signup-login/:provider", rr.signupLogin())
	auth.DELETE("/logout", rr.logout())
	auth.DELETE("/account", rr.deleteAccount())
}

func (rr *authRouter) signupLogin() echo.HandlerFunc {
	return func(c echo.Context) error {
		return c.JSON(http.StatusOK, "signupLogin")
	}
}

func (rr *authRouter) logout() echo.HandlerFunc {
	return func(c echo.Context) error {
		return c.JSON(http.StatusOK, "logout")
	}
}

func (rr *authRouter) deleteAccount() echo.HandlerFunc {
	return func(c echo.Context) error {
		return c.JSON(http.StatusOK, "deleteAccount")
	}
}
