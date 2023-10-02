package main

import (
	"log"
	"runtime"

	"github.com/rlawnsxo131/madre-server/api/common/lib"
	"github.com/rlawnsxo131/madre-server/api/controller"
	controllerv1 "github.com/rlawnsxo131/madre-server/api/controller/v1"
	"github.com/rlawnsxo131/madre-server/api/infrastructure/database"
	"github.com/rlawnsxo131/madre-server/api/infrastructure/server"
)

func init() {
	log.Println("init")
}

func main() {
	coreCount := runtime.NumCPU()
	runtime.GOMAXPROCS(coreCount - 1)

	lib.GetDefaultLogger().
		Info().
		Int("core count", coreCount).
		Int("max use cpu count", runtime.GOMAXPROCS(0)).
		Send()

	db, err := database.CreateConnection(
		database.MainDBConfig(),
	)
	if err != nil {
		log.Fatalf("database connection fail: %+v", err)
	}

	s := server.New().Init()
	engine := s.Engine()

	root := engine.Group("")
	api := root.Group("/api")
	v1 := api.Group("/v1")

	controller.InitHealthController(root)
	controllerv1.InitAuthController(v1, db)
	controllerv1.InitMeController(v1, db)

	s.Start(5001)
}
