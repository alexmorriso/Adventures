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

### Backend Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/Adventures.git
   cd Adventures
   ```

2. **Install backend dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file at the project root:

   ```bash
   INFURA_API_KEY=your_infura_project_id
   PRIVATE_KEY=0xyour_wallet_private_key
   ETHERSCAN_API_KEY=optional_key_for_verification
   ```

   - **INFURA_API_KEY**: Get from [Infura](https://infura.io/)
   - **PRIVATE_KEY**: Your wallet's private key (DO NOT share this!)
   - **ETHERSCAN_API_KEY**: Get from [Etherscan](https://etherscan.io/apis)

4. **Compile smart contracts**

   ```bash
   npm run compile
   ```

5. **Run tests**

   ```bash
   npm run test
   ```

### Frontend Installation

1. **Navigate to frontend directory**

   ```bash
   cd home
   ```

2. **Install frontend dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:5173`

### Deployment

#### Deploy to Local Hardhat Network

1. **Start local FHEVM node**

   ```bash
   npm run chain
   ```

2. **Deploy contracts** (in a new terminal)

   ```bash
   npm run deploy:localhost
   ```

#### Deploy to Sepolia Testnet

1. **Ensure you have Sepolia ETH** in your wallet

2. **Deploy to Sepolia**

   ```bash
   npm run deploy:sepolia
   ```

3. **Verify contract on Etherscan**

   ```bash
   npm run verify:sepolia <CONTRACT_ADDRESS>
   ```

4. **Update frontend configuration**

   Edit `home/src/config/contract.ts` with your deployed contract address.

---

## How It Works

### Gameplay Flow

1. **Connect Wallet**
   - Player connects their Web3 wallet (MetaMask, WalletConnect, etc.)
   - Wallet is verified to be on Sepolia testnet

2. **Join Adventure**
   - Player calls `joinGame()` function
   - Smart contract generates encrypted weapon power (20-100 range)
   - Player receives 100 encrypted coins as starting balance
   - All values are encrypted using FHE and stored on-chain

3. **Attack Monsters**
   - Player calls `attackMonster()` function
   - Contract generates random coin loot (10-50 range)
   - Loot is added to player's encrypted coin balance using FHE addition
   - Player cannot see exact loot amount until decryption

4. **View Private Stats**
   - Frontend retrieves encrypted handles from contract
   - Player signs a decryption request with their wallet
   - Zama Relayer SDK decrypts values client-side
   - Private stats are displayed only to the player

### Encryption Flow

```
┌──────────────┐
│  User Action │
└──────┬───────┘
       │
       ▼
┌──────────────────────────────┐
│  Smart Contract (FHEVM)      │
│  1. Generate plaintext value │
│  2. Encrypt with FHE.asEuint │
│  3. Store encrypted value    │
│  4. Set access permissions   │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│  Blockchain Storage          │
│  - Encrypted euint32 values  │
│  - No plaintext data exposed │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│  Client-Side Decryption      │
│  1. Generate keypair         │
│  2. Sign EIP-712 request     │
│  3. Call Zama Relayer        │
│  4. Decrypt with private key │
│  5. Display to user          │
└──────────────────────────────┘
```

### FHE Operations Example

```solidity
// Encrypting a value
uint32 weaponPowerPlain = 75;
euint32 weaponPower = FHE.asEuint32(weaponPowerPlain);

// Adding encrypted values
euint32 currentCoins = player.coinBalance;
euint32 loot = FHE.asEuint32(25);
euint32 newBalance = FHE.add(currentCoins, loot);

// Setting permissions
FHE.allowThis(weaponPower);  // Contract can use this value
FHE.allow(weaponPower, msg.sender);  // Player can decrypt this value
```

---

## Smart Contract API

### Functions

#### `joinGame()`
Allows a player to join the adventure game.

**Access**: External
**Modifiers**: None
**Requirements**:
- Player must not have already joined

**Effects**:
- Generates encrypted weapon power (20-100)
- Initializes encrypted coin balance (100)
- Sets player as joined
- Grants decryption permissions to player

