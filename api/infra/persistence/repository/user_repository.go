package repository

import (
	"context"
	"database/sql"
	"errors"

	"github.com/huandu/go-sqlbuilder"
	"github.com/rlawnsxo131/madre-server/api/entity"
	"github.com/rlawnsxo131/madre-server/api/infra/persistence"
	"github.com/rlawnsxo131/madre-server/api/infra/persistence/model"
)

type UserRepository struct {
	l      *persistence.QueryLogger
	mapper model.UserMapper
}

func NewUserRepository() *UserRepository {
	return &UserRepository{
		l:      persistence.GetQueryLogger(),
		mapper: model.UserMapper{},
	}
}

var _userStruct = sqlbuilder.NewStruct(&model.User{})

func (ur *UserRepository) FindById(
	ctx context.Context,
	opts *persistence.QueryOptions,
	id int64,
) (*entity.User, error) {
	sb := _userStruct.SelectFrom("user")
	sb.Where(sb.Equal("id", id))

	if opts.WithTx {
		sb.ForUpdate()
	}

	query, args := sb.Build()

	ur.l.Logging(query, args)

	var u model.User
	err := opts.Conn.
		QueryRowContext(ctx, query, args...).
		Scan(_userStruct.Addr(&u)...)

	if err != nil {
		return nil, err
	}

	return ur.mapper.MapToEntity(&u), nil
}

func (ur *UserRepository) ExistsByUsername(
	ctx context.Context,
	opts *persistence.QueryOptions,
	username string,
) (bool, error) {
	sb := sqlbuilder.NewSelectBuilder()
	existsSb := sqlbuilder.NewSelectBuilder()

	query, args := sb.
		Select("true").
		From("user").
		Where(
			sb.Exists(
				existsSb.
					Select("1").
					From("user").
					Where(
						existsSb.Equal("username", username),
					),
			),
		).Build()

	ur.l.Logging(query, args)

	var exists bool
	err := opts.Conn.
		QueryRowContext(ctx, query, args...).
		Scan(&exists)

	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return false, nil
		}
		return false, err
	}

	return exists, nil
}
