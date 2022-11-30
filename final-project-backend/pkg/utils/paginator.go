package utils

import (
	"math"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
)

const (
	SEARCH_BY_MENU_NAME = "name"
	FILTER_BY_CATEGORY  = "category"
	DEFAULT_SORT_BY     = "avg_rating"
	SORT_BY_DATE        = "created_at"
)

type Pageable interface {
	SearchParams() map[string]interface{}
	FilterParams() map[string]interface{}
	GetPage() int
	GetLimit() int
	SortBy() string
}

type Page struct {
	Data        interface{} `json:"data"`
	CurrentPage int         `json:"current_page"`
	Total       int         `json:"total"`
	TotalPage   int         `json:"total_page"`
}

type Paginator struct {
	PerPageNums int
	MaxPages    int

	nums     int
	pageNums int
	page     int
}

func (p *Paginator) PageNums() int {
	if p.pageNums != 0 {
		return p.pageNums
	}

	pageNums := math.Ceil(float64(p.nums) / float64(p.PerPageNums))
	if p.MaxPages > 0 {
		pageNums = math.Min(pageNums, float64(p.MaxPages))
	}

	p.pageNums = int(pageNums)
	return p.pageNums
}

func (p *Paginator) Page() int {
	p.PageNums()

	if p.page <= 0 {
		p.page = 1
	}

	return p.page
}

func (p *Paginator) Offset() int {
	return (p.Page() - 1) * p.PerPageNums
}

func (p *Paginator) Pageable(data interface{}) *Page {
	return &Page{
		CurrentPage: p.page,
		Total:       p.nums,
		TotalPage:   p.pageNums,
		Data:        data,
	}
}

func NewPaginator(currentPage, limit, nums int) *Paginator {
	p := Paginator{}

	p.page = currentPage
	if limit <= 0 {
		limit = 10
	}

	p.PerPageNums = limit
	p.nums = nums

	return &p
}

func PageFromQueryParam(c *gin.Context) int {
	if page, e := strconv.Atoi(c.Request.FormValue("page")); e != nil {
		return 0
	} else {
		if page <= 0 {
			page = 0
		}
		return page
	}
}

func LimitFromQueryParam(c *gin.Context) int {
	if limit, e := strconv.Atoi(c.Request.FormValue("limit")); e != nil {
		return 10
	} else {
		if limit <= 0 {
			limit = 10
		}
		return limit
	}
}

func SortValueFromQueryParam(c *gin.Context) string {
	return c.Request.FormValue("sortBy")
}

func OrderFromQueryParam(c *gin.Context) string {
	if sort := c.Request.FormValue("order"); strings.ToLower(sort) == "asc" {
		return "asc"
	} else {
		return "desc"
	}
}
