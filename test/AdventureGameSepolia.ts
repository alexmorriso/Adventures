import { expect } from "chai";
import { ethers, fhevm, deployments } from "hardhat";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { AdventureGame } from "../types";
import { FhevmType } from "@fhevm/hardhat-plugin";

type Signers = {
  player: HardhatEthersSigner;
};

describe("AdventureGameSepolia", function () {
  let signers: Signers;
  let contract: AdventureGame;
  let contractAddress: string;

  before(async function () {
    if (fhevm.isMock) {
      console.warn("AdventureGameSepolia tests run only on Sepolia");
      this.skip();
    }

    try {
      const deployment = await deployments.get("AdventureGame");
      contractAddress = deployment.address;
      contract = await ethers.getContractAt("AdventureGame", contractAddress);
    } catch (e) {
      (e as Error).message += ". Deploy with 'npx hardhat deploy --network sepolia'";
      throw e;
    }

    const [player] = await ethers.getSigners();
    signers = { player };
  });

  it("ensures the player has encrypted gear and coins", async function () {
    this.timeout(5 * 60_000);

    await fhevm.initializeCLIApi();

    const alreadyJoined = await contract.hasJoined(signers.player.address);
    if (!alreadyJoined) {
      const tx = await contract.connect(signers.player).joinGame();
      await tx.wait();
    }

    const encryptedWeapon = await contract.getWeaponPower(signers.player.address);
    const weaponPower = await fhevm.userDecryptEuint(
      FhevmType.euint32,
      encryptedWeapon,
      contractAddress,
      signers.player,
    );
    expect(weaponPower >= 20n && weaponPower <= 100n).to.equal(true);

    const encryptedCoins = await contract.getCoinBalance(signers.player.address);
    const coins = await fhevm.userDecryptEuint(
      FhevmType.euint32,
      encryptedCoins,
      contractAddress,
      signers.player,
    );
    expect(coins >= 100n).to.equal(true);
  });
});
