package middleware

import (
	"net/http"
	"strings"

	utils "final-project-backend/pkg/utils"
	"final-project-backend/pkg/utils/jwt"

	"github.com/gin-gonic/gin"
)

func AuthMiddleware() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		if strings.Contains(ctx.FullPath(), "docs") {
			ctx.Next()
			return
		}

		authToken := ctx.Request.Header.Get("Authorization")
		if authToken == "" {
			utils.ErrorResponse(ctx.Writer, utils.ErrNoAuthorization.Error(), http.StatusForbidden)
			ctx.Abort()
			return
		}

		authToken = strings.Replace(authToken, "Bearer ", "", 1)

		user_id, err := jwt.ValidateToken(authToken)
		if err != nil || user_id == "" {
			utils.ErrorResponse(ctx.Writer, utils.ErrTokenInvalid.Error(), http.StatusForbidden)
			ctx.Abort()
			return
		}

		ctx.Next()
	}
}
