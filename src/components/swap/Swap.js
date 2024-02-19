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
  const [pretokenA, setPretokenA] = useState(0);

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
  /* useEffect(() => {
    initWeb3();
  }, []);*/

  // Use useEffect to watch for changes in the 'data' state
  useEffect(() => {
    // This block will be executed whenever 'data' changes
    console.log("pretokenB changed:", pretokenB);
    // setPretokenB(pretokenB);
  }, [pretokenB]);
  useEffect(() => {
    initWeb3();
    // This block will be executed whenever 'account' changes
    console.log("swap account changed:", account);
  }, [account]);
  useEffect(() => {
    // This block will be executed whenever 'account' changes
    console.log("swap swapContract changed:", swapContract);
  }, [swapContract]);

  /*useEffect(() => {
      // This block will be executed whenever 'data' changes
      console.log("pretokenA changed:", pretokenA);
      //setPretokenB(pretokenB);
    }, [pretokenA]);*/
  const handleContractInteraction = async () => {
    // Example function call on your contract
    try {
      // Example: Call a read function
      const result = await swapContract.methods.getK().call({ from: account });
      console.log("Result from swapContract:", result);

      // Example: Call a write function
      // await contract.methods.someWriteFunction().send({ from: account });
    } catch (error) {
      console.error("Error while interacting with contract: ", error);
    }
  };

  const handleperviweSwapAtoB = async (amountTokenA) => {
    // Example function call on your contract
    try {
      // Example: Call a read function
      const result = await swapContract.methods
        .perviewSwapAtoB(amountTokenA)
        .call({ from: account });
      setPretokenB(result);
      console.log("Result from contract handleperviweSwapAtoB:", pretokenB);

      // Example: Call a write function
      // await contract.methods.someWriteFunction().send({ from: account });
    } catch (error) {
      console.error("Error while handleperviweSwapAtoB: ", error);
    }
  };

  const handlebalanceOfA = async (amountTokenA) => {
    // Example function call on your contract
    try {
      const bl = await tokenAContract.methods
        .balanceOf(account)
        .call({ from: account });
      console.log(" balanceOf token A:", bl);
    } catch (error) {
      console.error("Error while balanceOf token A: ", error);
    }
  };

  const handlebalanceOfB = async (amountTokenA) => {
    // Example function call on your contract
    try {
      const bl = await tokenBContract.methods
        .balanceOf(account)
        .call({ from: account });
      console.log(" balanceOf token B:", bl);
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
      if (al > 0) {
        // Example: Call a read function
        const result = await swapContract.methods
          .swapAtoB(amountTokenA)
          .send({ from: account });
        setPretokenB(result);
        console.log("Result from contract handleSwapAtoB:", pretokenB);
      }
      // Example: Call a write function
      // await contract.methods.someWriteFunction().send({ from: account });
    } catch (error) {
      console.error("Error while handleSwapAtoB: ", error);
    }
  };

  const handleInputChangeA = (event) => {
    setPretokenA(event.target.value);
    setPretokenB(0);
    // handleperviweSwapAtoB(event.target.value);
  };

  return (
    swapContract && (
      <div>
        <button onClick={handleContractInteraction}>get K</button>
        <br />
        <button onClick={() => handlebalanceOfA()}>blance token A</button>
        <br />
        <button onClick={() => handlebalanceOfB()}>blance token B</button>
        <br />
        <div>
          <input
            type="text"
            value={pretokenA}
            onChange={handleInputChangeA}
            placeholder="Enter some test Token A..."
          />

          <button onClick={() => handleperviweSwapAtoB(pretokenA)}>
            preview Swap {pretokenA} token A to B
          </button>
          <button onClick={() => handleSwapAtoB(pretokenA)}>
            Swap {pretokenA} token A to B
          </button>

          {pretokenB !== 0 && (
            <p>
              preview Swap {pretokenA} token A to B :{pretokenB.toString()}
            </p>
          )}
        </div>
      </div>
    )
  );
}

export default Swap;
