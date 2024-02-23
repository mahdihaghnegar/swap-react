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
  /* useEffect(() => {
    initWeb3();
  }, []);*/

  // Use useEffect to watch for changes in the 'data' state
  /*useEffect(() => {
    // This block will be executed whenever 'data' changes
    console.log("amounttokenA changed:", amounttokenA);
    // setPretokenB(pretokenB);
  }, [amounttokenA]);
  useEffect(() => {
    // This block will be executed whenever 'data' changes
    console.log("amounttokenB changed:", amounttokenB);
    // setPretokenB(pretokenB);
  }, [amounttokenB]);*/

  /*useEffect(() => {
    // This block will be executed whenever 'data' changes
    console.log("pretokenB changed:", pretokenB);
    // setPretokenB(pretokenB);
  }, [pretokenB]);*/
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

  /*useEffect(() => {
      // This block will be executed whenever 'data' changes
      console.log("pretokenA changed:", pretokenA);
      //setPretokenB(pretokenB);
    }, [pretokenA]);*/
  /*const handleContractInteraction = async () => {
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
  };*/

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
  const handleperviweSwapBtoA = async (amountTokenB) => {
    // Example function call on your contract
    try {
      // Example: Call a read function
      const result = await swapContract.methods
        .perviewSwapBtoA(amountTokenB)
        .call({ from: account });
      setPretokenB(result);
      console.log("Result from contract handleperviweSwapBtoA:", pretokenA);

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
      if (al > 0) {
        // Example: Call a read function
        const result = await swapContract.methods
          .swapAtoB(amountTokenA)
          .send({ from: account });
        setPretokenB(result);
        console.log("Result from contract handleSwapAtoB:", pretokenB);
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
      if (al > 0) {
        // Example: Call a read function
        const result = await swapContract.methods
          .swapBtoA(amountTokenB)
          .send({ from: account });
        setPretokenA(result);
        console.log("Result from contract handleSwapBtoA:", pretokenA);
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
    setPretokenB(0);
    // handleperviweSwapAtoB(event.target.value);
  };
  const handleInputChangeB = (event) => {
    setPretokenB(event.target.value);
    setPretokenA(0);
    // handleperviweSwapAtoB(event.target.value);
  };

  return (
    swapContract && (
      <div>
        {/*<button onClick={handleContractInteraction}>get K</button>
        <button onClick={() => handlebalanceOfA()}>Blance Of Token A</button>*/}
        <p>Blance of Token A {amounttokenA.toString()}</p>
        {/* <button onClick={() => handlebalanceOfB()}>Balance Of Token B</button> */}
        <p>Blance of Token B {amounttokenB.toString()}</p>
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

          <br />
          <input
            type="text"
            value={pretokenB}
            onChange={handleInputChangeB}
            placeholder="Enter some test Token B..."
          />
          <button onClick={() => handleperviweSwapBtoA(pretokenB)}>
            preview Swap {pretokenB} token B to A
          </button>
          <button onClick={() => handleSwapBtoA(pretokenB)}>
            Swap {pretokenB} token B to A
          </button>

          {pretokenA !== 0 && (
            <p>
              preview Swap {pretokenB} token B to A :{pretokenA.toString()}
            </p>
          )}
        </div>
      </div>
    )
  );
}

export default Swap;
