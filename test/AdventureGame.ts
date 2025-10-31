import { expect } from "chai";
import { ethers, fhevm } from "hardhat";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { AdventureGame, AdventureGame__factory } from "../types";
import { FhevmType } from "@fhevm/hardhat-plugin";

type Signers = {
  deployer: HardhatEthersSigner;
  alice: HardhatEthersSigner;
  bob: HardhatEthersSigner;
};

async function deployFixture() {
  const factory = (await ethers.getContractFactory("AdventureGame")) as AdventureGame__factory;
  const contract = (await factory.deploy()) as AdventureGame;
  const address = await contract.getAddress();
  return { contract, address };
}

describe("AdventureGame", function () {
  let signers: Signers;
  let contract: AdventureGame;
  let contractAddress: string;

  before(async function () {
    const ethSigners = await ethers.getSigners();
    signers = { deployer: ethSigners[0], alice: ethSigners[1], bob: ethSigners[2] };
  });

  beforeEach(async function () {
    if (!fhevm.isMock) {
      console.warn("AdventureGame tests run only on the mock FHEVM network");
      this.skip();
    }

    ({ contract, address: contractAddress } = await deployFixture());
  });

  it("allows a player to join and receive encrypted assets", async function () {
    expect(await contract.hasJoined(signers.alice.address)).to.equal(false);

    await contract.connect(signers.alice).joinGame();

    expect(await contract.hasJoined(signers.alice.address)).to.equal(true);

    const encryptedWeapon = await contract.getWeaponPower(signers.alice.address);
    const weaponPower = await fhevm.userDecryptEuint(
      FhevmType.euint32,
      encryptedWeapon,
      contractAddress,
      signers.alice,
    );
    expect(weaponPower >= 20n && weaponPower <= 100n).to.equal(true);

    const encryptedCoins = await contract.getCoinBalance(signers.alice.address);
    const coins = await fhevm.userDecryptEuint(
      FhevmType.euint32,
      encryptedCoins,
      contractAddress,
      signers.alice,
    );
    expect(coins).to.equal(100n);
  });

  it("prevents the same player from joining twice", async function () {
    await contract.connect(signers.alice).joinGame();
    await expect(contract.connect(signers.alice).joinGame()).to.be.revertedWith("Player already joined");
  });

  it("rewards encrypted loot when attacking monsters", async function () {
    await contract.connect(signers.alice).joinGame();

    const encryptedCoinsBefore = await contract.getCoinBalance(signers.alice.address);
    const coinsBefore = await fhevm.userDecryptEuint(
      FhevmType.euint32,
      encryptedCoinsBefore,
      contractAddress,
      signers.alice,
    );

    await contract.connect(signers.alice).attackMonster();

    const encryptedCoinsAfter = await contract.getCoinBalance(signers.alice.address);
    const coinsAfter = await fhevm.userDecryptEuint(
      FhevmType.euint32,
      encryptedCoinsAfter,
      contractAddress,
      signers.alice,
    );

    const loot = coinsAfter - coinsBefore;
    expect(loot >= 10n && loot <= 50n).to.equal(true);
    expect(coinsAfter > coinsBefore).to.equal(true);
  });

  it("requires joining before attacking", async function () {
    await expect(contract.connect(signers.alice).attackMonster()).to.be.revertedWith("Player not joined");
  });
});
