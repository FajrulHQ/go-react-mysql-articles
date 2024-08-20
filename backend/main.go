package main

import (
	"go-mysql/app/models"
	"go-mysql/config"
	"go-mysql/routes"
	"log"
	"os"

	"github.com/fatih/color"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load()
	port := os.Getenv("PORT")
	db := config.ConnectDB()
	db.AutoMigrate(&models.Post{})

	log.SetFlags(log.Ldate | log.Ltime | log.Lshortfile)

	router := gin.Default()
	routes.SetupRoutes(router, db)
	router.Run(":" + port)
	color.Cyan("🌏 Server running on localhost:" + port)
}
