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

func (am AccountMapper) MapToModel(acct *entity.Account) *Account {
	return &Account{
		Id:        acct.Id,
		UId:       acct.UId,
		Email:     acct.Email,
		Username:  acct.Username,
		PhotoUrl:  utils.NewNullString(acct.PhotoUrl),
		CreatedAt: acct.CreatedAt,
		UpdatedAt: acct.UpdatedAt,
	}
}

func (am AccountMapper) MapToEntity(acct *Account) *entity.Account {
	return &entity.Account{
		Id:        acct.Id,
		UId:       acct.UId,
		Email:     acct.Email,
		Username:  acct.Username,
		PhotoUrl:  utils.NormalizeNullString(acct.PhotoUrl),
		CreatedAt: acct.CreatedAt,
		UpdatedAt: acct.UpdatedAt,
	}
}
