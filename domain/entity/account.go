package entity

import "time"

type Account struct {
	Id        int64     `json:"id"`
	UId       string    `json:"uid"`
	Email     string    `json:"email"`
	Username  string    `json:"username"`
	PhotoUrl  string    `json:"photoUrl,omitempty"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}

type AccountSocialProvider struct {
	Id             int64  `json:"id"`
	AccountId      int64  `json:"accountId"`
	SocialId       string `json:"socialId"`
	SocialUsername string `json:"socialUsername,omitempty"`
	Provider       string `json:"provider"`
}

// @TODO history entity
