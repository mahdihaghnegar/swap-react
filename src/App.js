import React, { useState, useEffect } from "react";
import WalletButton from "./components/wallet/Wallet";
import Swap from "./components/swap/Swap";
import "./App.css";

const App = () => {
  const [account, setAccount] = useState(null);
  const [sepolia, setSepolia] = useState(false);

  function handleChange(address, isSepolia) {
    console.log("handle setAccount changed:", address);
    console.log("handle setSepolia changed:", isSepolia);
    setAccount(address);
    setSepolia(isSepolia);
    // if (address !== null && isSepolia) window.location.reload();
  }
  useEffect(() => {
    // This block will be executed whenever 'account' changes
    // if (account === null && !sepolia) window.location.reload();
    console.log("app account changed:", account);
  }, [account, sepolia]);

  return (
    <div className="App">
      <div className="right-aligned">
        <WalletButton change={handleChange} showWallet={false} />
      </div>

      <div className="center">
        <div className="left-aligned">
          <h1>Swap React App</h1>
          <h4>Trade tokens A & B in an instance</h4>
        </div>
        <hr />
        {account && sepolia && <Swap account={account} />}
        <div className="center-connect">
          <WalletButton change={handleChange} showWallet={true} />
        </div>
      </div>
    </div>
  );
};

export default App;
