package repository

import (
	"database/sql"
	"errors"

	"github.com/huandu/go-sqlbuilder"

	"github.com/rlawnsxo131/madre-server/domain/entity"
	"github.com/rlawnsxo131/madre-server/domain/mapper"
	"github.com/rlawnsxo131/madre-server/domain/persist"
	"github.com/rlawnsxo131/madre-server/domain/persist/model"
)

var (
	_accountStruct = sqlbuilder.NewStruct(&model.Account{})
)

type AccountRepository struct {
	layer  *persist.QueryLayer
	mapper mapper.AccountMapper
}

func NewAccountRepository() *AccountRepository {
	return &AccountRepository{
		layer:  persist.GetQueryLayer(),
		mapper: mapper.AccountMapper{},
	}
}

// read
func (repo *AccountRepository) FindById(
	conn persist.Conn,
	id int64,
	opts ...persist.QueryOption,
) (*entity.Account, error) {
	options := repo.layer.Options(opts...)

	sb := _accountStruct.SelectFrom("account")
	sb.Where(sb.Equal("id", id))

	if options.WithLock {
		sb.ForUpdate()
	}

	query, args := sb.Build()

	repo.layer.Logging(query, args)

	var acct model.Account
	err := conn.
		QueryRowContext(options.Ctx, query, args...).
		Scan(_accountStruct.Addr(&acct)...)

	if err != nil {
		return nil, err
	}

	return repo.mapper.MapToEntity(&acct), nil
}

func (repo *AccountRepository) ExistsByUsername(
	conn persist.Conn,
	username string,
	opts ...persist.QueryOption,
) (bool, error) {
	options := repo.layer.Options(opts...)
	sb := sqlbuilder.NewSelectBuilder()
	existsSb := sqlbuilder.NewSelectBuilder()

	query, args := sb.
		Select("true").
		From("account").
		Where(
			sb.Exists(
				existsSb.
					Select("1").
					From("account").
					Where(
						existsSb.Equal("username", username),
					),
			),
		).Build()

	repo.layer.Logging(query, args)

	var exists bool
	err := conn.
		QueryRowContext(options.Ctx, query, args...).
		Scan(&exists)

	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return false, nil
		}
		return false, err
	}

	return exists, nil
}

// command
