package model

import (
	"database/sql"
	"time"

	"github.com/rlawnsxo131/madre-server/api/entity"
	"github.com/rlawnsxo131/madre-server/common/utils"
)

type User struct {
	Id        int64          `db:"id"`
	Email     string         `db:"email"`
	Username  string         `db:"username"`
	PhotoUrl  sql.NullString `db:"photo_url"`
	CreatedAt time.Time      `db:"created_at"`
	UpdatedAt time.Time      `db:"updated_at"`
}

type UserMapper struct{}

func (um UserMapper) MapToModel(u *entity.User) *User {
	return &User{
		Id:        u.Id,
		Email:     u.Email,
		Username:  u.Username,
		PhotoUrl:  utils.NewNullString(u.PhotoUrl),
		CreatedAt: u.CreatedAt,
		UpdatedAt: u.UpdatedAt,
	}
}

func (um UserMapper) MapToEntity(u *User) *entity.User {
	return &entity.User{
		Id:        u.Id,
		Email:     u.Email,
		Username:  u.Username,
		PhotoUrl:  utils.NormalizeNullString(u.PhotoUrl),
		CreatedAt: u.CreatedAt,
		UpdatedAt: u.UpdatedAt,
	}
}
