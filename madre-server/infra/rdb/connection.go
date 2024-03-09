package rdb

import (
	"database/sql"
	"time"

	"github.com/go-sql-driver/mysql"
)

func CreateConnection(cfg *mysql.Config) (*sql.DB, error) {
	connector, err := mysql.NewConnector(cfg)
	if err != nil {
		return nil, err
	}

	db := sql.OpenDB(connector)
	db.SetConnMaxLifetime(time.Minute * 5)
	db.SetMaxIdleConns(10)
	db.SetMaxOpenConns(10)

	if rows, err := db.Query("SELECT 1"); err != nil {
		return nil, err
	} else {
		defer rows.Close()
	}

	return db, nil
}
