import React, { useState, useEffect } from "react";
import Web3 from "web3";
import "./Wallet.css";
function WalletButton({ change }) {
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  async function initWeb3() {
    setConnected(false);
    change(null);
    if (window.ethereum) {
      try {
        // Request account access if needed
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const web3Instance = new Web3(window.ethereum);

        // Get the currently selected account from MetaMask
        const accounts = await web3Instance.eth.getAccounts();

        setConnected(true);
        setWalletAddress(accounts[0]);
        change(accounts[0]);
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
        change(null);
      }
    };

    window.ethereum.on("accountsChanged", handleAccountChange);

    return () => {
      window.ethereum.removeListener("accountsChanged", handleAccountChange);
    };
  }, []);

  /*useEffect(() => {
    console.log("walletAddress account changed:", walletAddress);
  }, [walletAddress]);*/

  return (
    <div>
      {connected ? (
        <p> wallet: {walletAddress}</p>
      ) : (
        <button className="panel-button" onClick={initWeb3}>
          Connect to Wallet
        </button>
      )}
    </div>
  );
}

export default WalletButton;