**Events**: Emits `PlayerJoined(address player, euint32 weaponPower, euint32 initialCoins)`

```solidity
function joinGame() external
```

#### `attackMonster()`
Allows player to attack a monster and earn encrypted coins.

**Access**: External
**Returns**: `euint32 coinsLooted` - Encrypted amount of coins gained
**Requirements**:
- Player must have joined the game

**Effects**:
- Generates random encrypted loot (10-50 coins)
- Adds loot to player's coin balance using FHE addition
- Grants decryption permissions for loot amount

**Events**: Emits `MonsterDefeated(address player, euint32 coinsLooted, euint32 updatedCoinBalance)`

```solidity
function attackMonster() external returns (euint32 coinsLooted)
```

#### `hasJoined(address playerAddress)`
Checks if a player has joined the game.

**Access**: External view
**Parameters**:
- `playerAddress`: Address to check
**Returns**: `bool` - True if player has joined

```solidity
function hasJoined(address playerAddress) external view returns (bool)
```

#### `getWeaponPower(address playerAddress)`
Retrieves encrypted weapon power for a player.

**Access**: External view
**Parameters**:
- `playerAddress`: Player's address
**Returns**: `euint32` - Encrypted weapon power
**Requirements**:
- Player must have joined

```solidity
function getWeaponPower(address playerAddress) external view returns (euint32)
```

#### `getCoinBalance(address playerAddress)`
Retrieves encrypted coin balance for a player.

**Access**: External view
**Parameters**:
- `playerAddress`: Player's address
**Returns**: `euint32` - Encrypted coin balance
**Requirements**:
- Player must have joined

```solidity
function getCoinBalance(address playerAddress) external view returns (euint32)
```

### Events

```solidity
event PlayerJoined(
    address indexed player,
    euint32 weaponPower,
    euint32 initialCoins
);

event MonsterDefeated(
    address indexed player,
    euint32 coinsLooted,
    euint32 updatedCoinBalance
);
```

---

## Testing

### Test Structure

The project includes comprehensive tests for both local mock FHEVM and Sepolia testnet:

```
test/
├── AdventureGame.ts         # Mock FHEVM tests (fast)
└── AdventureGameSepolia.ts  # Sepolia integration tests
```

### Running Tests

**Local tests (Mock FHEVM):**
```bash
npm run test
```

**Sepolia testnet tests:**
```bash
npm run test:sepolia
```

### Test Coverage

Generate a coverage report:
```bash
npm run coverage
```

### What's Tested

- ✅ Player joining mechanics
- ✅ Initial weapon power generation (range: 20-100)
- ✅ Initial coin balance (100 coins)
- ✅ Monster attack functionality
- ✅ Coin loot generation (range: 10-50)
- ✅ Encrypted balance updates
- ✅ Permission system for decryption
- ✅ Player state queries
- ✅ Revert conditions (duplicate join, etc.)

---

## 📁 Project Structure

```
Adventures/
├── contracts/                    # Smart contract source files
│   └── AdventureGame.sol        # Main encrypted game contract
├── deploy/                       # Deployment scripts
│   └── deploy.ts                # Hardhat-deploy configuration
├── tasks/                        # Custom Hardhat tasks
│   ├── accounts.ts              # List available accounts
│   └── adventure.ts             # Game interaction tasks
├── test/                         # Test suites
│   ├── AdventureGame.ts         # Local mock tests
│   └── AdventureGameSepolia.ts  # Sepolia integration tests
├── home/                         # Frontend React application
│   ├── src/
│   │   ├── components/          # React components
│   │   │   ├── AdventureApp.tsx # Main game UI
│   │   │   └── Header.tsx       # Navigation bar
│   │   ├── config/              # Configuration files
│   │   │   ├── contract.ts      # Contract ABI & address
│   │   │   └── wagmi.ts         # Web3 provider config
│   │   ├── hooks/               # Custom React hooks
│   │   │   ├── useEthersSigner.ts
│   │   │   └── useZamaInstance.ts
│   │   └── styles/              # CSS stylesheets
│   └── package.json             # Frontend dependencies
├── hardhat.config.ts            # Hardhat configuration
├── package.json                 # Backend dependencies
├── tsconfig.json                # TypeScript configuration
└── README.md                    # This file
```

