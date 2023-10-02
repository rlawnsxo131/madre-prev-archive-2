package lib

import (
	"fmt"
	"os"
	"sync"
	"time"

	"github.com/rs/zerolog"
	"github.com/rs/zerolog/diode"
)

// thread safe singleton default logger
var (
	_onceDefaultLogger     sync.Once
	singletonDefaultLogger *zerolog.Logger
)

func GetDefaultLogger() *zerolog.Logger {
	_onceDefaultLogger.Do(func() {
		wr := diode.NewWriter(os.Stdout, 100, 10*time.Millisecond, func(missed int) {
			fmt.Printf("Logger Dropped %d messages", missed)
		})
		l := zerolog.New(wr)
		singletonDefaultLogger = &l
	})
	return singletonDefaultLogger
}

// default logger
func NewDefaultLogger() *zerolog.Logger {
	l := zerolog.New(os.Stdout)
	return &l
}
