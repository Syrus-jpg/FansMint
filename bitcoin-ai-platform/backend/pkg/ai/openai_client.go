package ai

import (
	"context"
	"errors"
	"fmt"
	"os"

	"github.com/sashabaranov/go-openai"
)

// OpenAIClient handles interactions with the OpenAI API
type OpenAIClient struct {
	client *openai.Client
}

// NewOpenAIClient creates a new OpenAI client
func NewOpenAIClient() (*OpenAIClient, error) {
	apiKey := os.Getenv("OPENAI_API_KEY")
	if apiKey == "" {
		return nil, errors.New("OPENAI_API_KEY environment variable is required")
	}

	client := openai.NewClient(apiKey)
	return &OpenAIClient{
		client: client,
	}, nil
}

// GenerateWhitepaper generates a whitepaper for a token
func (c *OpenAIClient) GenerateWhitepaper(tokenName, tokenSymbol, description, useCase, tokenType, totalSupply string) (string, error) {
	prompt := fmt.Sprintf(`
Generate a concise whitepaper for a Bitcoin ecosystem token with the following details:
- Name: %s
- Symbol: %s
- Description: %s
- Use Case: %s
- Token Type: %s
- Total Supply: %s

The whitepaper should include:
1. An introduction section explaining the token's purpose
2. A technical section describing how it works on the exSat platform
3. Tokenomics section with distribution details
4. Use cases and applications
5. A roadmap and conclusion

Format the whitepaper in Markdown format with headers and bullet points.
`, tokenName, tokenSymbol, description, useCase, tokenType, totalSupply)

	resp, err := c.client.CreateChatCompletion(
		context.Background(),
		openai.ChatCompletionRequest{
			Model: openai.GPT4Turbo,
			Messages: []openai.ChatCompletionMessage{
				{
					Role:    openai.ChatMessageRoleSystem,
					Content: "You are a blockchain whitepaper expert who specializes in creating professional whitepapers for cryptocurrency projects.",
				},
				{
					Role:    openai.ChatMessageRoleUser,
					Content: prompt,
				},
			},
			MaxTokens: 2000,
		},
	)

	if err != nil {
		return "", fmt.Errorf("error calling OpenAI API: %w", err)
	}

	if len(resp.Choices) == 0 {
		return "", errors.New("no response from OpenAI API")
	}

	return resp.Choices[0].Message.Content, nil
}

// GenerateTokenSuggestions generates token suggestions based on the use case
func (c *OpenAIClient) GenerateTokenSuggestions(useCase string) (map[string]interface{}, error) {
	prompt := fmt.Sprintf(`
Based on the following use case, suggest a name, symbol, and description for a Bitcoin ecosystem token:
Use Case: %s

Generate a JSON object with:
1. A creative and relevant name
2. A 3-4 letter symbol 
3. A concise description
4. Analysis of market potential
`, useCase)

	resp, err := c.client.CreateChatCompletion(
		context.Background(),
		openai.ChatCompletionRequest{
			Model: openai.GPT4Turbo,
			Messages: []openai.ChatCompletionMessage{
				{
					Role:    openai.ChatMessageRoleSystem,
					Content: "You are a cryptocurrency naming expert who creates relevant, catchy, and marketable token names and descriptions.",
				},
				{
					Role:    openai.ChatMessageRoleUser,
					Content: prompt,
				},
			},
			MaxTokens: 500,
		},
	)

	if err != nil {
		return nil, fmt.Errorf("error calling OpenAI API: %w", err)
	}

	if len(resp.Choices) == 0 {
		return nil, errors.New("no response from OpenAI API")
	}

	// In a real implementation, we would parse the JSON response
	// For now, we'll just return a mock suggestion
	return map[string]interface{}{
		"name":            fmt.Sprintf("%sToken", useCase[:5]),
		"symbol":          useCase[:3],
		"description":     fmt.Sprintf("A token focused on %s, built on the Bitcoin ecosystem", useCase),
		"useCase":         useCase,
		"marketPotential": "This token has significant potential in the growing DeFi and cross-chain application space.",
	}, nil
}
