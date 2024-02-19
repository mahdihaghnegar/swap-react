require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
const ALCHEMY_API_KEY = "Lf0iLbQI4-HdDJsdbrTq1_IWuoueOkel";
const SEPOLIA_PRIVATE_KEY =
  "910c0cea2a4f20d7cb5b1f51391e2b031ce977e73637f84516e0e0a0fbffa3bd";

module.exports = {
  solidity: "0.8.20",
  paths: {
    artifacts: "./src/artifacts", //for import in react
  },
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY],
    },
  },
};
