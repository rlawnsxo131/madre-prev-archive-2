package persist

import (
	"context"
	"database/sql"
	"os"
	"sync"
	"time"

	"github.com/rlawnsxo131/madre-server/common/lib"
	"github.com/rs/zerolog"
)

/* example
repo := repository.NewRepository()
exists, err := repo.FindById(
	conn,
	id,
	persist.WithCtx(context.Background()),
	persist.WithLock(true),
)
*/

// interface for not directly receiving sql.DB
type Conn interface {
	QueryRowContext(ctx context.Context, query string, args ...any) *sql.Row
	QueryContext(ctx context.Context, query string, args ...any) (*sql.Rows, error)
	ExecContext(ctx context.Context, query string, args ...any) (sql.Result, error)
}

// query layer
// it exists as a field within the repository
var (
	_onceQueryLayer     sync.Once
	singletonQueryLayer *QueryLayer
)

type QueryLayer struct {
	l *zerolog.Logger
}

func GetQueryLayer() *QueryLayer {
	_onceQueryLayer.Do(func() {
		singletonQueryLayer = &QueryLayer{
			l: lib.NewDefaultLogger(os.Stdout),
		}
	})
	return singletonQueryLayer
}

func (ql *QueryLayer) Options(opts ...QueryOption) queryOptions {
	options := queryOptions{
		Ctx:      context.Background(),
		WithLock: false,
	}
	for _, o := range opts {
		o.Apply(&options)
	}
	return options
}

func (ql *QueryLayer) Logging(sql string, args ...any) {
	ql.l.Log().
		Str("time", time.Now().Local().Format(time.RFC3339Nano)).
		Str("sql", sql).
		Any("args", args).
		Send()
}
