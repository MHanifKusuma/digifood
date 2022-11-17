package utils

import (
	"encoding/json"
	"net/http"
)

// JSONResponse is to standardize the response
type JSONResponse struct {
	Message string `json:"message,omitempty"`
	Data    any    `json:"data,omitempty"`
}

// returnJSONResponse is a helper function, returning JSON value containing message and data
func returnJSONResponse(w http.ResponseWriter, message string, data any, statusCode int) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	json.NewEncoder(w).Encode(JSONResponse{
		Message: message,
		Data:    data,
	})
}

// SuccessResponse is to return success JSON response
func SuccessResponse(w http.ResponseWriter, data any, statusCode ...int) {
	code := http.StatusOK
	if len(statusCode) > 0 {
		code = statusCode[0]
	}

	returnJSONResponse(w, "success", data, code)
}

// ErrorResponse is to return error JSON response
func ErrorResponse(w http.ResponseWriter, message string, statusCode ...int) {
	code := http.StatusBadRequest
	if len(statusCode) > 0 {
		code = statusCode[0]
	}

	returnJSONResponse(w, message, nil, code)
}
