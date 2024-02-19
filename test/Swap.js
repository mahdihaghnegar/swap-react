const { expect } = require("chai");
const { ethers } = require("hardhat");
const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
describe("Swap Token contract", function () {
  async function deploySwapTokenFixture() {
    const [owner, addrA, addrB, swaper] = await ethers.getSigners();
    hardhatMyTokenA = await ethers.deployContract("MyTokenA", [addrA]);
    hardhatMyTokenB = await ethers.deployContract("MyTokenB", [addrB]);
    const hardhatSwapToken = await ethers.deployContract("Swap", [
      hardhatMyTokenA,
      hardhatMyTokenB,
    ]);
    await hardhatMyTokenA.connect(addrA).mint(addrA, 15000);
    await hardhatMyTokenA.connect(addrA).transfer(owner, 10000);
    await hardhatMyTokenA.connect(owner).approve(hardhatSwapToken, 10000);

    await hardhatMyTokenB.connect(addrB).mint(addrB, 20000);
    await hardhatMyTokenB.connect(addrB).transfer(owner, 20000);
    await hardhatMyTokenB.connect(owner).approve(hardhatSwapToken, 20000);
    // Fixtures can return anything you consider useful for your tests
    return {
      hardhatSwapToken,
      hardhatMyTokenA,
      hardhatMyTokenB,
      owner,
      addrA,
      addrB,
      swaper,
    };
  }

  it("Should assign 10000 of tokens A  to the owner", async function () {
    const { hardhatMyTokenB, hardhatMyTokenA, owner } = await loadFixture(
      deploySwapTokenFixture
    );

    // await hardhatMyTokenA.transfer(owner, 10000);
    const ownerBalance = await hardhatMyTokenA.balanceOf(owner);
    expect(ownerBalance).to.equal(10000);
  });
  it("Should assign  20000 of tokens B to the owner", async function () {
    const { hardhatMyTokenB, hardhatMyTokenA, owner } = await loadFixture(
      deploySwapTokenFixture
    );

    // await hardhatMyTokenA.transfer(owner, 10000);
    const ownerBalance = await hardhatMyTokenB.balanceOf(owner);
    expect(ownerBalance).to.equal(20000);
  });
  it("Should startCreatePool 10000 of tokens A and 20000 of tokens B of the owner", async function () {
    const { hardhatSwapToken, owner } = await loadFixture(
      deploySwapTokenFixture
    );

    await hardhatSwapToken.connect(owner).startCreatePool(10000, 20000);

    expect(await hardhatSwapToken.getK()).to.equal(20000 * 10000);
  });
  it("Should swap 1st 1000 token A of swaper to get 1819 token B", async function () {
    const {
      hardhatSwapToken,
      owner,
      addrA,
      swaper,
      hardhatMyTokenA,
      hardhatMyTokenB,
    } = await loadFixture(deploySwapTokenFixture);

    await hardhatSwapToken.connect(owner).startCreatePool(10000, 20000);

    await hardhatMyTokenA.connect(addrA).transfer(swaper, 1000);
    await hardhatMyTokenA.connect(swaper).approve(hardhatSwapToken, 1000);

    await hardhatSwapToken.connect(swaper).swapAtoB(1000);
    expect(await hardhatMyTokenB.balanceOf(swaper)).to.equal(1819);
  });

  it("Should swap 2nd 1000 token A of swaper to get 1515 token B", async function () {
    const {
      hardhatSwapToken,
      owner,
      addrA,
      swaper,
      hardhatMyTokenA,
      hardhatMyTokenB,
    } = await loadFixture(deploySwapTokenFixture);

    await hardhatSwapToken.connect(owner).startCreatePool(10000, 20000);

    await hardhatMyTokenA.connect(addrA).transfer(swaper, 2000);
    await hardhatMyTokenA.connect(swaper).approve(hardhatSwapToken, 2000);

    await hardhatSwapToken.connect(swaper).swapAtoB(1000);

    await hardhatSwapToken.connect(swaper).swapAtoB(1000);
    expect(await hardhatMyTokenB.balanceOf(swaper)).to.equal(1819 + 1515);
  });

  it("Should swap 3rd 1000 token A of swaper to get 1282 token B", async function () {
    const {
      hardhatSwapToken,
      owner,
      addrA,
      swaper,
      hardhatMyTokenA,
      hardhatMyTokenB,
    } = await loadFixture(deploySwapTokenFixture);

    await hardhatSwapToken.connect(owner).startCreatePool(10000, 20000);

    await hardhatMyTokenA.connect(addrA).transfer(swaper, 3000);
    await hardhatMyTokenA.connect(swaper).approve(hardhatSwapToken, 3000);

    await hardhatSwapToken.connect(swaper).swapAtoB(1000);

    await hardhatSwapToken.connect(swaper).swapAtoB(1000);
    await hardhatSwapToken.connect(swaper).swapAtoB(1000);
    expect(await hardhatMyTokenB.balanceOf(swaper)).to.equal(
      1819 + 1515 + 1282
    );
  });

  it("Should swap 4th 1000 token A of swaper to get 1099 token B", async function () {
    const {
      hardhatSwapToken,
      owner,
      addrA,
      swaper,
      hardhatMyTokenA,
      hardhatMyTokenB,
    } = await loadFixture(deploySwapTokenFixture);

    await hardhatSwapToken.connect(owner).startCreatePool(10000, 20000);

    await hardhatMyTokenA.connect(addrA).transfer(swaper, 4000);
    await hardhatMyTokenA.connect(swaper).approve(hardhatSwapToken, 4000);

    await hardhatSwapToken.connect(swaper).swapAtoB(1000);
    await hardhatSwapToken.connect(swaper).swapAtoB(1000);
    await hardhatSwapToken.connect(swaper).swapAtoB(1000);
    await hardhatSwapToken.connect(swaper).swapAtoB(1000);
    expect(await hardhatMyTokenB.balanceOf(swaper)).to.equal(
      1819 + 1515 + 1282 + 1099
    );
  });
  it("Should swap 5th 1000 token A of swaper to get 952 token B", async function () {
    const {
      hardhatSwapToken,
      owner,
      addrA,
      swaper,
      hardhatMyTokenA,
      hardhatMyTokenB,
    } = await loadFixture(deploySwapTokenFixture);

    await hardhatSwapToken.connect(owner).startCreatePool(10000, 20000);

    await hardhatMyTokenA.connect(addrA).transfer(swaper, 5000);
    await hardhatMyTokenA.connect(swaper).approve(hardhatSwapToken, 5000);

    await hardhatSwapToken.connect(swaper).swapAtoB(1000);
    await hardhatSwapToken.connect(swaper).swapAtoB(1000);
    await hardhatSwapToken.connect(swaper).swapAtoB(1000);
    await hardhatSwapToken.connect(swaper).swapAtoB(1000);
    await hardhatSwapToken.connect(swaper).swapAtoB(1000);
    expect(await hardhatMyTokenB.balanceOf(swaper)).to.equal(
      1819 + 1515 + 1282 + 1099 + 952
    );
  });
});
