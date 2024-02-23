import React, { useState, useEffect } from "react";
import Web3 from "web3";

import swapContractABI from "../../artifacts/contracts/Swap.sol/Swap.json";
import tokenAContractABI from "../../artifacts/contracts/MyTokenA.sol/MyTokenA.json";
import tokenBContractABI from "../../artifacts/contracts/MyTokenB.sol/MyTokenB.json";

function Swap({ account }) {
  const [swapContract, setSwapContract] = useState(null);
  const [tokenAContract, setTokenAContract] = useState(null);
  const [tokenBContract, setTokenBContract] = useState(null);

  const [pretokenB, setPretokenB] = useState(0);
  const [pretokenAshow, setPretokenAshow] = useState(0);

  const [pretokenA, setPretokenA] = useState(0);
  const [pretokenBshow, setPretokenBshow] = useState(0);

  const [amounttokenB, setAmountTokenB] = useState(0);
  const [amounttokenA, setAmountTokenA] = useState(0);

  const swapcontractAddress = "0x1Cd46004642868d4BDd3610Ca3Bf16DF9F0d6CE6";

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
        .perviewSwapAtoB(amountTokenA)
        .call({ from: account });
      setPretokenBshow(result);
      console.log("Result from contract handleperviweSwapAtoB:", pretokenBshow);

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
        .perviewSwapBtoA(amountTokenB)
        .call({ from: account });
      setPretokenAshow(result);
      console.log("Result from contract handleperviweSwapBtoA:", pretokenAshow);

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
      console.log(" balanceOf token A:", bl);
      setAmountTokenA(bl);
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
      console.log(" balanceOf token B:", bl);
      setAmountTokenB(bl);
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

      const ar = await tokenAContract.methods
        .approve(swapcontractAddress, amountTokenA)
        .send({ from: account });
      console.log(" approve token A to swap contract:", ar);
      const al = await tokenAContract.methods
        .allowance(account, swapcontractAddress)
        .call({ from: account });
      console.log(" allowance Token A to swap contract:", al);
      if (al >= amountTokenA) {
        // Example: Call a read function
        const result = await swapContract.methods
          .swapAtoB(amountTokenA)
          .send({ from: account });
        //setPretokenBshow(result);
        //console.log("Result from contract handleSwapAtoB:", pretokenBshow);
        handlebalanceOfA();
        handlebalanceOfB();
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

      const ar = await tokenBContract.methods
        .approve(swapcontractAddress, amountTokenB)
        .send({ from: account });
      console.log(" approve token B to swap contract:", ar);
      const al = await tokenBContract.methods
        .allowance(account, swapcontractAddress)
        .call({ from: account });
      console.log(" allowance Token B to swap contract:", al);
      if (al >= amountTokenB) {
        // Example: Call a read function
        const result = await swapContract.methods
          .swapBtoA(amountTokenB)
          .send({ from: account });
        //setPretokenAshow(result);
        //console.log("Result from contract handleSwapBtoA:", pretokenAshow);
        handlebalanceOfA();
        handlebalanceOfB();
      }
      // Example: Call a write function
      // await contract.methods.someWriteFunction().send({ from: account });
    } catch (error) {
      console.error("Error while handleSwapAtoB: ", error);
    }
  };

  const handleInputChangeA = (event) => {
    setPretokenA(event.target.value);
    handleperviweSwapAtoB(event.target.value);
  };
  const handleInputChangeB = (event) => {
    setPretokenB(event.target.value);
    handleperviweSwapBtoA(event.target.value);
  };
  const isEmpty = (value) => {
    return value === null || value === undefined; //|| value.trim() === "";
  };

  return (
    swapContract && (
      <div>
        <div>
          <div>
            <div>
              <div>Token A:</div>
              <div>Balance: {amounttokenA.toString()}</div>
            </div>
            <div>
              <input
                type="text"
                value={pretokenA}
                onChange={handleInputChangeA}
                placeholder="Enter Amount of Token A..."
              />
            </div>
          </div>
          {!isEmpty(pretokenA) && (
            <button onClick={() => handleSwapAtoB(pretokenA)}>
              Swap {pretokenA.toString()} A to {pretokenBshow.toString()} B
            </button>
          )}
        </div>
        <hr />
        <div>
          <div>
            <div>
              <div>Token B:</div>
              <div>Balance : {amounttokenB.toString()}</div>
            </div>
            <div>
              <input
                type="text"
                value={pretokenB}
                onChange={handleInputChangeB}
                placeholder="Enter Amount of Token B..."
              />
            </div>
          </div>
          {!isEmpty(pretokenB) && (
            <button onClick={() => handleSwapBtoA(pretokenB)}>
              Swap {pretokenB.toString()} B to {pretokenAshow.toString()} A
            </button>
          )}
        </div>
      </div>
    )
  );
}

export default Swap;
