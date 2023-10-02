package service

import (
	"context"

	"github.com/rlawnsxo131/madre-server/api/persistence"
	"github.com/rlawnsxo131/madre-server/api/persistence/repository"
)

type UserService struct {
	conn     persistence.Conn
	userRepo *repository.UserRepository
}

func NewUserService(conn persistence.Conn) *UserService {
	return &UserService{
		conn:     conn,
		userRepo: repository.NewUserRepository(),
	}
}

func (svc *UserService) IsExistsUsername(username string) (bool, error) {
	exsits, err := svc.userRepo.ExistsByUsername(
		context.Background(),
		&persistence.QueryOptions{Conn: svc.conn},
		username,
	)

	if err != nil {
		return false, err
	}

	return exsits, nil
}
