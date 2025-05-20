package handlers

import (
	"fmt"
	"math/rand"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/yourusername/bitcoin-ai-platform/internal/services"
)

// AssetHandler handles requests related to assets
type AssetHandler struct {
	assetService *services.AssetService
}

// NewAssetHandler creates a new asset handler
func NewAssetHandler() *AssetHandler {
	return &AssetHandler{
		assetService: services.NewAssetService(),
	}
}

// RegisterRoutes registers asset routes with the provided router
func (h *AssetHandler) RegisterRoutes(router *gin.RouterGroup) {
	assets := router.Group("/assets")
	{
		assets.GET("/", h.GetAssets)
		assets.GET("/:id", h.GetAsset)
		assets.POST("/create", h.CreateAsset)
	}
}

// GetAssets handles GET /api/v1/assets
func (h *AssetHandler) GetAssets(c *gin.Context) {
	// Check if we're in mock mode
	if h.assetService.MockMode() {
		// Return mock assets
		mockAssets := getMockAssets()
		c.JSON(http.StatusOK, gin.H{
			"message": "Get asset list",
			"assets":  mockAssets,
		})
		return
	}

	// Use the real API
	assets, err := h.assetService.GetAssets()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": fmt.Sprintf("Failed to get assets: %v", err),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Get asset list",
		"assets":  assets,
	})
}

// GetAsset handles GET /api/v1/assets/:id
func (h *AssetHandler) GetAsset(c *gin.Context) {
	id := c.Param("id")
	if id == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Asset ID is required",
		})
		return
	}

	// Check if we're in mock mode
	if h.assetService.MockMode() {
		// Return a mock asset
		c.JSON(http.StatusOK, gin.H{
			"message": fmt.Sprintf("Get asset details: %s", id),
			"asset": map[string]interface{}{
				"id":                id,
				"name":              "ExampleToken",
				"symbol":            "EXT",
				"totalSupply":       "1000000",
				"createdAt":         time.Now().Format(time.RFC3339),
				"holdersCount":      "120",
				"circulatingSupply": "750000",
				"description":       "Example token description",
				"contractAddress":   "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
				"status":            "active",
				"iconUrl":           "",
			},
		})
		return
	}

	// Use the real API
	asset, err := h.assetService.GetAsset(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": fmt.Sprintf("Failed to get asset: %v", err),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": fmt.Sprintf("Get asset details: %s", id),
		"asset":   asset,
	})
}

// CreateAsset handles POST /api/v1/assets/create
func (h *AssetHandler) CreateAsset(c *gin.Context) {
	var req services.AssetCreationRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": fmt.Sprintf("Invalid request: %v", err),
		})
		return
	}

	// Check if we're in mock mode
	if h.assetService.MockMode() {
		// 生成资产ID
		assetId := fmt.Sprintf("ast_%d", rand.Intn(100000))

		// 如果提供了图标数据，在实际环境中这里会存储图片并生成URL
		iconUrl := ""
		if req.IconData != "" {
			// 在真实环境中，这里会将base64解码并保存为文件
			// 这里仅模拟返回一个URL
			iconUrl = fmt.Sprintf("/api/v1/assets/%s/icon", assetId)
		}

		// Return a mock asset creation response
		c.JSON(http.StatusCreated, gin.H{
			"message": "Asset created successfully",
			"assetId": assetId,
			"iconUrl": iconUrl,
		})
		return
	}

	// Use the real API
	asset, err := h.assetService.CreateAsset(req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": fmt.Sprintf("Failed to create asset: %v", err),
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Asset created successfully",
		"assetId": asset.ID,
	})
}

// getMockAssets returns mock assets for development purposes
func getMockAssets() []map[string]interface{} {
	return []map[string]interface{}{
		{
			"id":                "1",
			"name":              "ExampleToken",
			"symbol":            "EXT",
			"totalSupply":       "1000000",
			"createdAt":         "2023-05-19T10:00:00Z",
			"holdersCount":      "120",
			"circulatingSupply": "750000",
			"contractAddress":   "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
			"status":            "active",
			"iconUrl":           "/api/v1/assets/1/icon",
		},
		{
			"id":                "2",
			"name":              "BitcoinUtility",
			"symbol":            "BTU",
			"totalSupply":       "2100000",
			"createdAt":         "2023-05-15T14:30:00Z",
			"holdersCount":      "89",
			"circulatingSupply": "1050000",
			"contractAddress":   "0x5aeda56215b167893e80b4fe645ba6d5bab767de",
			"status":            "active",
			"iconUrl":           "/api/v1/assets/2/icon",
		},
	}
}
