package middleware

import (
	"fmt"
	"net/http"
	"time"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/rlawnsxo131/madre-server/api/infra/server/logger"
	"github.com/rs/zerolog"
)

func LogEntryMiddleware(l logger.HTTPLogger) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			setLogEntryCtx(c, l.NewLogEntry())
			return next(c)
		}
	}
}

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
		LogHeaders:   []string{"Accept", "Accept-Encoding", "Cache-Control", "Connection", "Authorization", "Cookie", "X-CSRF-Token"},
		// @link https://echo.labstack.com/docs/middleware/logger#configuration
		BeforeNextFunc: func(c echo.Context) {
		},
		LogValuesFunc: func(c echo.Context, v middleware.RequestLoggerValues) error {
			var (
				entry = getLogEntryFromCtx(c)
				l     = entry.GetLogger()
			)
			var (
				e          *zerolog.Event
				statusCode int = v.Status
			)

			switch {
			case statusCode > 0 && statusCode < 300:
				e = l.Info()
			case statusCode > 299 && statusCode < 500:
				e = l.Warn()
			case statusCode > 499:
				e = l.Error()
			default:
				e = l.Error()
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
				Any("body", entry.GetBody()).
				Any("headers", v.Headers).
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
		getLogEntryFromCtx(c).BodyDump(reqBody, resBody)
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
	return middleware.RateLimiter(middleware.NewRateLimiterMemoryStore(20))
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
		// CookieDomain: ".juntae.kim", @TODO prod 내보내기 전에 domain 체크 필요
		TokenLookup:    "header:X-CSRF-Token,cookie:_csrf",
		CookiePath:     "/",
		CookieMaxAge:   1800,
		CookieHTTPOnly: true,
		CookieSameSite: http.SameSiteStrictMode,
	})
}

func CustomErrorHandlerMiddleware() echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			err := next(c)

			if err != nil {
				getLogEntryFromCtx(c).GetLogger().
					Err(fmt.Errorf("request-id: %s, err: %+v", getRequestId(c), err)).
					Send()

				// @TODO
				// &echo.HTTPError { Code: 0, Message: "asdf" } 로 router 에서 return 하면
				// he.Code, he.Message 로 들어오는데 이걸 내가 정의한 데이터와 어떻게 맞추는게 좋을지 고민해보자
				he, ok := err.(*echo.HTTPError)
				if ok {
					return c.JSON(he.Code, he.Message)
				}
			}
			return err
		}
	}
}
