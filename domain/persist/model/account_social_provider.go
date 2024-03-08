package model

import "database/sql"

type AccountSocialProvider struct {
	Id             int64          `db:"id"`
	AccountId      int64          `db:"account_id"`
	SocialId       string         `db:"social_id"`
	SocialUsername sql.NullString `db:"social_username"`
	Provider       string         `db:"provider"`
}
