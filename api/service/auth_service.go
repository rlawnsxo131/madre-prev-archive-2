package service

import (
	"github.com/rlawnsxo131/madre-server/domain/persist"
	"github.com/rlawnsxo131/madre-server/domain/persist/repository"
)

type AuthService struct {
	conn        persist.Conn
	accountRepo *repository.AccountRepository
}

func NewAuthService(conn persist.Conn) *AuthService {
	return &AuthService{
		conn:        conn,
		accountRepo: repository.NewAccountRepository(),
	}
}
