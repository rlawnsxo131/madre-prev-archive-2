package persistence

import (
	"context"
	"database/sql"
	"sync"
	"time"

	"github.com/rlawnsxo131/madre-server/api/common/lib"
	"github.com/rs/zerolog"
)

type Conn interface {
	QueryRowContext(ctx context.Context, query string, args ...any) *sql.Row
	QueryContext(ctx context.Context, query string, args ...any) (*sql.Rows, error)
	ExecContext(ctx context.Context, query string, args ...any) (sql.Result, error)
}

type QueryOptions struct {
	Conn   Conn
	WithTx bool
}

var (
	_onceQueryLogger     sync.Once
	singletonQueryLogger *QueryLogger
)

// query logger
type QueryLogger struct {
	l *zerolog.Logger
}

func GetQueryLogger() *QueryLogger {
	_onceQueryLogger.Do(func() {
		singletonQueryLogger = &QueryLogger{
			l: lib.NewDefaultLogger(),
		}
	})

	return singletonQueryLogger
}

func (ql QueryLogger) Logging(sql string, args ...any) {
	ql.l.Log().
		Str("time", time.Now().Local().Format(time.RFC3339Nano)).
		Str("sql", sql).
		Any("args", args).
		Send()
}
