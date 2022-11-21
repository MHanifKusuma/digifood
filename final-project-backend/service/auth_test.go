package service

import (
	"final-project-backend/mocks"
	"final-project-backend/model"
	"final-project-backend/pkg/utils"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestUserLogin(t *testing.T) {
	t.Run("success", func(t *testing.T) {
		loginUser := model.UserLogin{
			Login:    "user.one@email.com",
			Password: "1234",
		}

		authRepo := mocks.NewAuthRepository(t)
		authRepo.On("FindUserByLoginInfo", loginUser).Return(&model.User{
			Email:    "user.one@email.com",
			Password: `$2a$04$LoG0NFPuaobuUM0X9j4PGOU8PNxlcdaO7CHckjOcNPPotR6EKNWQq`,
		}, nil)

		authService := NewAuthService(authRepo)
		token, status, _ := authService.Login(&loginUser)

		assert.Equal(t, 200, status)
		assert.NotNil(t, token)

	})

	t.Run("user-not-found", func(t *testing.T) {
		loginUser := model.UserLogin{
			Login:    "user.two@email.com",
			Password: "1234",
		}

		authRepo := mocks.NewAuthRepository(t)
		authRepo.On("FindUserByLoginInfo", loginUser).Return(nil, utils.ErrUserNotFound)

		authService := NewAuthService(authRepo)
		token, status, _ := authService.Login(&loginUser)

		assert.Equal(t, 404, status)
		assert.Equal(t, "", token)

	})

	t.Run("wrong-credentials", func(t *testing.T) {
		loginUser := model.UserLogin{
			Login:    "user.one@email.com",
			Password: "0987",
		}

		authRepo := mocks.NewAuthRepository(t)
		authRepo.On("FindUserByLoginInfo", loginUser).Return(&model.User{
			Email:    "user.one@email.com",
			Password: `$2a$04$LoG0NFPuaobuUM0X9j4PGOU8PNxlcdaO7CHckjOcNPPotR6EKNWQq`,
		}, nil)

		authService := NewAuthService(authRepo)
		token, status, _ := authService.Login(&loginUser)

		assert.Equal(t, 403, status)
		assert.Equal(t, "", token)

	})
}

// func TestUserRegister(t *testing.T) {
// 	t.Run("success", func(t *testing.T) {
// 		registerUser := model.User{
// 			FullName:  "usernew",
// 			Email:     "user.new@email.com",
// 			Phone:     "098765654321",
// 			Username:  "usernew",
// 			Password:  "usernew",
// 			Role:      1,
// 			CreatedAt: time.Now(),
// 			UpdatedAt: time.Now(),
// 		}

// 		authRepo := mocks.NewAuthRepository(t)

// 		checkUserEmail := model.UserLogin{
// 			Login:    registerUser.Email,
// 			Password: registerUser.Password,
// 		}
// 		checkUserPhone := model.UserLogin{
// 			Login:    registerUser.Phone,
// 			Password: registerUser.Password,
// 		}
// 		checkUserUsername := model.UserLogin{
// 			Login:    registerUser.Username,
// 			Password: registerUser.Password,
// 		}

// 		authRepo.On("FindUserByLoginInfo", checkUserEmail).Return(nil, utils.ErrUserNotFound)
// 		authRepo.On("FindUserByLoginInfo", checkUserPhone).Return(nil, utils.ErrUserNotFound)
// 		authRepo.On("FindUserByLoginInfo", checkUserUsername).Return(nil, utils.ErrUserNotFound)
// 		authRepo.On("RegisterUser", registerUser).Return("register success", nil)

// 		authService := NewAuthService(authRepo)
// 		_, status, _ := authService.RegisterUser(&registerUser)

// 		assert.Equal(t, 201, status)
// 	})
// }
