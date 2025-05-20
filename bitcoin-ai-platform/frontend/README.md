# FansMint
**Tokenize Your Fandom.**  

A fan token minting platform to turn love, memories, and community spirit into blockchain assets—no code required. Powered by Bitcoin and exSat.


## Inspiration
As a passionate fan, I’ve witnessed how global communities express love in creative and heartfelt ways—from naming stars after their favorite artists to commemorating fan anniversaries and events. However, in the digital world, fans haven’t had a simple tool to own and immortalize these emotions on-chain.

That’s why I created FansMint: a way for every fan, no matter who they love, to mint their emotional legacy—on Bitcoin, with the power of exSat and AI.


## What it does
FansMint lets users create personalized fan tokens representing their love for a favorite artist or fandom. These tokens can include customized names, images, purposes—whether for anniversary check-ins, NFT redemptions, or community voting.

Core features include:
•	Live data fetched from exSat EVM Testnet, including XSAT token name and total supply
•	Metamask wallet integration, auto-detects exSat Testnet
•	AI-powered token name generator, with OpenAI-ready architecture
•	Fully interactive dashboard simulating issued fan tokens

All of this is wrapped in a zero-code creation flow—making Web3 accessible for fans worldwide.


## How we built it
•	Frontend: React + Tailwind CSS for smooth, modern UI/UX
•	Backend: Go (Golang) handling token logic and mock asset simulation
•	Web3 Integration: ethers.js to connect to exSat Testnet RPC
•	Design Philosophy: Community-driven, emotion-first interactions
•	AI Elements: Mock AI assistant powered by OpenAI structure with fallback logic

Data like name() and totalSupply() are fetched live from this XSAT Token Contract:
0x8266...c459


## Challenges we ran into
Bridging emotional design with technical Web3 architecture
•	Debugging Metamask connections on exSat Testnet with limited documentation
•	Encountered RPC connection failures when fetching balances—solved by implementing precise network error messages to guide users (e.g., “Network Error (exSat RPC)”)
•	Mocking holders, price data for demo purposes while ensuring real data is visibly marked

Despite the challenges, we delivered a live, polished product with clear expansion capacity.


## Accomplishments that we're proud of
•	Designed a full fan-token platform with real on-chain integration
•	Created a highly usable UI for non-technical fans to engage with Web3
•	Bridged blockchain, fandom culture, and AI in a single experience
•	Deployed on Vercel with production-ready structure

## What we learned
•	Connected to exSat EVM Testnet, integrated with XSAT Token
•	Metamask wallet support for exSat Testnet
•	Deployed and live with frontend routing, AI mock logic
•	Enable on-chain fan token minting via exSat smart contracts
•	Expand AI assistant to support image generation, custom metadata
•	Partner with K-pop & sports fan communities for real-world pilots
•	Add internationalization (i18n) and identity profiles across fandoms

FansMint began with love—and it will grow with every fan who believes love deserves a token 💜