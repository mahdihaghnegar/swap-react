import React, { useState, useEffect } from "react";
import Web3 from "web3";
import "./Wallet.css";
function WalletButton({ change, showWallet }) {
  const [connected, setConnected] = useState(false);
  const [sepolia, setSepolia] = useState(false);
  const [chainId, setChainId] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  async function initWeb3() {
    setConnected(false);
    setSepolia(false);
    change(null, false);
    if (window.ethereum) {
      try {
        // Request account access if needed
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const web3Instance = new Web3(window.ethereum);

        // Get the currently selected account from MetaMask
        const accounts = await web3Instance.eth.getAccounts();
        setSepolia(isSepolia());
        setConnected(true);
        setWalletAddress(accounts[0]);
        change(accounts[0], sepolia);
      } catch (error) {
        console.error("Error while connecting to MetaMask: ", error);
      }
    } else {
      setWalletAddress(null);

      console.error("MetaMask extension not detected");
    }
  }
  useEffect(() => {
    initWeb3();
  }, [walletAddress]);

  useEffect(() => {
    const handleAccountChange = async (accounts) => {
      if (!accounts.length) {
        // Check if account is disconnected
        console.log("MetaMask account disconnected");
        //closeDApp(); // Call your dApp closing function
        setWalletAddress(null);
        change(null, false);
      }
      window.location.reload();
      //  setSepolia(isSepolia());
    };

    window.ethereum.on("accountsChanged", handleAccountChange);

    //window.ethereum.on("chainChanged", handler: (chainId: string) => void);

    const handlechainIdChange = async (chainId) => {
      if (!chainId.length) {
        // Check if account is disconnected
        console.log("MetaMask chainId not Found");
        //closeDApp(); // Call your dApp closing function
        setWalletAddress(null);
        change(null, false);
      } else {
        window.location.reload();
        console.log("chainid after reload:", chainId);
        setChainId(chainId);
      }
    };

    window.ethereum.on("chainChanged", handlechainIdChange);

    return () => {
      window.ethereum.removeListener("accountsChanged", handleAccountChange);
      window.ethereum.removeListener("chainChanged", handlechainIdChange);
    };
  }, []);

  const isSepolia = () => {
    const { ethereum } = window;
    if (!ethereum) {
      return false;
    }
    const chainId = ethereum.chainId;
    console.log("chainId :", chainId);
    return chainId == 11155111; //0xaa36a7; //
  };

  /*useEffect(() => {
    console.log("walletAddress account changed:", walletAddress);
  }, [walletAddress]);*/

  return (
    <div>
      {showWallet ? (
        <div>
          {!sepolia && <p>Please switch to Sepolia on MetaMask!</p>}
          {!connected && (
            <button className="panel-button" onClick={initWeb3}>
              Connect to Wallet
            </button>
          )}
        </div>
      ) : (
        <div>
          {connected ? (
            <p> wallet: {walletAddress}</p>
          ) : (
            <button className="panel-button" onClick={initWeb3}>
              Connect to Wallet
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default WalletButton;
