package model

import (
	"database/sql"
	"time"
)

type Account struct {
	Id        int64          `db:"id"`
	UId       string         `db:"uid"`
	Email     string         `db:"email"`
	Username  string         `db:"username"`
	PhotoUrl  sql.NullString `db:"photo_url"`
	CreatedAt time.Time      `db:"created_at"`
	UpdatedAt time.Time      `db:"updated_at"`
}
