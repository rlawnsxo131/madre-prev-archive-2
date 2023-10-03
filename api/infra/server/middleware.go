package server

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/rlawnsxo131/madre-server/api/common/lib"
	"github.com/rs/zerolog"
)

var (
	_logger *zerolog.Logger = lib.NewDefaultLogger()
)

const (
	_loggerBodyKey = "loggerBodyKey"
)

func RequestLoggerMiddleware() echo.MiddlewareFunc {
	return middleware.RequestLoggerWithConfig(middleware.RequestLoggerConfig{
		LogLatency:   true,
		LogProtocol:  true,
		LogRemoteIP:  true,
		LogHost:      true,
		LogMethod:    true,
		LogURI:       true,
		LogRequestID: true,
		LogReferer:   true,
		LogUserAgent: true,
		LogStatus:    true,
		LogError:     true,
		LogHeaders: []string{
			"Accept",
			"Accept-Encoding",
			"Cache-Control",
			"Connection",
			"Authorization",
			"Cookie",
			"X-CSRF-Token",
		},
		// @link https://echo.labstack.com/docs/middleware/logger#configuration
		BeforeNextFunc: func(c echo.Context) {
		},
		LogValuesFunc: func(c echo.Context, v middleware.RequestLoggerValues) error {
			var (
				e          *zerolog.Event
				statusCode int = v.Status
			)

			switch {
			case statusCode > 0 && statusCode < 300:
				e = _logger.Info()
			case statusCode > 299 && statusCode < 500:
				e = _logger.Warn()
			case statusCode > 499:
				e = _logger.Error()
			default:
				e = _logger.Error()
			}

			headers, err := json.Marshal(v.Headers)
			if err != nil {
				return err
			}

			e.Str("id", v.RequestID).
				Time("time", v.StartTime).
				Dur("latency(ms)", v.Latency).
				Int("status", statusCode).
				Str("remote-ip", v.RemoteIP).
				Str("protocol", v.Protocol).
				Str("method", v.Method).
				Str("host", v.Host).
				Str("uri", v.URI).
				Any("body", c.Get(_loggerBodyKey)).
				RawJSON("headers", headers).
				Str("referer", v.Referer).
				Str("user-agent", v.UserAgent).
				Err(v.Error).
				Send()

			return nil
		},
	})
}

func BodyDumpMiddleware() echo.MiddlewareFunc {
	return middleware.BodyDump(func(c echo.Context, reqBody, resBody []byte) {
		c.Set(
			_loggerBodyKey,
			struct {
				ReqBody string
				ResBody string
			}{
				ReqBody: bytes.NewBuffer(reqBody).String(),
				ResBody: bytes.NewBuffer(resBody).String(),
			},
		)
	})
}

func CORSMiddleware() echo.MiddlewareFunc {
	return middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins:     []string{"http://localhost:5001", "http://localhost:8000"},
		AllowHeaders:     []string{"*"},
		AllowMethods:     []string{"*"},
		AllowCredentials: true,
	})
}

func RateLimiterMiddleware() echo.MiddlewareFunc {
	return middleware.RateLimiter(middleware.NewRateLimiterMemoryStore(15))
}

func TimeoutMiddleware() echo.MiddlewareFunc {
	return middleware.TimeoutWithConfig(middleware.TimeoutConfig{
		ErrorMessage:               "request timeout",
		OnTimeoutRouteErrorHandler: func(err error, c echo.Context) {},
		Timeout:                    5 * time.Second,
	})
}

func CSRFMiddleware() echo.MiddlewareFunc {
	return middleware.CSRFWithConfig(middleware.CSRFConfig{
		// @TODO prod 내보내기 전에 domain 체크 필요
		// CookieDomain: ".juntae.kim",
		CookiePath:     "/",
		CookieMaxAge:   1800,
		CookieHTTPOnly: true,
		CookieSameSite: http.SameSiteStrictMode,
	})
}

// @TODO 전역 에러 객체 만들고 구조체 정리
type errData struct {
	Message string `json:"message"`
}
type errRes struct {
	Code   int     `json:"code"`
	Status string  `json:"status"`
	Error  errData `json:"error"`
}

func CustomErrorHandlerMiddleware() echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			err := next(c)

			if err != nil {
				path := c.Path()
				id := c.Request().Header.Get(echo.HeaderXRequestID)
				if id == "" {
					id = c.Response().Header().Get(echo.HeaderXRequestID)
				}
				c.Logger().Error(
					fmt.Errorf("request-id: %s, err: %+v, path: %s", id, err, path),
				)

				he, ok := err.(*echo.HTTPError)
				code := he.Code
				res := errRes{
					Code:   code,
					Status: http.StatusText(code),
				}

				if ok {
					res.Error = errData{
						Message: "internal http error",
					}
					return c.JSON(code, res)
				}
				return c.JSON(code, res)
			}
			return nil
		}
	}
}
