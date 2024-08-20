package main

import (
	"go-mysql/app/models"
	"go-mysql/config"
	"go-mysql/routes"
	"log"
	"os"

	"github.com/fatih/color"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load()
	port := os.Getenv("PORT")
	db := config.ConnectDB()
	db.AutoMigrate(&models.Post{})

	log.SetFlags(log.Ldate | log.Ltime | log.Lshortfile)

	engine := gin.Default()
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"*"}
	engine.Use(cors.New(config))

	routes.SetupRoutes(engine, db)
	engine.Run(":" + port)
	color.Cyan("🌏 Server running on localhost:" + port)
}

func CORSConfig() cors.Config {
	corsConfig := cors.DefaultConfig()
	corsConfig.AllowOrigins = []string{"*"}
	corsConfig.AllowCredentials = true
	corsConfig.AddAllowHeaders("Access-Control-Allow-Headers", "access-control-allow-origin, access-control-allow-headers", "Content-Type", "X-XSRF-TOKEN", "Accept", "Origin", "X-Requested-With", "Authorization")
	corsConfig.AddAllowMethods("GET", "POST", "PUT", "DELETE")
	return corsConfig
}
