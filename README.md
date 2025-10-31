# Adventures: Encrypted Blockchain Adventure Game

<div align="center">

**A privacy-preserving on-chain adventure game powered by Zama's Fully Homomorphic Encryption (FHE) technology**

[![License](https://img.shields.io/badge/License-BSD_3--Clause--Clear-blue.svg)](./LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen)](https://nodejs.org/)
[![Solidity](https://img.shields.io/badge/solidity-%5E0.8.24-orange)](https://soliditylang.org/)
[![Hardhat](https://img.shields.io/badge/hardhat-%5E2.26.0-yellow)](https://hardhat.org/)
[![React](https://img.shields.io/badge/react-%5E19.1.1-blue)](https://react.dev/)

</div>

---

## Table of Contents

- [Introduction](#introduction)
- [Key Features](#key-features)
- [Advantages](#advantages)
- [Technology Stack](#technology-stack)
- [Problems Solved](#problems-solved)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Installation](#backend-installation)
  - [Frontend Installation](#frontend-installation)
  - [Deployment](#deployment)
- [How It Works](#how-it-works)
- [Smart Contract API](#smart-contract-api)
- [Testing](#testing)
- [Future Roadmap](#future-roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Support & Resources](#support--resources)

---

## Introduction

**Adventures** is a groundbreaking blockchain-based adventure game that leverages Fully Homomorphic Encryption (FHE) to create a truly private gaming experience on the Ethereum blockchain. Unlike traditional blockchain games where all data is publicly visible, Adventures ensures that sensitive player statistics—such as weapon power and coin balances—remain encrypted end-to-end while still being fully verifiable and computable on-chain.

This project demonstrates the practical application of Zama's FHEVM (Fully Homomorphic Encryption Virtual Machine) technology in gaming, showcasing how privacy-preserving smart contracts can revolutionize the gaming industry by protecting player data from MEV (Miner Extractable Value) attacks, front-running, and other forms of on-chain exploitation.

### What Makes Adventures Unique?

- **True Privacy**: Player stats are encrypted on-chain and remain private to the player
- **Verifiable Fairness**: All game mechanics are transparent and executed on-chain
- **MEV Protection**: Encrypted data prevents front-running and sandwiching attacks
- **User Sovereignty**: Players maintain full control and ownership of their game assets
- **Composability**: Built on Ethereum standards, enabling future interoperability

---

## Key Features

### For Players

- **Encrypted Player Stats**: Weapon power and coin balances are encrypted using FHE, ensuring complete privacy
- **Join Adventure**: Mint your unique encrypted weapon (power range: 20-100) and receive initial coin balance
- **Monster Battles**: Attack monsters to earn encrypted coin rewards (10-50 coins per victory)
- **Web3 Wallet Integration**: Seamless connection via RainbowKit supporting multiple wallets
- **Real-time Decryption**: View your private stats securely through client-side decryption
- **Transaction Transparency**: Track all game actions with detailed transaction feedback

### For Developers

- **FHEVM Integration**: Complete implementation of Zama's FHE technology in Solidity
- **Hardhat Development Environment**: Professional smart contract development setup
- **Comprehensive Testing Suite**: Both mock and Sepolia testnet test coverage
- **TypeChain Integration**: Type-safe smart contract interactions
- **Modern Frontend Stack**: React 19 with TypeScript and Vite
- **Deployment Scripts**: Automated deployment to local and Sepolia networks

---

## Advantages

### 1. **Privacy-First Gaming**
Unlike traditional blockchain games where all player data is publicly visible, Adventures uses FHE to keep sensitive game statistics encrypted. This prevents:
- Competitive intelligence gathering by opponents
- Targeted attacks based on player stats
- Privacy violations and data exploitation
- Statistical analysis that could reveal player strategies

### 2. **Protection Against MEV and Front-Running**
Since all critical game data is encrypted, malicious actors cannot:
- Front-run player transactions based on visible stats
- Sandwich attacks targeting specific player actions
- Extract value by predicting game outcomes
- Manipulate gas prices based on player wealth

### 3. **True Decentralization**
All game logic executes on-chain with no centralized server:
- Unstoppable gameplay - no single point of failure
- Censorship-resistant - no central authority can ban players
- Transparent mechanics - all game rules are verifiable
- Permanent asset ownership - players truly own their progress

### 4. **Fair and Verifiable Randomness**
The game uses blockchain-native randomness sources:
- Combining block timestamp, prevrandao, and block hashes
- Deterministic yet unpredictable outcomes
- No trusted random number generators required
- All randomness sources are publicly auditable

### 5. **Composability and Interoperability**
Built on Ethereum standards:
- Compatible with existing Web3 infrastructure
- Can integrate with DeFi protocols
- Potential for cross-game asset transfers
- Extensible for future NFT integration

### 6. **Developer-Friendly Architecture**
Modern development stack:
- Type-safe smart contract interactions with TypeChain
- Comprehensive testing framework
- Hot reload development environment
- Extensive documentation and examples

---

## Technology Stack

### Blockchain & Smart Contracts

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Solidity** | ^0.8.24 | Smart contract programming language |
| **FHEVM** | ^0.8.0 | Zama's FHE library for encrypted computations |
| **Hardhat** | ^2.26.0 | Ethereum development environment |
| **hardhat-deploy** | ^0.11.45 | Deployment management system |
| **TypeChain** | ^8.3.2 | TypeScript bindings for contracts |
| **Ethers.js** | ^6.15.0 | Ethereum library for JavaScript |

### Frontend Application

| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | ^19.1.1 | UI framework |
| **TypeScript** | ~5.8.3 | Type-safe JavaScript |
| **Vite** | ^7.1.6 | Build tool and dev server |
| **Wagmi** | ^2.17.0 | React hooks for Ethereum |
| **RainbowKit** | ^2.2.8 | Wallet connection UI |
| **TanStack Query** | ^5.89.0 | Data fetching and caching |
| **Viem** | ^2.37.6 | TypeScript Ethereum library |

### Cryptography & Privacy

| Technology | Version | Purpose |
|-----------|---------|---------|
| **@fhevm/solidity** | ^0.8.0 | FHE operations in Solidity |
| **@fhevm/hardhat-plugin** | ^0.1.0 | Hardhat integration for FHEVM |
| **@zama-fhe/relayer-sdk** | ^0.3.0-2 | Client-side encryption/decryption |
| **@zama-fhe/oracle-solidity** | ^0.1.0 | Oracle integration for FHE |

### Development Tools

| Tool | Purpose |
|------|---------|
| **ESLint** | Code linting and quality checks |
| **Prettier** | Code formatting |
| **Solhint** | Solidity linting |
| **Mocha/Chai** | Testing framework |
| **Hardhat Gas Reporter** | Gas usage analysis |
| **Solidity Coverage** | Test coverage reporting |

---

## Problems Solved

### 1. **On-Chain Privacy Dilemma**

**Problem**: Traditional blockchains are completely transparent, making all game data publicly visible. This creates unfair advantages and privacy concerns.

**Solution**: By implementing FHE through Zama's FHEVM, Adventures encrypts all sensitive player data while maintaining on-chain computability. Players' weapon power and coin balances remain private, yet the smart contract can still perform calculations on these encrypted values.

### 2. **MEV Exploitation in Gaming**

**Problem**: Visible on-chain game states allow MEV bots and malicious actors to:
- Front-run profitable game actions
- Extract value through sandwich attacks
- Manipulate outcomes by observing pending transactions

**Solution**: Encrypted game states prevent MEV bots from analyzing player data or predicting outcomes, creating a fairer gaming environment where skill and strategy matter more than technical exploitation.

### 3. **Centralized Game Servers**

**Problem**: Traditional online games rely on centralized servers that can:
- Be shut down at any time
- Censor or ban players arbitrarily
- Manipulate game mechanics without transparency
- Lose player data through breaches or failures

**Solution**: Adventures runs entirely on the Ethereum blockchain with no central server. Game logic is transparent, immutable, and accessible to everyone. Players maintain true ownership of their progress.

### 4. **Lack of Trust in Random Number Generation**

**Problem**: Players cannot verify if game outcomes are truly random in traditional centralized games.

**Solution**: Adventures uses blockchain-native randomness sources (block timestamp, prevrandao, block hashes) that are publicly verifiable and tamper-proof, ensuring provably fair gameplay.

### 5. **Limited Asset Ownership**

**Problem**: In traditional games, players don't truly own their in-game assets, which can be deleted or modified by game developers.

**Solution**: All player data and assets in Adventures are stored on the blockchain as encrypted values that only the player can decrypt. This provides true ownership and portability of game progress.

### 6. **Scalability vs. Privacy Trade-off**

**Problem**: Previous attempts at on-chain privacy often required off-chain computation or trusted setups, compromising decentralization.

**Solution**: FHEVM enables fully homomorphic encryption directly on Ethereum, allowing encrypted computations without off-chain processing or trusted parties. This maintains both privacy and decentralization.

---

## Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Browser (Client)                         │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  React Frontend (Vite + TypeScript)                     │ │
│  │  - RainbowKit (Wallet Connection)                       │ │
│  │  - Wagmi Hooks (Blockchain Interaction)                 │ │
│  │  - Zama Relayer SDK (Encryption/Decryption)            │ │
│  └──────────────────┬─────────────────────────────────────┘ │
└────────────────────┼───────────────────────────────────────┘
                      │
                      │ JSON-RPC / Web3
                      │
┌────────────────────▼───────────────────────────────────────┐
│              Sepolia Testnet (FHEVM)                        │
│  ┌────────────────────────────────────────────────────────┐│
│  │  AdventureGame Smart Contract                           ││
│  │  - Encrypted Player Data (euint32)                      ││
│  │  - Join Game Logic                                       ││
│  │  - Attack Monster Logic                                  ││
│  │  - FHE Operations (add, comparison, etc.)              ││
│  └────────────────────────────────────────────────────────┘│
│  ┌────────────────────────────────────────────────────────┐│
│  │  FHEVM Core (Zama)                                      ││
│  │  - Homomorphic Encryption Engine                        ││
│  │  - Encrypted State Storage                              ││
│  │  - FHE Precompiles                                       ││
│  └────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

### Smart Contract Architecture

The `AdventureGame.sol` contract implements:

1. **Encrypted State Management**
   - `PlayerData` struct stores `euint32` encrypted integers
   - Weapon power: encrypted random value (20-100)
   - Coin balance: encrypted accumulator

2. **Access Control**
   - FHE.allowThis(): Allows contract to operate on encrypted values
   - FHE.allow(): Grants player permission to decrypt their own data

3. **Randomness Generation**
   - Combines multiple entropy sources for fairness
   - Deterministic per-transaction for verifiability

4. **Event Emission**
   - Encrypted values in events for off-chain tracking
   - Enables real-time UI updates

### Frontend Architecture

The React application follows a modular component structure:

```
home/src/
├── components/
│   ├── AdventureApp.tsx       # Main game interface
│   └── Header.tsx              # Navigation and wallet connection
├── config/
│   ├── contract.ts             # Contract ABI and addresses
│   └── wagmi.ts                # Web3 configuration
├── hooks/
│   ├── useEthersSigner.ts     # Ethers.js v6 integration
│   └── useZamaInstance.ts      # Zama SDK initialization
└── styles/                     # CSS modules
```

**Key Patterns**:
- **Custom Hooks**: Encapsulate complex Web3 and encryption logic
- **Optimistic Updates**: Immediate UI feedback with blockchain confirmation
- **Error Boundaries**: Graceful handling of wallet and network errors
- **State Management**: React hooks for local state, Wagmi for blockchain state

---

## Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js**: Version 20 or higher ([Download](https://nodejs.org/))
- **npm**: Version 7.0.0 or higher (comes with Node.js)
- **Git**: For cloning the repository
- **MetaMask** or compatible Web3 wallet
- **Sepolia ETH**: For testnet deployment and transactions ([Faucet](https://sepoliafaucet.com/))

## 📁 Project Structure

```
fhevm-hardhat-template/
├── contracts/           # Smart contract source files
│   └── AdventureGame.sol   # Encrypted adventure game contract
├── deploy/              # Deployment scripts
├── tasks/               # Hardhat custom tasks
├── test/                # Test files
├── hardhat.config.ts    # Hardhat configuration
└── package.json         # Dependencies and scripts
```

## 📜 Available Scripts

| Script             | Description              |
| ------------------ | ------------------------ |
| `npm run compile`  | Compile all contracts    |
| `npm run test`     | Run all tests            |
| `npm run coverage` | Generate coverage report |
| `npm run lint`     | Run linting checks       |
| `npm run clean`    | Clean build artifacts    |

## 📚 Documentation

- [FHEVM Documentation](https://docs.zama.ai/fhevm)
- [FHEVM Hardhat Setup Guide](https://docs.zama.ai/protocol/solidity-guides/getting-started/setup)
- [FHEVM Testing Guide](https://docs.zama.ai/protocol/solidity-guides/development-guide/hardhat/write_test)
- [FHEVM Hardhat Plugin](https://docs.zama.ai/protocol/solidity-guides/development-guide/hardhat)

## 📄 License

This project is licensed under the BSD-3-Clause-Clear License. See the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/zama-ai/fhevm/issues)
- **Documentation**: [FHEVM Docs](https://docs.zama.ai)
- **Community**: [Zama Discord](https://discord.gg/zama)

---

**Built with ❤️ by the Zama team**
