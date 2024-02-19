package mapper

import (
	"github.com/rlawnsxo131/madre-server/common/utils"
	"github.com/rlawnsxo131/madre-server/domain/entity"
	"github.com/rlawnsxo131/madre-server/domain/persist/model"
)

type AccountMapper struct{}

func (am AccountMapper) MapToModel(acct *entity.Account) *model.Account {
	return &model.Account{
		Id:        acct.Id,
		UId:       acct.UId,
		Email:     acct.Email,
		Username:  acct.Username,
		PhotoUrl:  utils.NewNullString(acct.PhotoUrl),
		CreatedAt: acct.CreatedAt,
		UpdatedAt: acct.UpdatedAt,
	}
}

func (am AccountMapper) MapToEntity(acct *model.Account) *entity.Account {
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
