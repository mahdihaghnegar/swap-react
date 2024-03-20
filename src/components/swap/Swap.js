import React, { useState, useEffect } from "react";
import Web3 from "web3";
import "./Swap.css";
import BigNumber from "bignumber.js";
//import { BigNumber } from "./node_modules/bignumber.js/bignumber.mjs";

import swapContractABI from "../../artifacts/contracts/Swap.sol/Swap.json";
import tokenAContractABI from "../../artifacts/contracts/MyTokenA.sol/MyTokenA.json";
import tokenBContractABI from "../../artifacts/contracts/MyTokenB.sol/MyTokenB.json";

function Swap({ account }) {
  const [firstToken, setFirstToken] = useState(true);
  const [swapContract, setSwapContract] = useState(null);
  const [tokenAContract, setTokenAContract] = useState(null);
  const [tokenBContract, setTokenBContract] = useState(null);

  const [pretokenB, setPretokenB] = useState(0);
  const [pretokenAshow, setPretokenAshow] = useState(0);

  const [pretokenA, setPretokenA] = useState(0);
  const [pretokenBshow, setPretokenBshow] = useState(0);

  const [amounttokenB, setAmountTokenB] = useState(0);
  const [amounttokenA, setAmountTokenA] = useState(0);
  const z = new BigNumber(1000000000000000000);

  const swapcontractAddress = "0x1A16c39286bB3C9D551D7fC9A689d1ace43d4c41";

  async function initWeb3() {
    if (window.ethereum) {
      try {
        // Request account access if needed
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const web3Instance = new Web3(window.ethereum);

        /*//old
        TokenA address: 0xfcE79d85c9f7822eaBd2B69A91Eb474640271241
        TokenB address: 0x77Aa7CA18fdC46Ab31D3094b094cdf192F650F39
        swap address: 0x1Cd46004642868d4BDd3610Ca3Bf16DF9F0d6CE6
         */

        // Initialize your contract instance
        const tokenAcontractAddress =
          "0xfcE79d85c9f7822eaBd2B69A91Eb474640271241";
        //const contractABI = YOUR_CONTRACT_ABI;
        const tokenAcontractInstance = new web3Instance.eth.Contract(
          tokenAContractABI.abi,
          tokenAcontractAddress
        );
        setTokenAContract(tokenAcontractInstance);

        // Initialize your contract instance
        const tokenBcontractAddress =
          "0x77Aa7CA18fdC46Ab31D3094b094cdf192F650F39";
        //const contractABI = YOUR_CONTRACT_ABI;
        const tokenBcontractInstance = new web3Instance.eth.Contract(
          tokenBContractABI.abi,
          tokenBcontractAddress
        );
        setTokenBContract(tokenBcontractInstance);
        //handlebalanceOfB();
        // Initialize your contract instance
        // const swapcontractAddress =
        //"0x1Cd46004642868d4BDd3610Ca3Bf16DF9F0d6CE6";
        //const contractABI = YOUR_CONTRACT_ABI;
        const swapcontractInstance = new web3Instance.eth.Contract(
          swapContractABI.abi,
          swapcontractAddress
        );
        setSwapContract(swapcontractInstance);
      } catch (error) {
        console.error("Error while connecting to MetaMask: ", error);
      }
    } else {
      console.error("MetaMask extension not detected");
      setSwapContract(null);
    }
  }

  useEffect(() => {
    initWeb3();

    // This block will be executed whenever 'account' changes
    console.log("swap account changed:", account);
  }, [account]);
  useEffect(() => {
    // This block will be executed whenever 'account' changes
    console.log("swap swapContract changed:", swapContract);
    handlebalanceOfA();
    handlebalanceOfB();
  }, [swapContract]);

  const handleperviweSwapAtoB = async (amountTokenA) => {
    // Example function call on your contract
    try {
      // Example: Call a read function
      const result = await swapContract.methods
        .perviewSwapAtoB(BigNumber(amountTokenA).toFixed(0))
        .call({ from: account });
      const r2 = BigNumber(result).dividedBy(z).toFixed(18);
      setPretokenBshow(r2);
      console.log(
        "Result from contract " + amountTokenA + " handleperviweSwapAtoB:",
        result // pretokenBshow
      );

      // Example: Call a write function
      // await contract.methods.someWriteFunction().send({ from: account });
    } catch (error) {
      console.error("Error while handleperviweSwapAtoB: ", error);
    }
  };
  const handleperviweSwapBtoA = async (amountTokenB) => {
    // Example function call on your contract
    try {
      // Example: Call a read function
      const result = await swapContract.methods
        .perviewSwapBtoA(BigNumber(amountTokenB).toFixed(0))
        .call({ from: account });
      const r2 = BigNumber(result).dividedBy(z).toFixed(18);
      setPretokenAshow(r2);
      console.log(
        "Result from contract " + amountTokenB + " handleperviweSwapBtoA:",
        result //pretokenAshow
      );

      // Example: Call a write function
      // await contract.methods.someWriteFunction().send({ from: account });
    } catch (error) {
      console.error("Error while handleperviweSwapBtoA: ", error);
    }
  };

  async function handlebalanceOfA() {
    // Example function call on your contract
    try {
      const bl = await tokenAContract.methods
        .balanceOf(account)
        .call({ from: account });

      const bl2 = BigNumber(bl).dividedBy(z).toFixed(18);
      console.log(" balanceOf token A:", bl2);

      setAmountTokenA(bl2);
    } catch (error) {
      console.error("Error while balanceOf token A: ", error);
    }
  }

  const handlebalanceOfB = async () => {
    // Example function call on your contract
    try {
      const bl = await tokenBContract.methods
        .balanceOf(account)
        .call({ from: account });

      const bl2 = BigNumber(bl).dividedBy(z).toFixed(18);
      console.log(" balanceOf token B:", bl2);

      setAmountTokenB(bl2);
    } catch (error) {
      console.error("Error while balanceOf token B: ", error);
    }
  };

  const handleSwapAtoB = async (amountTokenA) => {
    // Example function call on your contract
    try {
      const bl = await tokenAContract.methods
        .balanceOf(account)
        .call({ from: account });
      console.log(" balanceOf token A:", bl);
      const amA = z.multipliedBy(amountTokenA).toFixed(0);
      if (bl >= amA) {
        const ar = await tokenAContract.methods
          .approve(swapcontractAddress, amA)
          .send({ from: account });
        console.log(" approve token A to swap contract:", ar);
        const al = await tokenAContract.methods
          .allowance(account, swapcontractAddress)
          .call({ from: account });
        console.log(" allowance Token A to swap contract:", al);

        // Example: Call a read function
        const result = await swapContract.methods
          .swapAtoB(amA)
          .send({ from: account });
        //setPretokenBshow(result);
        //console.log("Result from contract handleSwapAtoB:", pretokenBshow);
        handlebalanceOfA();
        handlebalanceOfB();
        setPretokenBshow(0);
        setPretokenAshow(0);
      }
      // Example: Call a write function
      // await contract.methods.someWriteFunction().send({ from: account });
    } catch (error) {
      console.error("Error while handleSwapAtoB: ", error);
    }
  };

  const handleSwapBtoA = async (amountTokenB) => {
    // Example function call on your contract
    try {
      const bl = await tokenBContract.methods
        .balanceOf(account)
        .call({ from: account });
      console.log(" balanceOf token B:", bl);
      const amB = z.multipliedBy(amountTokenB).toFixed(0);
      if (bl >= amB) {
        const ar = await tokenBContract.methods
          .approve(swapcontractAddress, amB)
          .send({ from: account });
        console.log(" approve token B to swap contract:", ar);
        const al = await tokenBContract.methods
          .allowance(account, swapcontractAddress)
          .call({ from: account });
        console.log(" allowance Token B to swap contract:", al);

        // Example: Call a read function
        const result = await swapContract.methods
          .swapBtoA(amB)
          .send({ from: account });
        //setPretokenAshow(result);
        //console.log("Result from contract handleSwapBtoA:", pretokenAshow);
        handlebalanceOfA();
        handlebalanceOfB();
        setPretokenBshow(0);
        setPretokenAshow(0);
      }
      // Example: Call a write function
      // await contract.methods.someWriteFunction().send({ from: account });
    } catch (error) {
      console.error("Error while handleSwapAtoB: ", error);
    }
  };

  const handleInputChangeA = (event) => {
    const s = z.multipliedBy(event.target.value);
    setPretokenA(event.target.value);
    // console.log("s", s);
    if (firstToken) handleperviweSwapAtoB(s);
  };
  const handleInputChangeB = (event) => {
    const s = z.multipliedBy(event.target.value);
    setPretokenB(event.target.value);
    if (!firstToken) handleperviweSwapBtoA(s);
  };

  const isEmpty = (value) => {
    return value === null || value === undefined; //|| value.trim() === "";
  };
  const handleSwitch = () => {
    if (firstToken) {
      setFirstToken(false);
      setPretokenB(pretokenBshow.toString());
      const s = z.multipliedBy(pretokenBshow);
      handleperviweSwapBtoA(s);
    } else {
      setFirstToken(true);
      setPretokenA(pretokenAshow.toString());
      const s = z.multipliedBy(pretokenAshow);
      handleperviweSwapAtoB(s);
    }
  };

  return (
    <>
      <div>
        {firstToken ? (
          <div>
            <div>
              <div className="title">
                <div className="left-aligned">Token A:</div>
                <div className="right-aligned">
                  Balance: {amounttokenA.toString()}
                </div>
              </div>
              <div className="input-swap">
                <input
                  type="text"
                  value={pretokenA}
                  onChange={handleInputChangeA}
                  placeholder="Enter Amount of Token A..."
                />
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div>
              <div className="title">
                <div className="left-aligned">Token B:</div>
                <div className="right-aligned">
                  Balance: {amounttokenB.toString()}
                </div>
              </div>
              <div className="input-swap">
                <input
                  type="text"
                  value={pretokenB}
                  onChange={handleInputChangeB}
                  placeholder="Enter Amount of Token B..."
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="button-style">
        <button onClick={() => handleSwitch()}>Switch</button>
      </div>
      <div>
        {!firstToken ? (
          <div>
            <div>
              <div>
                <div className="title">
                  <div className="left-aligned">Token A:</div>
                  <div className="right-aligned">
                    Balance: {amounttokenA.toString()}
                  </div>
                </div>
                <div className="input-swap">
                  <input
                    type="text"
                    disabled="true"
                    value={pretokenAshow.toString()}
                    onChange={handleInputChangeA}
                    placeholder="Enter Amount of Token A..."
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div>
              <div className="title">
                <div className="left-aligned">Token B:</div>
                <div className="right-aligned">
                  Balance : {amounttokenB.toString()}
                </div>
              </div>
              <div className="input-swap">
                <input
                  type="text"
                  disabled="true"
                  value={pretokenBshow.toString()}
                  onChange={handleInputChangeB}
                  placeholder="Enter Amount of Token B..."
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <div>
        <div className="button-style">
          <button
            onClick={() =>
              firstToken ? handleSwapAtoB(pretokenA) : handleSwapBtoA(pretokenB)
            }
          >
            <div>
              Swap {firstToken ? pretokenA.toString() : pretokenB.toString()}
              {firstToken ? " A " : " B "}
              to{" "}
              {firstToken ? pretokenBshow.toString() : pretokenAshow.toString()}
              {!firstToken ? " A " : " B "}
            </div>
          </button>
        </div>
      </div>
    </>
  );
}

export default Swap;
