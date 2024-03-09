package rdb

import (
	"context"
	"database/sql"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"time"
)

func ExcuteInitSQL(db *sql.DB) error {
	_, b, _, _ := runtime.Caller(0)
	basePath := filepath.Dir(b)

	file, err := os.ReadFile(
		filepath.Join(basePath, "init.sql"),
	)
	if err != nil {
		return err
	}

	ctx, ctxCancel := context.WithTimeout(
		context.Background(),
		10*time.Second,
	)
	defer ctxCancel()

	tx, err := db.BeginTx(ctx, nil)
	if err != nil {
		return err
	}

	queries := strings.Split(string(file), "\n\n")
	for _, query := range queries {
		if _, err := tx.ExecContext(ctx, query); err != nil {
			if err := tx.Rollback(); err != nil {
				return err
			}
			return err
		}
	}

	if err := tx.Commit(); err != nil {
		return err
	}

	return nil
}
