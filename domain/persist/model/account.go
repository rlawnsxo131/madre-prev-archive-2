package model

import (
	"database/sql"
	"time"

	"github.com/rlawnsxo131/madre-server/common/utils"
	"github.com/rlawnsxo131/madre-server/domain/entity"
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

type AccountMapper struct{}

func (am AccountMapper) MapToModel(u *entity.Account) *Account {
	return &Account{
		Id:        u.Id,
		UId:       u.UId,
		Email:     u.Email,
		Username:  u.Username,
		PhotoUrl:  utils.NewNullString(u.PhotoUrl),
		CreatedAt: u.CreatedAt,
		UpdatedAt: u.UpdatedAt,
	}
}

func (am AccountMapper) MapToEntity(a *Account) *entity.Account {
	return &entity.Account{
		Id:        a.Id,
		UId:       a.UId,
		Email:     a.Email,
		Username:  a.Username,
		PhotoUrl:  utils.NormalizeNullString(a.PhotoUrl),
		CreatedAt: a.CreatedAt,
		UpdatedAt: a.UpdatedAt,
	}
}
