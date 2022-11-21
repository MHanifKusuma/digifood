package repository

import (
	"database/sql/driver"
	"errors"
	"final-project-backend/model"
	"regexp"
	"testing"
	"time"

	"github.com/DATA-DOG/go-sqlmock"
	"github.com/stretchr/testify/assert"
)

type AnyTime struct{}

func (a AnyTime) Match(v driver.Value) bool {
	_, ok := v.(time.Time)
	return ok
}

func TestGetAllCategory(t *testing.T) {
	suite := SetupSuite(t)

	t.Run("success", func(t *testing.T) {
		query := `
			SELECT * FROM "categories"
		`
		categoriesMockResult := sqlmock.NewRows([]string{"id", "name"}).
			AddRow(1, "Beverages").
			AddRow(2, "Appetizer")

		expectedResult := []*model.Category{
			{
				Id:   1,
				Name: "Beverages",
			},
			{
				Id:   2,
				Name: "Appetizer",
			},
		}

		suite.mock.ExpectQuery(regexp.QuoteMeta(query)).WillReturnRows(categoriesMockResult)

		res, err := suite.categoryRepo.GetAllCategory()
		assert.Equal(t, expectedResult, res)
		assert.Nil(t, err)

	})
	t.Run("failed", func(t *testing.T) {
		query := `
			SELECT * FROM "categories"
		`

		suite.mock.ExpectQuery(regexp.QuoteMeta(query)).WillReturnError(errors.New("error"))

		_, err := suite.categoryRepo.GetAllCategory()
		assert.NotNil(t, err)

	})
}

func TestGetCategoryById(t *testing.T) {
	suite := SetupSuite(t)

	t.Run("success", func(t *testing.T) {
		query := `SELECT * FROM "categories" WHERE "categories"."id" = $1 AND "categories"."deleted_at" IS NULL ORDER BY "categories"."id" LIMIT 1`

		categoryMockResult := sqlmock.NewRows([]string{"id", "name"}).AddRow(1, "Beverages")

		expectedResult := &model.Category{
			Id:   1,
			Name: "Beverages",
		}

		suite.mock.ExpectQuery(regexp.QuoteMeta(query)).WillReturnRows(categoryMockResult)
		res, err := suite.categoryRepo.GetCategoryById(1)
		assert.Nil(t, err)
		assert.Equal(t, expectedResult, res)
	})

	t.Run("failed", func(t *testing.T) {
		query := `SELECT * FROM "categories" WHERE "categories"."id" = $1 AND "categories"."deleted_at" IS NULL ORDER BY "categories"."id" LIMIT 1`

		suite.mock.ExpectQuery(regexp.QuoteMeta(query)).WillReturnError(errors.New("error"))
		_, err := suite.categoryRepo.GetCategoryById(1)
		assert.NotNil(t, err)
	})
}

// func TestDeleteCategory(t *testing.T) {
// 	suite := SetupSuite(t)

// 	t.Run("success", func(t *testing.T) {
// 		query := `UPDATE "categories" SET "deleted_at"=$1 WHERE "categories"."id" = $2 AND "categories"."deleted_at" IS NULL`

// 		categoryToDelete := model.Category{
// 			Id:   1,
// 			Name: "Beverages",
// 		}

// 		suite.mock.ExpectBegin()
// 		suite.mock.ExpectQuery(regexp.QuoteMeta(query)).WillReturnError(nil)

// 		_, err := suite.categoryRepo.DeleteCategory(&categoryToDelete)
// 		assert.Nil(t, err)

// 	})
// }