## 📜 Available Scripts

### Backend Scripts

| Script | Description |
|--------|-------------|
| `npm run compile` | Compile all smart contracts |
| `npm run test` | Run tests on mock FHEVM |
| `npm run test:sepolia` | Run tests on Sepolia testnet |
| `npm run coverage` | Generate test coverage report |
| `npm run lint` | Run linting checks (Solidity + TypeScript) |
| `npm run lint:sol` | Run Solidity linting only |
| `npm run lint:ts` | Run TypeScript linting only |
| `npm run prettier:check` | Check code formatting |
| `npm run prettier:write` | Auto-fix code formatting |
| `npm run clean` | Clean build artifacts and cache |
| `npm run typechain` | Generate TypeScript bindings |
| `npm run chain` | Start local Hardhat node |
| `npm run deploy:localhost` | Deploy to local network |
| `npm run deploy:sepolia` | Deploy to Sepolia testnet |
| `npm run verify:sepolia` | Verify contract on Etherscan |

### Frontend Scripts (in `home/` directory)

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint checks |

---

## Future Roadmap

### Phase 1: Enhanced Gameplay (Q1 2025)

#### Combat System Expansion
- **Multiple Monster Types**: Introduce different monster tiers with varying difficulties
  - Common monsters (easy, low rewards)
  - Rare monsters (medium difficulty, better loot)
  - Legendary bosses (hard, premium rewards)
- **Combat Mechanics**: Weapon power affects success rate and damage
- **Health System**: Add encrypted player health points
- **Potion System**: Healing items and buffs

#### Inventory System
- **Equipment Slots**: Weapons, armor, accessories
- **Item Rarity**: Common, rare, epic, legendary items
- **Item Upgrades**: Enhance equipment using coins
- **Trading System**: Peer-to-peer encrypted item trading

### Phase 2: Social & Multiplayer (Q2 2025)

#### Multiplayer Features
- **Co-op Raids**: Team up to fight powerful bosses
- **Guild System**: Create and join guilds with shared treasuries
- **Leaderboards**: Privacy-preserving ranking system
- **PvP Arena**: Encrypted player-vs-player battles

#### Social Integration
- **Friend System**: Add friends and view their public profiles
- **Chat System**: In-game messaging with optional encryption
- **Achievements**: Unlock badges and titles
- **Quest System**: Daily and weekly challenges

### Phase 3: Economy & NFTs (Q3 2025)

#### NFT Integration
- **Weapon NFTs**: Convert encrypted weapons to tradeable NFTs
- **Collectible Items**: Unique cosmetics and rare items
- **Land Ownership**: Own territories in the game world
- **Marketplace**: Decentralized exchange for all items

#### DeFi Integration
- **Staking**: Stake coins to earn passive rewards
- **Liquidity Pools**: Provide liquidity for in-game tokens
- **Yield Farming**: Earn rewards through gameplay
- **Cross-Game Currency**: Interoperable tokens across multiple games

### Phase 4: Expansion & Scaling (Q4 2025)

#### Technical Improvements
- **Layer 2 Integration**: Deploy to Arbitrum/Optimism for lower gas fees
- **Performance Optimization**: Batch operations and gas reduction
- **Mobile Support**: React Native mobile application
- **Offline Mode**: Cache game state for offline play

#### Content Expansion
- **Story Mode**: Narrative-driven campaign with chapters
- **Procedural Dungeons**: Randomly generated dungeons
- **Seasonal Events**: Time-limited events and rewards
- **Community Content**: User-generated quests and items

#### Advanced Privacy Features
- **ZK Proofs Integration**: Combine FHE with zero-knowledge proofs
- **Anonymous Gameplay**: Optional anonymous player mode
- **Private Tournaments**: Encrypted competitive events
- **Confidential Auctions**: Sealed-bid auctions for rare items

### Phase 5: Ecosystem Growth (2026)

