import "./App.css";

import { useState, useEffect } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
//import SwapToken from "./components/SwapComponent.js";

let injectedProvider = false;

if (typeof window.ethereum !== "undefined") {
  injectedProvider = true;
  console.log(window.ethereum);
}

//const isMetaMask = injectedProvider ? window.ethereum.isMetaMask : false;

function App() {
  // const [hasProvider, setHasProvider] = useState(null);
  const initialState = { accounts: [] };
  const [wallet, setWallet] = useState(initialState);

  useEffect(() => {
    const refreshAccounts = (accounts) => {
      if (accounts.length > 0) {
        updateWallet(accounts);
      } else {
        // if length 0, user is disconnected
        setWallet(initialState);
      }
    };

    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true });
      //console.log(provider);
      // setHasProvider(Boolean(provider)); // transform provider to true or false
      if (provider) {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        refreshAccounts(accounts);
        window.ethereum.on("accountsChanged", refreshAccounts);
      }
    };

    getProvider();
    return () => {
      window.ethereum?.removeListener("accountsChanged", refreshAccounts);
    };
  }, []);

  const updateWallet = async (accounts) => {
    setWallet({ accounts });
  };

  const handleConnect = async () => {
    let accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    updateWallet(accounts);
  };

  return (
    <div className="App">
      <h2>Injected Provider {injectedProvider ? "DOES" : "DOES NOT"} Exist</h2>
      {window.ethereum?.isMetaMask && wallet.accounts.length < 1 && (
        <button onClick={handleConnect}>Connect MetaMask</button>
      )}

      {wallet.accounts.length > 0 && (
        <div>
          Wallet Accounts: {wallet.accounts[0]}
          {/* <SwapToken account={wallet.accounts[0]} /> */}
        </div>
      )}
    </div>
  );
}

export default App;
