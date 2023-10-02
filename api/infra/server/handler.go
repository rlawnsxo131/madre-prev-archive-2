package server

import (
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"
)

// @TODO 에러 핸들링 처리
// 아래와 같이 리턴하면 집중된 에러 핸들러가 작동한다.
// return errors.New("asdf")
// return echo.NewHTTPError(http.StatusUnauthorized, "myerror")
func echoUnHandledHTTPErrorHandler(err error, c echo.Context) {
	code := http.StatusInternalServerError
	if he, ok := err.(*echo.HTTPError); ok {
		code = he.Code
	}

	var res = struct {
		Code   int      `json:"code"`
		Status string   `json:"status"`
		Error  struct{} `json:"error"`
	}{
		Code:   code,
		Status: http.StatusText(code),
		Error:  struct{}{},
	}

	id := c.Request().Header.Get(echo.HeaderXRequestID)
	if id == "" {
		id = c.Response().Header().Get(echo.HeaderXRequestID)
	}

	c.Logger().Error(
		fmt.Errorf("request-id: %s, err: %+v, ", id, err),
	)
	c.JSON(code, res)
}
