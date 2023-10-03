package server

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"time"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
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
	s.engine.Use(TimeoutMiddleware())
	s.engine.Use(middleware.RequestID())
	s.engine.Use(RequestLoggerMiddleware())
	s.engine.Use(middleware.Secure())
	s.engine.Use(CSRFMiddleware())
	s.engine.Use(CORSMiddleware())
	s.engine.Use(middleware.Gzip())
	s.engine.Use(BodyDumpMiddleware())
	s.engine.Use(RateLimiterMiddleware())
	s.engine.Use(CustomErrorHandlerMiddleware())
	s.engine.Use(middleware.Recover())

	return s
}

func (s *server) Engine() *echo.Echo {
	return s.engine
}

// @link https://echo.labstack.com/docs/cookbook/graceful-shutdown
func (s *server) Start(port int) {
	go func() {
		if err := s.engine.Start(fmt.Sprintf(":%d", port)); err != nil && err != http.ErrServerClosed {
			s.engine.Logger.Fatal("shutting down the server")
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
