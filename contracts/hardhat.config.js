require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL
const INFURA_RPC_URL = process.env.INFURA_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "Your etherscan API key"
const LINEASCAN_API_KEY = process.env.LINEASCAN_API_KEY || "Your lineascan API key"

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.24",
      }
    ],
  },
  networks: {
      localhost: {
          chainId: 31337,
      },
      sepolia: {
          url: SEPOLIA_RPC_URL !== undefined ? SEPOLIA_RPC_URL : "",
          accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
          //   accounts: {
          //     mnemonic: MNEMONIC,
          //   },
          chainId: 11155111,
      },
      linea_sepolia: {
        url: INFURA_RPC_URL !== undefined ? INFURA_RPC_URL : "",
        accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
      },
  },
  etherscan: {
      // yarn hardhat verify --network <NETWORK> <CONTRACT_ADDRESS> <CONSTRUCTOR_PARAMETERS>
      apiKey: {
          // npx hardhat verify --list-networks
          sepolia: ETHERSCAN_API_KEY,
          linea_sepolia: LINEASCAN_API_KEY,
      },
      customChains: [
        {
          network: "linea_sepolia",
          chainId: 59141,
          urls: {
            apiURL: "https://explorer.linea.build/api",
            browserURL: "https://sepolia.lineascan.build/address"
          }
        }
      ]
  },
};
