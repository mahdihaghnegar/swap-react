import React, { useState, useEffect } from "react";
import WalletButton from "./components/wallet/Wallet";
import Swap from "./components/swap/Swap";
import "./App.css";

const App = () => {
  const [account, setAccount] = useState(null);

  function handleChange(address) {
    console.log("handle setAccount changed:", address);
    setAccount(address);
  }
  useEffect(() => {
    // This block will be executed whenever 'account' changes
    console.log("app account changed:", account);
  }, [account]);

  return (
    <div className="center">
      <div className="left-aligned">
        <h1>Swap React App</h1>
        <h4>Trade tokens A & B in an instance</h4>
      </div>
      {account && <Swap account={account} />}

      <WalletButton change={handleChange} />
    </div>
  );
};

export default App;
