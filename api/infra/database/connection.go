package database

import (
	"database/sql"
	"time"

	"github.com/go-sql-driver/mysql"
)

var MainDBConfig = func() *mysql.Config {
	return &mysql.Config{
		User:                 "root",
		Passwd:               "1234",
		Net:                  "tcp",
		Addr:                 "127.0.0.1:3306",
		Collation:            "utf8mb4_0900_ai_ci",
		MaxAllowedPacket:     64 << 20,
		Loc:                  time.Local,
		AllowNativePasswords: true,
		CheckConnLiveness:    true,
		ParseTime:            true,
		DBName:               "madre",
	}
}

func CreateConnection(cfg *mysql.Config) (*sql.DB, error) {
	connector, err := mysql.NewConnector(cfg)
	if err != nil {
		return nil, err
	}

	db := sql.OpenDB(connector)
	db.SetConnMaxLifetime(time.Minute * 5)
	db.SetMaxIdleConns(10)
	db.SetMaxOpenConns(10)

	if _, err := db.Query("SELECT 1"); err != nil {
		return nil, err
	}

	return db, nil
}
