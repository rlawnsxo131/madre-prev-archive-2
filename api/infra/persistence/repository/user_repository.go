package repository

import (
	"database/sql"
	"errors"

	"github.com/huandu/go-sqlbuilder"
	"github.com/rlawnsxo131/madre-server/api/entity"
	"github.com/rlawnsxo131/madre-server/api/infra/persistence"
	"github.com/rlawnsxo131/madre-server/api/infra/persistence/model"
)

type UserRepository struct {
	layer  *persistence.QueryLayer
	mapper model.UserMapper
}

func NewUserRepository() *UserRepository {
	return &UserRepository{
		layer:  persistence.GetQueryLayer(),
		mapper: model.UserMapper{},
	}
}

var _userStruct = sqlbuilder.NewStruct(&model.User{})

func (repo *UserRepository) FindById(
	conn persistence.Conn,
	id int64,
	opts ...persistence.QueryOption,
) (*entity.User, error) {
	options := repo.layer.Options(opts...)

	sb := _userStruct.SelectFrom("user")
	sb.Where(sb.Equal("id", id))

	if options.WithTx {
		sb.ForUpdate()
	}

	query, args := sb.Build()

	repo.layer.Logging(query, args)

	var u model.User
	err := conn.
		QueryRowContext(options.Ctx, query, args...).
		Scan(_userStruct.Addr(&u)...)

	if err != nil {
		return nil, err
	}

	return repo.mapper.MapToEntity(&u), nil
}

func (repo *UserRepository) ExistsByUsername(
	conn persistence.Conn,
	username string,
	opts ...persistence.QueryOption,
) (bool, error) {
	options := repo.layer.Options(opts...)
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
