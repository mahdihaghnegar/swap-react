const { expect } = require("chai");
const { ethers } = require("hardhat");
const z = BigInt(1000000000000000000); //  not works BigInt(10 ^ 18);
//b=a+a
const a0 = BigInt(10000);
const b0 = a0 * BigInt(2);
const a = a0 * z;
const b = b0 * z;
const k = a * b;
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
    await hardhatMyTokenA.connect(addrA).mint(addrA, b); //for test need more a used b
    await hardhatMyTokenA.connect(addrA).transfer(owner, a);
    await hardhatMyTokenA.connect(owner).approve(hardhatSwapToken, a);

    await hardhatMyTokenB.connect(addrB).mint(addrB, b);
    await hardhatMyTokenB.connect(addrB).transfer(owner, b);
    await hardhatMyTokenB.connect(owner).approve(hardhatSwapToken, b);
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

  it("Should assign " + a + " of tokens A  to the owner", async function () {
    const { hardhatMyTokenA, owner } = await loadFixture(
      deploySwapTokenFixture
    );
    const ownerBalance = await hardhatMyTokenA.balanceOf(owner);

    expect(ownerBalance).to.equal(a);
  });
  it("Should assign " + b + " of tokens B to the owner", async function () {
    const { hardhatMyTokenB, owner } = await loadFixture(
      deploySwapTokenFixture
    );
    const ownerBalance = await hardhatMyTokenB.balanceOf(owner);

    expect(ownerBalance).to.equal(b);
  });

  it(
    "Should startCreatePool " +
      a +
      " of tokens A and " +
      b +
      " of tokens B of the owner and getK():" +
      a * b,
    async function () {
      const { hardhatSwapToken, owner } = await loadFixture(
        deploySwapTokenFixture
      );
      await hardhatSwapToken.connect(owner).startCreatePool(a, b);

      expect(await hardhatSwapToken.getK()).to.equal(a * b);
    }
  );

  const a1 = BigInt(100) * z; //set send a1 for all steps
  const b1 = k / (a + a1 * BigInt(1));
  var b1_resault = b - b1; //if a1=1 BigInt(1999800019998000200);

  it(
    "Should swap 1st " +
      a1 +
      " token A of swaper to get " +
      b1_resault +
      " token B (step1)",
    async function () {
      const {
        hardhatSwapToken,
        owner,
        addrA,
        swaper,
        hardhatMyTokenA,
        hardhatMyTokenB,
      } = await loadFixture(deploySwapTokenFixture);
      await hardhatSwapToken.connect(owner).startCreatePool(a, b);

      await hardhatMyTokenA.connect(addrA).transfer(swaper, a1);
      await hardhatMyTokenA.connect(swaper).approve(hardhatSwapToken, a1);

      await hardhatSwapToken.connect(swaper).swapAtoB(a1);
      const x = await hardhatMyTokenB.balanceOf(swaper);

      expect(BigInt(x)).to.equal(BigInt(b1_resault));
    }
  );
  const b2 = k / (a + a1 * BigInt(2));
  var b2_resault = b - b2; //if a1=1 get BigInt(1999400139970006199);

  it(
    "Should swap 2nd " +
      a1 +
      " token A of swaper to get " +
      (b2_resault - b1_resault) +
      " token B (step2)",
    async function () {
      const {
        hardhatSwapToken,
        owner,
        addrA,
        swaper,
        hardhatMyTokenA,
        hardhatMyTokenB,
      } = await loadFixture(deploySwapTokenFixture);
      await hardhatSwapToken.connect(owner).startCreatePool(a, b);

      await hardhatMyTokenA.connect(addrA).transfer(swaper, a1 * BigInt(2));
      await hardhatMyTokenA
        .connect(swaper)
        .approve(hardhatSwapToken, a1 * BigInt(2));

      await hardhatSwapToken.connect(swaper).swapAtoB(a1);
      await hardhatSwapToken.connect(swaper).swapAtoB(a1);

      const x = await hardhatMyTokenB.balanceOf(swaper);

      expect(BigInt(x)).to.equal(b2_resault);
    }
  );

  const b3 = k / (a + a1 * BigInt(3));
  var b3_resault = b - b3; //if a1=1 get: BigInt(1999000379870042187);

  it(
    "Should swap 3nd " +
      a1 +
      " token A of swaper to get " +
      (b3_resault - b2_resault) +
      " token B (step3)",
    async function () {
      const {
        hardhatSwapToken,
        owner,
        addrA,
        swaper,
        hardhatMyTokenA,
        hardhatMyTokenB,
      } = await loadFixture(deploySwapTokenFixture);
      await hardhatSwapToken.connect(owner).startCreatePool(a, b);

      await hardhatMyTokenA.connect(addrA).transfer(swaper, a1 * BigInt(3));
      await hardhatMyTokenA
        .connect(swaper)
        .approve(hardhatSwapToken, a1 * BigInt(3));

      await hardhatSwapToken.connect(swaper).swapAtoB(a1);
      await hardhatSwapToken.connect(swaper).swapAtoB(a1);
      await hardhatSwapToken.connect(swaper).swapAtoB(a1);

      const x = await hardhatMyTokenB.balanceOf(swaper);

      expect(BigInt(x)).to.equal(b3_resault);
    }
  );

  const b4 = k / (a + a1 * BigInt(4));
  var b4_resault = b - b4; //if a1=1 get  BigInt(1998600739650156133);

  it(
    "Should swap 4th " +
      a1 +
      " token A of swaper to get " +
      (b4_resault - b3_resault) +
      " token B (step4)",
    async function () {
      const {
        hardhatSwapToken,
        owner,
        addrA,
        swaper,
        hardhatMyTokenA,
        hardhatMyTokenB,
      } = await loadFixture(deploySwapTokenFixture);
      await hardhatSwapToken.connect(owner).startCreatePool(a, b);

      await hardhatMyTokenA.connect(addrA).transfer(swaper, a1 * BigInt(4));
      await hardhatMyTokenA
        .connect(swaper)
        .approve(hardhatSwapToken, a1 * BigInt(4));

      await hardhatSwapToken.connect(swaper).swapAtoB(a1);
      await hardhatSwapToken.connect(swaper).swapAtoB(a1);
      await hardhatSwapToken.connect(swaper).swapAtoB(a1);
      await hardhatSwapToken.connect(swaper).swapAtoB(a1);

      const x = await hardhatMyTokenB.balanceOf(swaper);

      expect(BigInt(x)).to.equal(b4_resault);
    }
  );

  const b5 = k / (a + a1 * BigInt(5));
  var b5_resault = b - b5; //if a1=1 get BigInt(1998201219262419969);
  it(
    "Should swap 5th " +
      a1 +
      " token A of swaper to get " +
      (b5_resault - b4_resault) +
      " token B (step5)",
    async function () {
      const {
        hardhatSwapToken,
        owner,
        addrA,
        swaper,
        hardhatMyTokenA,
        hardhatMyTokenB,
      } = await loadFixture(deploySwapTokenFixture);
      await hardhatSwapToken.connect(owner).startCreatePool(a, b);

      await hardhatMyTokenA.connect(addrA).transfer(swaper, a1 * BigInt(5));
      await hardhatMyTokenA
        .connect(swaper)
        .approve(hardhatSwapToken, a1 * BigInt(5));

      await hardhatSwapToken.connect(swaper).swapAtoB(a1);
      await hardhatSwapToken.connect(swaper).swapAtoB(a1);
      await hardhatSwapToken.connect(swaper).swapAtoB(a1);
      await hardhatSwapToken.connect(swaper).swapAtoB(a1);
      await hardhatSwapToken.connect(swaper).swapAtoB(a1);

      const x = await hardhatMyTokenB.balanceOf(swaper);

      expect(BigInt(x)).to.equal(b5_resault);
    }
  );
});