#### Developer Tools
- **SDK Release**: Developer toolkit for building FHE games
- **Plugin System**: Allow third-party plugins and mods
- **API Platform**: Public APIs for game integration
- **Documentation Hub**: Comprehensive developer guides

#### Governance
- **DAO Formation**: Community-governed game development
- **Voting System**: On-chain voting for game features
- **Treasury Management**: Community-managed funds
- **Grant Program**: Fund community developers

#### Partnerships
- **Cross-Game Assets**: Asset portability across partner games
- **Brand Collaborations**: Licensed content and themes
- **Educational Partnerships**: Blockchain gaming courses
- **Research Initiatives**: Academic collaborations on FHE gaming

---

## Security Considerations

### Smart Contract Security

- **Audited Code**: Smart contracts should be audited before mainnet deployment
- **Reentrancy Protection**: All state changes follow checks-effects-interactions pattern
- **Access Control**: Proper permission management for FHE operations
- **Upgrade Strategy**: Consider proxy patterns for future upgrades

### Privacy Guarantees

- **Encrypted Storage**: All sensitive data stored as FHE ciphertexts
- **Permission System**: Strict access control for decryption
- **Client-Side Decryption**: Private keys never leave user's device
- **No Data Leakage**: Events and logs contain only encrypted values

### Best Practices

- **Private Key Management**: Never commit private keys to repositories
- **Environment Variables**: Use `.env` files for sensitive configuration
- **Network Verification**: Always verify you're on the correct network
- **Gas Estimation**: Monitor gas costs for FHE operations
- **Rate Limiting**: Implement cooldowns to prevent spam attacks

---

## Contributing

We welcome contributions from the community! Here's how you can help:

### Ways to Contribute

1. **Report Bugs**: Submit issues for bugs you encounter
2. **Suggest Features**: Propose new features or improvements
3. **Submit Pull Requests**: Fix bugs or implement features
4. **Improve Documentation**: Help make our docs better
5. **Share Feedback**: Tell us about your experience

### Development Workflow

1. **Fork the repository**

   ```bash
   git fork https://github.com/yourusername/Adventures.git
   ```

2. **Create a feature branch**

   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**

   - Write clean, documented code
   - Follow the existing code style
   - Add tests for new features
   - Update documentation as needed

4. **Run tests and linting**

   ```bash
   npm run lint
   npm run test
   npm run prettier:write
   ```

