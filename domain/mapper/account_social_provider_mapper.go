package mapper

import (
	"github.com/rlawnsxo131/madre-server/common/utils"
	"github.com/rlawnsxo131/madre-server/domain/entity"
	"github.com/rlawnsxo131/madre-server/domain/persist/model"
)

type AccountSocialProviderMapper struct{}

func (mapper AccountSocialProviderMapper) MapToModel(provider *entity.AccountSocialProvider) *model.AccountSocialProvider {
	return &model.AccountSocialProvider{
		Id:             provider.Id,
		AccountId:      provider.AccountId,
		SocialId:       provider.SocialId,
		SocialUsername: utils.NewNullString(provider.SocialUsername),
		Provider:       provider.Provider,
	}
}

func (mapper AccountSocialProviderMapper) MapToEntity(provider *model.AccountSocialProvider) *entity.AccountSocialProvider {
	return &entity.AccountSocialProvider{
		Id:             provider.Id,
		AccountId:      provider.AccountId,
		SocialId:       provider.SocialId,
		SocialUsername: utils.NormalizeNullString(provider.SocialUsername),
		Provider:       provider.Provider,
	}
}
