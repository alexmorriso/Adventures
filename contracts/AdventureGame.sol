// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {FHE, euint32} from "@fhevm/solidity/lib/FHE.sol";
import {SepoliaConfig} from "@fhevm/solidity/config/ZamaConfig.sol";

/// @title AdventureGame
/// @notice Adventure experience where player data stays encrypted using Zama FHE.
contract AdventureGame is SepoliaConfig {
    struct PlayerData {
        euint32 weaponPower;
        euint32 coinBalance;
        bool joined;
    }

    mapping(address => PlayerData) private players;

    event PlayerJoined(address indexed player, euint32 weaponPower, euint32 initialCoins);
    event MonsterDefeated(address indexed player, euint32 coinsLooted, euint32 updatedCoinBalance);

    /// @notice Join the adventure and receive an encrypted weapon and coin balance.
    function joinGame() external {
        PlayerData storage player = players[msg.sender];
        require(!player.joined, "Player already joined");

        uint32 weaponPowerPlain = _randomInRange(msg.sender, 20, 101);

        player.weaponPower = FHE.asEuint32(weaponPowerPlain);
        player.coinBalance = FHE.asEuint32(100);
        player.joined = true;

        FHE.allowThis(player.weaponPower);
        FHE.allow(player.weaponPower, msg.sender);
        FHE.allowThis(player.coinBalance);
        FHE.allow(player.coinBalance, msg.sender);

        emit PlayerJoined(msg.sender, player.weaponPower, player.coinBalance);
    }

    /// @notice Attack a monster to earn encrypted coin loot.
    /// @return coinsLooted Encrypted amount of coins gained from the monster.
    function attackMonster() external returns (euint32 coinsLooted) {
        PlayerData storage player = players[msg.sender];
        require(player.joined, "Player not joined");

        uint32 dropPlain = _randomInRange(msg.sender, 10, 51);
        coinsLooted = FHE.asEuint32(dropPlain);

        euint32 updatedBalance = FHE.add(player.coinBalance, coinsLooted);
        player.coinBalance = updatedBalance;

        FHE.allowThis(coinsLooted);
        FHE.allow(coinsLooted, msg.sender);
        FHE.allowThis(player.coinBalance);
        FHE.allow(player.coinBalance, msg.sender);

        emit MonsterDefeated(msg.sender, coinsLooted, player.coinBalance);
    }

    /// @notice Check whether a player has already joined the game.
    function hasJoined(address playerAddress) external view returns (bool) {
        return players[playerAddress].joined;
    }

    /// @notice Get the encrypted weapon power for a specific player.
    function getWeaponPower(address playerAddress) external view returns (euint32) {
        PlayerData storage player = players[playerAddress];
        require(player.joined, "Player not found");
        return player.weaponPower;
    }

    /// @notice Get the encrypted coin balance for a specific player.
    function getCoinBalance(address playerAddress) external view returns (euint32) {
        PlayerData storage player = players[playerAddress];
        require(player.joined, "Player not found");
        return player.coinBalance;
    }

    function _randomInRange(address player, uint32 lowerInclusive, uint32 upperExclusive) private view returns (uint32) {
        require(upperExclusive > lowerInclusive, "Invalid range");
        uint256 randomWord = uint256(
            keccak256(abi.encodePacked(block.timestamp, block.prevrandao, player, block.number, blockhash(block.number - 1)))
        );
        uint32 span = upperExclusive - lowerInclusive;
        return uint32(randomWord % span) + lowerInclusive;
    }
}
