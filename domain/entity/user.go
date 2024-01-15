package entity

import (
	"time"
)

type User struct {
	Id        int64     `json:"id"`
	Uid       string    `json:"uid"`
	Email     string    `json:"email"`
	Username  string    `json:"username"`
	PhotoUrl  string    `json:"photoUrl,omitempty"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}
