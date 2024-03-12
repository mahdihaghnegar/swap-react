const hre = require("hardhat");

async function main() {
  var z = BigInt(1000000000000000000);
  const a = BigInt(10000) * z; //* 1000000000000000000; // (10 ^ 18);
  const b = BigInt(20000) * z; //* 1000000000000000000; // (10 ^ 18);

  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  //local: npx hardhat run scripts/deploy.js
  //network(with vpn):  npx hardhat run scripts/deploy.js --network sepolia
  //network start step1:
  //
  /*
  const tokenA = await ethers.deployContract("MyTokenA", [deployer]);
  console.log("TokenA address:", await tokenA.getAddress());
  const tokenB = await ethers.deployContract("MyTokenB", [deployer]);
  console.log("TokenB address:", await tokenB.getAddress());

  const swap = await ethers.deployContract("Swap", [tokenA, tokenB]);
  const swapAddress = await swap.getAddress();
  console.log("swap address:", swapAddress);
  //network end step1: (save addreses) and comment all to network setp2
  //local continiue
  
  await tokenA.mint(deployer, a); //ok
  console.log("TokenA balanceOf deployer:", await tokenA.balanceOf(deployer));
  await tokenB.mint(deployer, b); //ok
  console.log("TokenB balanceOf deployer:", await tokenB.balanceOf(deployer));
  await tokenA.approve(swapAddress, a);
  console.log(
    "Swap allowance Token A:",
    await tokenA.allowance(deployer, swapAddress)
  );
  await tokenB.approve(swapAddress, b);
  console.log(
    "Swap allowance Token B:",
    await tokenB.allowance(deployer, swapAddress)
  );

  await swap.startCreatePool(a, b);
  console.log("Swap get K", await swap.getK());
  //use: npx hardhat run scripts/deploy.js

  //end local

  //address from network step 1 
  /* 
//new
swap address: 0x1A16c39286bB3C9D551D7fC9A689d1ace43d4c41
//old
TokenA address: 0xfcE79d85c9f7822eaBd2B69A91Eb474640271241
TokenB address: 0x77Aa7CA18fdC46Ab31D3094b094cdf192F650F39
swap address: 0x1Cd46004642868d4BDd3610Ca3Bf16DF9F0d6CE6
  */
  //network start: step2 coment off if start and comment on if done but next steps not works
  const tokenAaddress = "0xfcE79d85c9f7822eaBd2B69A91Eb474640271241";
  const tokenAcontract = await hre.ethers.getContractFactory("MyTokenA");
  const tokenA = tokenAcontract.attach(tokenAaddress);
  //await tokenA.mint(deployer, a); //comment on if it is ok
  console.log("TokenA balanceOf deployer:", await tokenA.balanceOf(deployer));

  const tokenBaddress = "0x77Aa7CA18fdC46Ab31D3094b094cdf192F650F39";
  const tokenBcontract = await hre.ethers.getContractFactory("MyTokenB");
  const tokenB = tokenBcontract.attach(tokenBaddress);
  //await tokenB.mint(deployer, b); //comment on if it is ok
  console.log("TokenB balanceOf deployer:", await tokenB.balanceOf(deployer));

  //new swap
  /* const swap = await ethers.deployContract("Swap", [tokenA, tokenB]);
  const swapAddress = await swap.getAddress();
  console.log("swap address:", swapAddress);*/

  //last old swap
  const swapAddress = "0x1Cd46004642868d4BDd3610Ca3Bf16DF9F0d6CE6"; // "0x1A16c39286bB3C9D551D7fC9A689d1ace43d4c41";

  const Swapcontract = await hre.ethers.getContractFactory("Swap");
  const swap = Swapcontract.attach(swapAddress);

  //await tokenA.approve(swapAddress, a); //comment on if it is ok
  console.log(
    "Swap allowance Token A:",
    await tokenA.allowance(deployer, swapAddress)
  );
  // await tokenB.approve(swapAddress, b); //comment on if it is ok
  console.log(
    "Swap allowance Token B:",
    await tokenB.allowance(deployer, swapAddress)
  );

  //await swap.startCreatePool(a, b); //comment on if it is ok
  console.log("Swap get K", await swap.getK());
  console.log("token A of Swap", await tokenA.balanceOf(swapAddress));
  console.log("token B of Swap", await tokenB.balanceOf(swapAddress));
  //end network step2
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    // process.exitCode = 1;
    process.exit(1);
  });
