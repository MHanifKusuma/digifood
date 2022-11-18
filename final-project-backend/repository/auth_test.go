package repository

import (
	"final-project-backend/model"
	"regexp"
	"testing"
	"time"

	"github.com/DATA-DOG/go-sqlmock"
	"github.com/stretchr/testify/assert"
)

func TestRegisterUser(t *testing.T) {
	suite := SetupSuite(t)

	t.Run("success", func(t *testing.T) {
		query := `INSERT INTO "users" ("full_name","phone","email","username","password","role","profile_picture","created_at","updated_at","deleted_at") VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING "id"`

		newUser := model.User{
			FullName:       "user one",
			Phone:          "098987876543",
			Email:          "user.one@email.com",
			Username:       "userone",
			Password:       "userone123!",
			Role:           1,
			ProfilePicture: "",
			CreatedAt:      time.Now(),
			UpdatedAt:      time.Now(),
		}

		suite.mock.ExpectBegin()
		suite.mock.
			ExpectQuery(regexp.QuoteMeta(query)).
			WithArgs(newUser.FullName, newUser.Phone, newUser.Email, newUser.Username, newUser.Password, newUser.Role, "", newUser.CreatedAt, newUser.UpdatedAt, nil).
			WillReturnRows(sqlmock.NewRows([]string{"id"}).AddRow(1))
		suite.mock.ExpectCommit()

		_, err := suite.authRepo.RegisterUser(newUser)
		assert.Nil(t, err)
	})

	t.Run("failed", func(t *testing.T) {
		query := `INSERT INTO "users" ("phone","email","username","password","role","profile_picture","created_at","updated_at","deleted_at") VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING "id"`

		newUser := model.User{
			Phone:          "098987876543",
			Email:          "user.one@email.com",
			Username:       "userone",
			Password:       "userone123!",
			Role:           1,
			ProfilePicture: "",
			CreatedAt:      time.Now(),
			UpdatedAt:      time.Now(),
		}

		suite.mock.ExpectBegin()
		suite.mock.
			ExpectQuery(regexp.QuoteMeta(query)).
			WithArgs(newUser.Phone, newUser.Email, newUser.Username, newUser.Password, newUser.Role, "", newUser.CreatedAt, newUser.UpdatedAt, nil).
			WillReturnRows(sqlmock.NewRows([]string{"id"}).AddRow(1))
		suite.mock.ExpectCommit()

		_, err := suite.authRepo.RegisterUser(newUser)
		assert.NotNil(t, err)
	})
}

func TestUserLogin(t *testing.T) {
	suite := SetupSuite(t)

	userLoginMockResult := sqlmock.
		NewRows([]string{"id", "fullname", "phone", "email", "username", "role", "profile_picture"}).
		AddRow(1, "user one", "087654352134", "user.one@email.com", "userone", 1, "")

	expectedUserEmail := "user.one@email.com"

	t.Run("success", func(t *testing.T) {
		testUserLogin := model.UserLogin{
			Login:    "user.one@email.com",
			Password: "userone123!",
		}

		queryUsername := `
			SELECT * FROM "users" WHERE (username ILIKE $1 OR email ILIKE $2 OR phone ILIKE $3) AND "users"."deleted_at" IS NULL ORDER BY "users"."id" LIMIT 1
		`

		suite.mock.ExpectQuery(regexp.QuoteMeta(queryUsername)).
			WithArgs(testUserLogin.Login, testUserLogin.Login, testUserLogin.Login).
			WillReturnRows(userLoginMockResult)

		res, _ := suite.authRepo.FindUserByLoginInfo(testUserLogin)
		assert.Equal(t, expectedUserEmail, res.Email)
	})

	t.Run("failed", func(t *testing.T) {
		testUserLogin := model.UserLogin{
			Login:    "user.one@email.com",
			Password: "user",
		}

		queryUsername := `
			SELECT * FROM "users" WHERE (username ILIKE $1 OR email ILIKE $2 OR phone ILIKE $3) AND "users"."deleted_at" IS NULL ORDER BY "users"."id" LIMIT 1
		`

		suite.mock.ExpectQuery(regexp.QuoteMeta(queryUsername)).
			WithArgs(testUserLogin.Login, testUserLogin.Login, testUserLogin.Login).
			WillReturnRows(userLoginMockResult)

		_, err := suite.authRepo.FindUserByLoginInfo(testUserLogin)
		assert.NotNil(t, err)
	})
}
