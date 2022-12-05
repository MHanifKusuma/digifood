package model

import (
	"fmt"
	"strings"
)

type PageableRequest struct {
	Filters map[string]interface{}
	Search  map[string]interface{}
	Limit   int
	Page    int
	Sort_by string
	Order   string
	Type    string
}

func (p *PageableRequest) SearchParams() map[string]interface{} {
	return p.Search
}
func (p *PageableRequest) FilterParams() map[string]interface{} {
	return p.Filters
}
func (p *PageableRequest) GetPage() int {
	return p.Page
}
func (p *PageableRequest) GetLimit() int {
	return p.Limit
}
func (p *PageableRequest) SortBy() string {
	if p.Sort_by == "" {
		return "avg_rating DESC"
	}

	switch p.Type {
	case "menu":
		if strings.ToLower(p.Sort_by) != "price" && strings.ToLower(p.Sort_by) != "avg_rating" {
			return "avg_rating DESC"
		}
	case "order":
		if strings.ToLower(p.Sort_by) != "order_date" {
			return "created_at DESC"
		}
	case "coupon":
		if strings.ToLower(p.Sort_by) != "expired_at" && strings.ToLower(p.Sort_by) != "created_at" {
			return "expired_at DESC"
		}
	case "adminOrder":
		if strings.ToLower(p.Sort_by) != "created_at" {
			return "created_at DESC"
		}
	default:
		return "avg_rating DESC"
	}

	if p.Order == "asc" {
		return fmt.Sprintf("%s %s", p.Sort_by, "ASC")
	}

	return fmt.Sprintf("%s %s", p.Sort_by, "DESC")
}
