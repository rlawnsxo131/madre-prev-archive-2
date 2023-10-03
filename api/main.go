package main

import (
	"fmt"
	"runtime"

	"github.com/rlawnsxo131/madre-server/api/common/lib"
	"github.com/rlawnsxo131/madre-server/api/infra/database"
	"github.com/rlawnsxo131/madre-server/api/infra/server"
	"github.com/rlawnsxo131/madre-server/api/router"
	routerv1 "github.com/rlawnsxo131/madre-server/api/router/v1"
)

func init() {
	coreCount := runtime.NumCPU()
	runtime.GOMAXPROCS(coreCount - 1)

	lib.GetDefaultLogger().
		Info().
		Int("core count", coreCount).
		Int("max use core count", runtime.GOMAXPROCS(0)).
		Send()
}

func main() {
	db, err := database.CreateConnection(
		database.MainDBConfig(),
	)
	if err != nil {
		lib.GetDefaultLogger().
			Fatal().
			Err(fmt.Errorf("database connection fail: %+v", err)).
			Send()
	}

	s := server.New().Init()
	engine := s.Engine()

	root := engine.Group("")
	api := root.Group("/api")
	v1 := api.Group("/v1")

	router.InitHealthRouter(root)
	routerv1.InitAuthRouter(v1, db)
	routerv1.InitMeRouter(v1, db)

	s.Start(5001)
}
