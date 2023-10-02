package server

import (
	"encoding/json"
	"log"
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
	_loggerRequstBodyKey   = "loggerRequstBodyKey"
	_loggerResponseBodyKey = "loggerResponseBodyKey"
)

func EchoRequestLoggerMiddleware() echo.MiddlewareFunc {
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

			// @TODO body 인코딩 처리
			e.Str("id", v.RequestID).
				Time("time", v.StartTime).
				Dur("latency(ms)", v.Latency).
				Int("status", v.Status).
				Str("protocol", v.Protocol).
				Str("method", v.Method).
				Str("host", v.Host).
				Str("uri", v.URI).
				Bytes("body", c.Get(_loggerRequstBodyKey).([]byte)).
				Bytes("response", c.Get(_loggerResponseBodyKey).([]byte)).
				RawJSON("headers", headers).
				Str("referer", v.Referer).
				Str("user-agent", v.UserAgent).
				Err(v.Error).
				Send()

			return nil
		},
	})
}

// @TODO body 인코딩 처리
func EchoBodyDumpMiddleware() echo.MiddlewareFunc {
	return middleware.BodyDump(func(c echo.Context, reqBody, resBody []byte) {
		c.Set(_loggerRequstBodyKey, reqBody)
		c.Set(_loggerResponseBodyKey, resBody)
	})
}

func EchoCORSMiddleware() echo.MiddlewareFunc {
	return middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins:     []string{"http://localhost:5001", "http://localhost:8000"},
		AllowHeaders:     []string{"*"},
		AllowMethods:     []string{"*"},
		AllowCredentials: true,
	})
}

func EchoRateLimiterMiddleware() echo.MiddlewareFunc {
	return middleware.RateLimiter(middleware.NewRateLimiterMemoryStore(1000))
}

// @TODO 타임아웃 핸들러 정의
func EchoTimeoutMiddleware() echo.MiddlewareFunc {
	return middleware.TimeoutWithConfig(middleware.TimeoutConfig{
		ErrorMessage: "request timeout",
		OnTimeoutRouteErrorHandler: func(err error, c echo.Context) {
			// OnTimeoutRouteErrorHandler is an error handler that is executed for error that was returned from wrapped route after
			// request timeouted and we already had sent the error code (503) and message response to the client.
			// NB: do not write headers/body inside this handler. The response has already been sent to the client and response writer
			// will not accept anything no more. If you want to know what actual route middleware timeouted use `c.Path()`
		},
		Timeout: 15 * time.Second,
	})
}

func EchoCSRFMiddleware() echo.MiddlewareFunc {
	return middleware.CSRFWithConfig(middleware.CSRFConfig{
		// CookieDomain: ".juntae.kim",
		CookiePath:     "/",
		CookieMaxAge:   1800,
		CookieHTTPOnly: true,
		CookieSameSite: http.SameSiteStrictMode,
	})
}

// @TODO 에러 핸들링 처리
func EchoCustomErrorHandlerMiddleware() echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			err := next(c)

			if err != nil {
				he, ok := err.(*echo.HTTPError)
				code := he.Code

				if ok {
					var res = struct {
						Code   int      `json:"code"`
						Status string   `json:"status"`
						Error  struct{} `json:"error"`
					}{
						Code:   code,
						Status: http.StatusText(code),
						Error:  struct{}{},
					}

					switch code {
					case http.StatusNotFound:
						return c.JSON(code, res)
					}
				}

				log.Printf("err: %+v\n", err)

			}

			return err
		}
	}
}
