package jwt

import (
	"time"

	"github.com/golang-jwt/jwt/v4"
)

var (
	secret      = "muhammadhanifkusumafinalprojectsecretkey"
	jwtDuration = 24 * time.Hour
)

type CustomClaims struct {
	UserRole string `json:"user_role"`
	UserId   string `json:"user_id"`
	jwt.RegisteredClaims
}

func GenerateToken(role string, userId string) (string, error) {
	now := time.Now()

	claims := CustomClaims{
		role,
		userId,
		jwt.RegisteredClaims{
			IssuedAt:  jwt.NewNumericDate(now),
			ExpiresAt: jwt.NewNumericDate(now.Add(jwtDuration)),
			Issuer:    "issuerforjwt",
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	ss, err := token.SignedString([]byte(secret))
	if err != nil {
		return "", nil
	}

	return ss, nil
}

func ValidateToken(input string) (string, string, error) {
	token, err := jwt.ParseWithClaims(
		input,
		&CustomClaims{},
		func(t *jwt.Token) (interface{}, error) {
			return []byte(secret), nil
		},
	)

	if err != nil {
		return "1", "", nil
	}

	if claims, ok := token.Claims.(*CustomClaims); ok && token.Valid {
		return claims.UserRole, claims.UserId, nil
	} else {
		return "1", "", err
	}
}
