package rdb

import (
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
