package response

import (
	"net/http"
)

type httpResponse struct {
	Code   int    `json:"code"`
	Status string `json:"status"`
	Data   any    `json:"data"`
}

func NewHTTPResponse(code int, data any) *httpResponse {
	return &httpResponse{
		Code:   code,
		Status: http.StatusText(code),
		Data:   data,
	}
}

type httpErrorResponse struct {
	Code   int    `json:"code"`
	Status string `json:"status"`
	Error  any    `json:"error,omitempty"`
}

func NewHTTPErrorResponse(code int, err any) *httpErrorResponse {
	return &httpErrorResponse{
		Code:   code,
		Status: http.StatusText(code),
		Error:  err,
	}
}

func (r *httpErrorResponse) SetError(err any) {
	r.Error = err
}
