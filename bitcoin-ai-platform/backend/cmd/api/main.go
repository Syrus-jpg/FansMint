package main

import (
	"fmt"
	"log"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/yourusername/bitcoin-ai-platform/internal/handlers"
)

func main() {
	// Load environment variables
	if err := godotenv.Load(); err != nil {
		log.Println("Warning: .env file not found")
	}

	// Set gin mode
	if os.Getenv("ENV") == "production" {
		gin.SetMode(gin.ReleaseMode)
	}

	// Create gin router
	r := gin.Default()

	// Configure CORS
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	// API routes
	setupRoutes(r)

	// Get port
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// Start server
	fmt.Printf("Server started at http://localhost:%s\n", port)
	if err := r.Run(":" + port); err != nil {
		log.Fatalf("Unable to start server: %s", err.Error())
	}
}

func setupRoutes(r *gin.Engine) {
	// Health check
	r.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status": "healthy",
		})
	})

	// API v1 routes
	v1 := r.Group("/api/v1")
	{
		// Asset routes
		assetHandler := handlers.NewAssetHandler()
		assetHandler.RegisterRoutes(v1)

		// AI related routes
		ai := v1.Group("/ai")
		{
			ai.POST("/generate-whitepaper", func(c *gin.Context) {
				c.JSON(200, gin.H{
					"message": "Whitepaper generated successfully",
					"content": "# ExampleToken Whitepaper\n\n## Introduction\nExampleToken is a digital asset based on the Bitcoin ecosystem...",
				})
			})
			ai.POST("/token-suggestion", func(c *gin.Context) {
				c.JSON(200, gin.H{
					"message": "Token suggestions generated successfully",
					"suggestions": []map[string]interface{}{
						{
							"name":            "Suggested Name",
							"symbol":          "SYM",
							"description":     "This is a suggested token description",
							"useCase":         "Can be used for...",
							"marketPotential": "Market potential analysis...",
						},
					},
				})
			})
		}
	}
}
