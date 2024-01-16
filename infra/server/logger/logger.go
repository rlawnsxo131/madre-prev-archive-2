package logger

import (
	"bytes"
	"io"
	"os"

	"github.com/rlawnsxo131/madre-server/common/lib"
	"github.com/rs/zerolog"
)

var DefaultHTTPLogger = NewHTTPLogger(os.Stdout)

// HTTPLogger
type HTTPLogger interface {
	NewLogEntry() HTTPLogEntry
}

type httpLogger struct {
	l *zerolog.Logger
}

var _ HTTPLogger = (*httpLogger)(nil)

func NewHTTPLogger(w io.Writer) HTTPLogger {
	return &httpLogger{
		l: lib.NewDefaultLogger(os.Stdout),
	}
}

func (hl *httpLogger) NewLogEntry() HTTPLogEntry {
	return &httpLogEntry{
		l: hl.l,
	}
}

// LogEntry
type HTTPLogEntry interface {
	GetLogger() *zerolog.Logger
	BodyDump(reqBody, resBody []byte)
	GetBody() *httpBody
}

type httpLogEntry struct {
	l        *zerolog.Logger
	httpBody *httpBody
}

var _ HTTPLogEntry = (*httpLogEntry)(nil)

func (le *httpLogEntry) GetLogger() *zerolog.Logger {
	return le.l
}

func (le *httpLogEntry) BodyDump(reqBody, resBody []byte) {
	le.httpBody = &httpBody{
		ReqBody: bytes.NewBuffer(reqBody).String(),
		ResBody: bytes.NewBuffer(resBody).String(),
	}
}

func (le *httpLogEntry) GetBody() *httpBody {
	return le.httpBody
}

// value structs
type httpBody struct {
	ReqBody string
	ResBody string
}
