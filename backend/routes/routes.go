package routes

import (
	"go-mysql/app/controllers"

	"github.com/gin-gonic/gin"

	"gorm.io/gorm"
)

func SetupRoutes(router *gin.Engine, db *gorm.DB) {
	PostController := controllers.NewPostController(db)

	articles := router.Group("/articles")
	{
		articles.GET("/", PostController.GetPosts)
		articles.GET("/:id", PostController.GetPostByID)

		articles.POST("/", PostController.CreatePost)
		articles.PUT("/:id", PostController.UpdatePost)
		articles.DELETE("/:id", PostController.DeletePost)
	}

}
