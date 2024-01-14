package server

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
