package main

import (
	"log"

	"github.com/rlawnsxo131/madre-server/api/controller"
	controllerv1 "github.com/rlawnsxo131/madre-server/api/controller/v1"
	"github.com/rlawnsxo131/madre-server/api/infra/database"
	"github.com/rlawnsxo131/madre-server/api/infra/server"
)

func init() {
	log.Println("init")
}

func main() {
	_, err := database.CreateConnection(
		database.MainDBConfig(),
	)
	if err != nil {
		log.Fatalf("database connection fail: %+v", err)
	}

	s := server.New()
	s.Init()

	engine := s.Engine()

	root := engine.Group("")
	api := root.Group("/api")
	v1 := api.Group("/v1")

	controller.InitHealthController(root)
	controllerv1.InitAuthController(v1)

	s.Start(5001)
}
