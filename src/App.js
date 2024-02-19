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
      <h1>Swap React App</h1>
      <h6>Trade tokens in an instance</h6>
      <WalletButton change={handleChange} />
      {account && <Swap account={account} />}
    </div>
  );
};

export default App;
