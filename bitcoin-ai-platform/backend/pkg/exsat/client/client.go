package client

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"time"
)

// ExSatClient represents a client for interacting with the exSat API
type ExSatClient struct {
	BaseURL    string
	APIKey     string
	HTTPClient *http.Client
}

// NewExSatClient creates a new exSat API client
func NewExSatClient(baseURL, apiKey string) *ExSatClient {
	return &ExSatClient{
		BaseURL: baseURL,
		APIKey:  apiKey,
		HTTPClient: &http.Client{
			Timeout: time.Second * 30,
		},
	}
}

// Asset represents an asset on the exSat platform
type Asset struct {
	ID                string `json:"id"`
	Name              string `json:"name"`
	Symbol            string `json:"symbol"`
	TotalSupply       string `json:"totalSupply"`
	CirculatingSupply string `json:"circulatingSupply"`
	Description       string `json:"description"`
	CreatorAddress    string `json:"creatorAddress"`
	ContractAddress   string `json:"contractAddress"`
	CreatedAt         string `json:"createdAt"`
	Status            string `json:"status"`
	IconUrl           string `json:"iconUrl,omitempty"`
}

// AssetCreateParams represents params for creating a new asset
type AssetCreateParams struct {
	Name         string `json:"name"`
	Symbol       string `json:"symbol"`
	TotalSupply  string `json:"totalSupply"`
	Description  string `json:"description"`
	OwnerAddress string `json:"ownerAddress"`
	IconData     string `json:"iconData,omitempty"` // base64 encoded image data
}

// AssetResponse is the API response for asset operations
type AssetResponse struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
	Asset   Asset  `json:"asset,omitempty"`
}

// AssetsResponse is the API response for listing assets
type AssetsResponse struct {
	Success bool    `json:"success"`
	Message string  `json:"message"`
	Assets  []Asset `json:"assets,omitempty"`
}

// CreateAsset creates a new asset on the exSat platform
func (c *ExSatClient) CreateAsset(params AssetCreateParams) (*Asset, error) {
	// Convert params to JSON
	jsonData, err := json.Marshal(params)
	if err != nil {
		return nil, fmt.Errorf("error marshaling params: %w", err)
	}

	// Create request
	req, err := http.NewRequest("POST", fmt.Sprintf("%s/assets/create", c.BaseURL), bytes.NewBuffer(jsonData))
	if err != nil {
		return nil, fmt.Errorf("error creating request: %w", err)
	}

	// Set headers
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", c.APIKey))

	// Send request
	resp, err := c.HTTPClient.Do(req)
	if err != nil {
		return nil, fmt.Errorf("error sending request: %w", err)
	}
	defer resp.Body.Close()

	// Read response body
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("error reading response body: %w", err)
	}

	// Check response status code
	if resp.StatusCode != http.StatusOK && resp.StatusCode != http.StatusCreated {
		return nil, fmt.Errorf("API error: %s", string(body))
	}

	// Parse response
	var response AssetResponse
	if err := json.Unmarshal(body, &response); err != nil {
		return nil, fmt.Errorf("error unmarshaling response: %w", err)
	}

	if !response.Success {
		return nil, fmt.Errorf("API error: %s", response.Message)
	}

	return &response.Asset, nil
}

// GetAsset retrieves details of a specific asset
func (c *ExSatClient) GetAsset(assetID string) (*Asset, error) {
	// Create request
	req, err := http.NewRequest("GET", fmt.Sprintf("%s/assets/%s", c.BaseURL, assetID), nil)
	if err != nil {
		return nil, fmt.Errorf("error creating request: %w", err)
	}

	// Set headers
	req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", c.APIKey))

	// Send request
	resp, err := c.HTTPClient.Do(req)
	if err != nil {
		return nil, fmt.Errorf("error sending request: %w", err)
	}
	defer resp.Body.Close()

	// Read response body
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("error reading response body: %w", err)
	}

	// Check response status code
	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("API error: %s", string(body))
	}

	// Parse response
	var response AssetResponse
	if err := json.Unmarshal(body, &response); err != nil {
		return nil, fmt.Errorf("error unmarshaling response: %w", err)
	}

	if !response.Success {
		return nil, fmt.Errorf("API error: %s", response.Message)
	}

	return &response.Asset, nil
}

// GetAssets retrieves a list of assets
func (c *ExSatClient) GetAssets() ([]Asset, error) {
	// Create request
	req, err := http.NewRequest("GET", fmt.Sprintf("%s/assets", c.BaseURL), nil)
	if err != nil {
		return nil, fmt.Errorf("error creating request: %w", err)
	}

	// Set headers
	req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", c.APIKey))

	// Send request
	resp, err := c.HTTPClient.Do(req)
	if err != nil {
		return nil, fmt.Errorf("error sending request: %w", err)
	}
	defer resp.Body.Close()

	// Read response body
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("error reading response body: %w", err)
	}

	// Check response status code
	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("API error: %s", string(body))
	}

	// Parse response
	var response AssetsResponse
	if err := json.Unmarshal(body, &response); err != nil {
		return nil, fmt.Errorf("error unmarshaling response: %w", err)
	}

	if !response.Success {
		return nil, fmt.Errorf("API error: %s", response.Message)
	}

	return response.Assets, nil
}

// Note: This is a basic implementation. In a real-world scenario,
// you would need to add more error handling, pagination for listing assets,
// additional endpoints for transfers, and wallet functionality.
