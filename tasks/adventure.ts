import { FhevmType } from "@fhevm/hardhat-plugin";
import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

task("task:adventure-address", "Prints the AdventureGame address").setAction(async (_taskArguments: TaskArguments, hre) => {
  const { deployments } = hre;
  const contract = await deployments.get("AdventureGame");
  console.log("AdventureGame address is " + contract.address);
});

task("task:join-game", "Join the adventure and mint encrypted gear").setAction(async (_taskArguments: TaskArguments, hre) => {
  const { deployments, ethers } = hre;
  const contract = await deployments.get("AdventureGame");
  const signer = (await ethers.getSigners())[0];
  const adventure = await ethers.getContractAt("AdventureGame", contract.address);
  const tx = await adventure.connect(signer).joinGame();
  console.log(`Joining game tx: ${tx.hash}`);
  await tx.wait();
  console.log("Join confirmed");
});

task("task:view-weapon", "Decrypt weapon power for a player")
  .addOptionalParam("player", "Address to inspect. Defaults to signer")
  .setAction(async (taskArguments: TaskArguments, hre) => {
    const { deployments, ethers, fhevm } = hre;
    await fhevm.initializeCLIApi();

    const contract = await deployments.get("AdventureGame");
    const adventure = await ethers.getContractAt("AdventureGame", contract.address);
    const signer = (await ethers.getSigners())[0];
    const targetAddress = taskArguments.player ?? signer.address;

    const encryptedWeapon = await adventure.getWeaponPower(targetAddress);
    const weaponPower = await fhevm.userDecryptEuint(
      FhevmType.euint32,
      encryptedWeapon,
      contract.address,
      signer,
    );

    console.log(`Weapon power for ${targetAddress}: ${weaponPower}`);
  });

task("task:view-coins", "Decrypt coin balance for a player")
  .addOptionalParam("player", "Address to inspect. Defaults to signer")
  .setAction(async (taskArguments: TaskArguments, hre) => {
    const { deployments, ethers, fhevm } = hre;
    await fhevm.initializeCLIApi();

    const contract = await deployments.get("AdventureGame");
    const adventure = await ethers.getContractAt("AdventureGame", contract.address);
    const signer = (await ethers.getSigners())[0];
    const targetAddress = taskArguments.player ?? signer.address;

    const encryptedCoins = await adventure.getCoinBalance(targetAddress);
    const coins = await fhevm.userDecryptEuint(
      FhevmType.euint32,
      encryptedCoins,
      contract.address,
      signer,
    );

    console.log(`Coin balance for ${targetAddress}: ${coins}`);
  });

task("task:attack-monster", "Attack a monster and decrypt the loot")
  .setAction(async (_taskArguments: TaskArguments, hre) => {
    const { deployments, ethers, fhevm } = hre;
    await fhevm.initializeCLIApi();

    const contract = await deployments.get("AdventureGame");
    const adventure = await ethers.getContractAt("AdventureGame", contract.address);
    const signer = (await ethers.getSigners())[0];

    const encryptedCoinsBefore = await adventure.getCoinBalance(signer.address);
    const coinBalanceBefore = await fhevm.userDecryptEuint(
      FhevmType.euint32,
      encryptedCoinsBefore,
      contract.address,
      signer,
    );

    const tx = await adventure.connect(signer).attackMonster();
    console.log(`Attack monster tx: ${tx.hash}`);
    const receipt = await tx.wait();
    console.log(`Status: ${receipt?.status}`);

    const encryptedCoinsAfter = await adventure.getCoinBalance(signer.address);
    const coinBalanceAfter = await fhevm.userDecryptEuint(
      FhevmType.euint32,
      encryptedCoinsAfter,
      contract.address,
      signer,
    );

    console.log(`Loot obtained: ${coinBalanceAfter - coinBalanceBefore}`);
    console.log(`Updated coin balance: ${coinBalanceAfter}`);
  });
