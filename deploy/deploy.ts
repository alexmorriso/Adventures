import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const deployedAdventureGame = await deploy("AdventureGame", {
    from: deployer,
    log: true,
  });

  console.log(`AdventureGame contract: `, deployedAdventureGame.address);
};
export default func;
func.id = "deploy_adventure_game"; // id required to prevent reexecution
func.tags = ["AdventureGame"];