5. **Commit your changes**

   ```bash
   git commit -m "feat: add amazing feature"
   ```

   Follow [Conventional Commits](https://www.conventionalcommits.org/) specification.

6. **Push to your fork**

   ```bash
   git push origin feature/amazing-feature
   ```

7. **Open a Pull Request**

   - Provide a clear description of your changes
   - Reference any related issues
   - Include screenshots for UI changes
   - Wait for review and address feedback

### Coding Standards

- **Solidity**: Follow [Solidity Style Guide](https://docs.soliditylang.org/en/latest/style-guide.html)
- **TypeScript**: Use strict type checking
- **React**: Follow [React Best Practices](https://react.dev/learn)
- **Testing**: Maintain >80% test coverage
- **Documentation**: Document all public functions

### Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what's best for the community
- Show empathy towards other contributors

---

## Troubleshooting

### Common Issues

**Problem**: Contract deployment fails with "insufficient funds"
- **Solution**: Ensure you have enough Sepolia ETH for gas fees

**Problem**: Frontend shows "Wrong Network"
- **Solution**: Switch your wallet to Sepolia testnet

**Problem**: Decryption takes too long or fails
- **Solution**:
  - Check your internet connection
  - Verify Zama Relayer is accessible
  - Ensure you signed the EIP-712 request

**Problem**: Compilation errors with FHEVM
- **Solution**:
  - Clear cache: `npm run clean`
  - Reinstall dependencies: `rm -rf node_modules && npm install`
  - Check Node.js version (must be >=20)

**Problem**: Tests fail on Sepolia
- **Solution**:
  - Ensure contract is deployed
  - Check INFURA_API_KEY is valid
  - Verify you have Sepolia ETH

### Getting Help

If you encounter issues not covered here:

1. Check existing [GitHub Issues](https://github.com/yourusername/Adventures/issues)
2. Search [Zama Documentation](https://docs.zama.ai)
3. Ask in [Zama Discord](https://discord.gg/zama)
4. Create a new issue with:
   - Clear description of the problem
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details (Node version, OS, etc.)

---

## Performance & Gas Costs

### FHE Operation Costs

FHE operations are more gas-intensive than regular operations:

| Operation | Approximate Gas Cost |
|-----------|---------------------|
| `joinGame()` | ~300,000 - 500,000 gas |
| `attackMonster()` | ~200,000 - 400,000 gas |
| FHE.add() | ~50,000 - 100,000 gas |
| FHE.asEuint32() | ~30,000 - 50,000 gas |

### Optimization Tips

- **Batch Operations**: Combine multiple actions when possible
- **State Minimization**: Store only essential encrypted data
- **Caching**: Use frontend caching to reduce blockchain reads
- **L2 Deployment**: Consider L2 networks for lower gas fees (future)

---

## Acknowledgments

This project was made possible by:

- **Zama**: For developing FHEVM and providing excellent documentation
- **Ethereum Foundation**: For the Ethereum blockchain platform
- **Hardhat**: For the development environment
- **RainbowKit**: For wallet connection UI
- **Wagmi**: For React hooks for Ethereum
- **The Web3 Community**: For continuous support and feedback

Special thanks to all contributors and early testers!

---

## License

This project is licensed under the **BSD-3-Clause-Clear License**.

```
Copyright (c) 2025, Adventures Team
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the conditions specified
in the LICENSE file are met.
```

See the [LICENSE](LICENSE) file for complete details.

---

## 📚 Documentation & Resources

### Official Documentation

- **FHEVM Documentation**: [https://docs.zama.ai/fhevm](https://docs.zama.ai/fhevm)
- **Hardhat Setup Guide**: [https://docs.zama.ai/protocol/solidity-guides/getting-started/setup](https://docs.zama.ai/protocol/solidity-guides/getting-started/setup)
- **FHEVM Testing Guide**: [https://docs.zama.ai/protocol/solidity-guides/development-guide/hardhat/write_test](https://docs.zama.ai/protocol/solidity-guides/development-guide/hardhat/write_test)
- **Hardhat Plugin Docs**: [https://docs.zama.ai/protocol/solidity-guides/development-guide/hardhat](https://docs.zama.ai/protocol/solidity-guides/development-guide/hardhat)

### Learning Resources

- **Zama Blog**: [https://www.zama.ai/blog](https://www.zama.ai/blog)
- **Ethereum Dev Docs**: [https://ethereum.org/developers](https://ethereum.org/developers)
- **Hardhat Tutorial**: [https://hardhat.org/tutorial](https://hardhat.org/tutorial)
- **React Documentation**: [https://react.dev](https://react.dev)

### Community

- **GitHub Issues**: [Report bugs or request features](https://github.com/yourusername/Adventures/issues)
- **Zama Discord**: [https://discord.gg/zama](https://discord.gg/zama)
- **Twitter**: Follow [@zama_fhe](https://twitter.com/zama_fhe) for updates
- **YouTube**: [Zama Channel](https://www.youtube.com/@zama_fhe) for tutorials

---

## Support & Contact

### Get Help

- **Bug Reports**: [GitHub Issues](https://github.com/yourusername/Adventures/issues/new?template=bug_report.md)
- **Feature Requests**: [GitHub Issues](https://github.com/yourusername/Adventures/issues/new?template=feature_request.md)
- **General Questions**: [GitHub Discussions](https://github.com/yourusername/Adventures/discussions)

### Stay Updated

- **Star this repository** to get notifications about updates
- **Watch releases** to be notified of new versions
- **Follow the project** on GitHub for latest developments

---

<div align="center">

**Built with ❤️ using Zama's FHEVM**

[Report Bug](https://github.com/yourusername/Adventures/issues) · [Request Feature](https://github.com/yourusername/Adventures/issues) · [Documentation](https://docs.zama.ai)

⭐ **Star this repo if you find it helpful!** ⭐

</div>
