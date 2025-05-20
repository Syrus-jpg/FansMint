package services

import (
	"errors"
	"log"
	"os"

	"github.com/yourusername/bitcoin-ai-platform/pkg/exsat/client"
)

// AssetService provides methods for managing assets
type AssetService struct {
	exSatClient *client.ExSatClient
}

// AssetCreationRequest represents the data needed to create a new asset
type AssetCreationRequest struct {
	Name         string `json:"name"`
	Symbol       string `json:"symbol"`
	TotalSupply  string `json:"totalSupply"`
	Description  string `json:"description"`
	OwnerAddress string `json:"ownerAddress"`
	IconData     string `json:"iconData,omitempty"` // base64 encoded image data
}

// NewAssetService creates a new instance of AssetService
func NewAssetService() *AssetService {
	baseURL := os.Getenv("EXSAT_API_URL")
	if baseURL == "" {
		baseURL = "https://api.exsat.network" // Default URL
		log.Println("EXSAT_API_URL not set, using default:", baseURL)
	}

	apiKey := os.Getenv("EXSAT_API_KEY")
	if apiKey == "" {
		log.Println("Warning: EXSAT_API_KEY not set. API calls may fail.")
	}

	return &AssetService{
		exSatClient: client.NewExSatClient(baseURL, apiKey),
	}
}

// CreateAsset creates a new asset on exSat
func (s *AssetService) CreateAsset(req AssetCreationRequest) (*client.Asset, error) {
	if req.Name == "" {
		return nil, errors.New("asset name is required")
	}
	if req.Symbol == "" {
		return nil, errors.New("asset symbol is required")
	}
	if req.TotalSupply == "" {
		return nil, errors.New("total supply is required")
	}
	if req.OwnerAddress == "" {
		return nil, errors.New("owner address is required")
	}

	// In a real implementation, we might validate the address format here

	params := client.AssetCreateParams{
		Name:         req.Name,
		Symbol:       req.Symbol,
		TotalSupply:  req.TotalSupply,
		Description:  req.Description,
		OwnerAddress: req.OwnerAddress,
		IconData:     req.IconData,
	}

	return s.exSatClient.CreateAsset(params)
}

// GetAsset retrieves an asset by ID
func (s *AssetService) GetAsset(id string) (*client.Asset, error) {
	if id == "" {
		return nil, errors.New("asset ID is required")
	}

	return s.exSatClient.GetAsset(id)
}

// GetAssets retrieves all assets
func (s *AssetService) GetAssets() ([]client.Asset, error) {
	return s.exSatClient.GetAssets()
}

// MockMode returns true if we're running in mock mode (without real API)
func (s *AssetService) MockMode() bool {
	return os.Getenv("EXSAT_API_KEY") == ""
}
