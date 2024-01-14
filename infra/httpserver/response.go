package httpserver

import (
	"net/http"
)

type response struct {
	Code   int    `json:"code"`
	Status string `json:"status"`
	Data   any    `json:"data"`
}

func NewResponse(code int, data any) *response {
	return &response{
		Code:   code,
		Status: http.StatusText(code),
		Data:   data,
	}
}

type errorResponse struct {
	Code   int    `json:"code"`
	Status string `json:"status"`
	Error  any    `json:"error,omitempty"`
}

func NewErrorResponse(code int, err any) *errorResponse {
	return &errorResponse{
		Code:   code,
		Status: http.StatusText(code),
		Error:  err,
	}
}

func (r *errorResponse) SetError(err any) {
	r.Error = err
}
