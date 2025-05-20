package services

import (
	"log"

	"github.com/yourusername/bitcoin-ai-platform/pkg/ai"
)

// AIService provides AI-related functionality
type AIService struct {
	openaiClient *ai.OpenAIClient
	mockMode     bool
}

// NewAIService creates a new AIService
func NewAIService() *AIService {
	client, err := ai.NewOpenAIClient()
	if err != nil {
		log.Printf("Warning: Failed to initialize OpenAI client: %v. Using mock mode.", err)
		return &AIService{
			openaiClient: nil,
			mockMode:     true,
		}
	}

	return &AIService{
		openaiClient: client,
		mockMode:     false,
	}
}

// WhitepaperRequest represents a request to generate a whitepaper
type WhitepaperRequest struct {
	Name        string `json:"name"`
	Symbol      string `json:"symbol"`
	Description string `json:"description"`
	UseCase     string `json:"useCase"`
	TokenType   string `json:"tokenType"`
	TotalSupply string `json:"totalSupply"`
}

// TokenSuggestionRequest represents a request to generate token suggestions
type TokenSuggestionRequest struct {
	UseCase string `json:"useCase"`
}

// GenerateWhitepaper generates a whitepaper for a token
func (s *AIService) GenerateWhitepaper(req WhitepaperRequest) (string, error) {
	if s.mockMode {
		return getMockWhitepaper(req.Name, req.Symbol, req.UseCase), nil
	}

	return s.openaiClient.GenerateWhitepaper(
		req.Name,
		req.Symbol,
		req.Description,
		req.UseCase,
		req.TokenType,
		req.TotalSupply,
	)
}

// GenerateTokenSuggestions generates token suggestions based on the use case
func (s *AIService) GenerateTokenSuggestions(req TokenSuggestionRequest) (map[string]interface{}, error) {
	if s.mockMode {
		return getMockTokenSuggestion(req.UseCase), nil
	}

	return s.openaiClient.GenerateTokenSuggestions(req.UseCase)
}

// getMockWhitepaper returns a mock whitepaper
func getMockWhitepaper(name, symbol, useCase string) string {
	return `# ` + name + ` Whitepaper

## Abstract
` + name + ` (` + symbol + `) is a digital asset based on the Bitcoin ecosystem, designed to ` + useCase + `.

## 1. Introduction
This whitepaper outlines the vision, technology, and roadmap for ` + name + `.

## 2. Technical Architecture
` + name + ` is built on the exSat protocol, inheriting Bitcoin's security and decentralization features.

## 3. Tokenomics
- Total Supply: 1,000,000 ` + symbol + `
- Distribution:
  * Team: 15%
  * Community: 30% 
  * Liquidity: 25%
  * Ecosystem Development: 30%

## 4. Use Cases
` + useCase + `

## 5. Roadmap
- Phase 1: Token Issuance and Initial Distribution
- Phase 2: Ecosystem Building and Partnership Expansion
- Phase 3: Feature Extension and Use Case Implementation

## 6. Team
Our team consists of blockchain experts, security engineers, and industry advisors dedicated to building secure and efficient blockchain applications.

## 7. Conclusion
` + name + ` will provide innovative solutions for ` + useCase + `, and with the advantages of the exSat platform, we are confident in creating value within the Bitcoin ecosystem.
`
}

// getMockTokenSuggestion returns a mock token suggestion
func getMockTokenSuggestion(useCase string) map[string]interface{} {
	shortUseCase := useCase
	if len(useCase) > 5 {
		shortUseCase = useCase[:5]
	}

	shortSymbol := useCase
	if len(useCase) > 3 {
		shortSymbol = useCase[:3]
	}

	return map[string]interface{}{
		"name":            shortUseCase + "Token",
		"symbol":          shortSymbol,
		"description":     "A token focused on " + useCase + ", built on the Bitcoin ecosystem",
		"useCase":         useCase,
		"marketPotential": "This token has significant potential in the growing DeFi and cross-chain application space.",
	}
}
