package entity

type UserSocialAccount struct {
	Id             int64  `json:"id"`
	UserId         int64  `json:"userId"`
	SocialId       string `json:"socialId"`
	SocialUsername string `json:"socialUsername,omitempty"`
	Provider       string `json:"provider"`
}
