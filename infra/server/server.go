package server

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"time"

	"github.com/labstack/echo/v4"
	echoMiddleware "github.com/labstack/echo/v4/middleware"
	"github.com/rlawnsxo131/madre-server/infra/server/logger"
	"github.com/rlawnsxo131/madre-server/infra/server/middleware"
)

type server struct {
	engine *echo.Echo
}

func New() *server {
	return &server{
		engine: echo.New(),
	}
}

func (s *server) Init() *server {
	s.engine.Use(middleware.TimeoutMiddleware())
	s.engine.Use(middleware.LogEntryMiddleware(logger.DefaultHTTPLogger))
	s.engine.Use(echoMiddleware.RequestID())
	s.engine.Use(middleware.RequestLoggerMiddleware())
	s.engine.Use(echoMiddleware.Secure())
	s.engine.Use(middleware.CSRFMiddleware())
	s.engine.Use(middleware.CORSMiddleware())
	s.engine.Use(echoMiddleware.Gzip())
	s.engine.Use(middleware.BodyDumpMiddleware())
	s.engine.Use(middleware.RateLimiterMiddleware())
	s.engine.Use(middleware.CustomErrorHandlerMiddleware())
	s.engine.Use(echoMiddleware.Recover())
	return s
}

func (s *server) Engine() *echo.Echo {
	return s.engine
}

// @link https://echo.labstack.com/docs/cookbook/graceful-shutdown
func (s *server) Start(port int) {
	go func() {
		if err := s.engine.Start(fmt.Sprintf(":%d", port)); err != nil && err != http.ErrServerClosed {
			s.engine.Logger.Fatal(fmt.Errorf(
				"shutting down the server, err: %+v", err),
			)
		}
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt)
	<-quit
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()
	if err := s.engine.Shutdown(ctx); err != nil {
		s.engine.Logger.Fatal(err)
	}
}
