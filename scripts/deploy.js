const hre = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  //local
  const tokenA = await ethers.deployContract("MyTokenA", [deployer]);
  console.log("TokenA address:", await tokenA.getAddress());
  const tokenB = await ethers.deployContract("MyTokenB", [deployer]);
  console.log("TokenB address:", await tokenB.getAddress());

  const swap = await ethers.deployContract("Swap", [tokenA, tokenB]);
  const swapAddress = await swap.getAddress();
  console.log("swap address:", swapAddress);

  const a = 3000; //* 1000000000000000000; // (10 ^ 18); // 1000000000000000000;
  await tokenA.mint(deployer, a); //ok
  console.log("TokenA balanceOf deployer:", await tokenA.balanceOf(deployer));
  const b = 5000; //* 1000000000000000000; // (10 ^ 18);
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

  /*
//new
TokenA address: 0x5A06c30ea105b69dA3bE428C1e8b491F02F39d8C
TokenB address: 0xC172ab3A39cae30910888911554f01202bf5B7D3
swap address: 0x5D65bB645c9d8e812bAE1Eb7baCAb03FD4De99Dc
//old
TokenA address: 0xfcE79d85c9f7822eaBd2B69A91Eb474640271241
TokenB address: 0x77Aa7CA18fdC46Ab31D3094b094cdf192F650F39
swap address: 0x1Cd46004642868d4BDd3610Ca3Bf16DF9F0d6CE6
  
  const tokenAaddress = "0xfcE79d85c9f7822eaBd2B69A91Eb474640271241";
  const tokenAcontract = await hre.ethers.getContractFactory("MyTokenA");
  const tokenA = tokenAcontract.attach(tokenAaddress);
  await tokenA.mint(deployer, 100000 * (10 ^ 18)); //ok
  console.log("TokenA balanceOf deployer:", await tokenA.balanceOf(deployer));

  const tokenBaddress = "0x77Aa7CA18fdC46Ab31D3094b094cdf192F650F39";
  const tokenBcontract = await hre.ethers.getContractFactory("MyTokenB");
  const tokenB = tokenBcontract.attach(tokenBaddress);
  await tokenB.mint(deployer, 200000 * (10 ^ 18)); //ok
  console.log("TokenB balanceOf deployer:", await tokenB.balanceOf(deployer));

  /*const swapAddress = "0x1Cd46004642868d4BDd3610Ca3Bf16DF9F0d6CE6";
  const Swapcontract = await hre.ethers.getContractFactory("Swap");
  const swap = Swapcontract.attach(swapAddress);

  await tokenA.approve(swapAddress, 100000 * (10 ^ 18));
  console.log(
    "Swap allowance Token A:",
    await tokenA.allowance(deployer, swapAddress)
  );
  await tokenB.approve(swapAddress, 200000 * (10 ^ 18));
  console.log(
    "Swap allowance Token B:",
    await tokenB.allowance(deployer, swapAddress)
  );

  await swap.startCreatePool(100000 * (10 ^ 18), 200000 * (10 ^ 18));
  console.log("Swap get K", await swap.getK());*/
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
