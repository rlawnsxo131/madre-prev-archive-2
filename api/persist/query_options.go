package persist

import (
	"context"
)

// function interface
type QueryOption interface {
	Apply(*queryOptions)
}

// option variable
type queryOptions struct {
	Ctx    context.Context
	WithTx bool
}

// verify-interface-compliance
// @link https://github.com/uber-go/guide/blob/master/style.md#verify-interface-compliance
var _ QueryOption = (*queryOptionFunc)(nil)

type queryOptionFunc func(*queryOptions)

func (f queryOptionFunc) Apply(o *queryOptions) {
	f(o)
}

// apply option functions
func WithCtx(ctx context.Context) QueryOption {
	return queryOptionFunc(func(o *queryOptions) {
		o.Ctx = ctx
	})
}

func WithTx(withTx bool) QueryOption {
	return queryOptionFunc(func(o *queryOptions) {
		o.WithTx = withTx
	})
}
