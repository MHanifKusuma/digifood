package router

import (
	"final-project-backend/handler"
	"final-project-backend/middleware"
	"final-project-backend/repository"
	"final-project-backend/service"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func HandleRequests(db *gorm.DB) {
	authRepository := repository.NewAuthRepository(db)
	categoryRepository := repository.NewCategoryRepository(db)
	menuRepository := repository.NewMenuRepository(db)
	couponRepository := repository.NewCouponRepository(db)
	paymentRepository := repository.NewPaymentRepository(db)
	deliveryRepository := repository.NewDeliveryRepository(db)
	orderRepository := repository.NewOrderRepository(db)
	userRepository := repository.NewUserRepository(db)

	authService := service.NewAuthService(authRepository)
	categoryService := service.NewCategoryService(categoryRepository)
	menuService := service.NewMenuService(menuRepository)
	couponService := service.NewCouponService(couponRepository)
	paymentService := service.NewPaymentService(paymentRepository)
	deliveryService := service.NewDeliveryService(deliveryRepository)
	orderService := service.NewOrderService(orderRepository, couponService, paymentService, deliveryService)
	userService := service.NewUserService(userRepository, menuService, authService)

	authHandler := handler.NewAuthHandler(authService)
	categoryHandler := handler.NewCategoryHandler(categoryService)
	menuHandler := handler.NewMenuHandler(menuService)
	couponHandler := handler.NewCouponHandler(couponService)
	paymentHandler := handler.NewPaymentHandler(paymentService)
	deliveryHandler := handler.NewDeliveryHandler(deliveryService)
	orderHandler := handler.NewOrderHandler(orderService)
	userHandler := handler.NewUserHandler(userService)

	gin := gin.Default()

	gin.Static("/docs", "dist")
	gin.Use(middleware.CorsMiddleware)


	authorizationRoutes(gin, db, authHandler)
	categoryRoutes(gin, db, categoryHandler)
	menuRoutes(gin, db, menuHandler)

	gin.Use(middleware.AuthMiddleware())
	orderRoutes(gin, db, orderHandler)
	couponRoutes(gin, db, couponHandler)
	paymentRoutes(gin, db, paymentHandler)
	deliveryRoutes(gin, db, deliveryHandler)
	userRoutes(gin, db, userHandler)

	gin.Run()
}
