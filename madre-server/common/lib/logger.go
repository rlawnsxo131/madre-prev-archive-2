package lib

import (
	"io"
	"os"
	"sync"

	"github.com/rs/zerolog"
)

// singleton default logger
var (
	_onceDefaultLogger     sync.Once
	singletonDefaultLogger *zerolog.Logger
)

func GetDefaultLogger() *zerolog.Logger {
	_onceDefaultLogger.Do(func() {
		// wr := diode.NewWriter(os.Stdout, 100, 0, func(missed int) {
		// 	fmt.Printf("Logger Dropped %d messages", missed)
		// })
		l := zerolog.New(os.Stdout)
		singletonDefaultLogger = &l
	})
	return singletonDefaultLogger
}

// default logger
func NewDefaultLogger(w io.Writer) *zerolog.Logger {
	l := zerolog.New(w)
	return &l
}
