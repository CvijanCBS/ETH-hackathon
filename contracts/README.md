# Getting Started:

## Prerequisites:

Node.js 20.9.0 and npm 10.1.0 installed on your system.
[Optional] A code editor or IDE with Solidity support (e.g., Visual Studio Code, Remix).

## Clone the Repository:

```
git clone https://github.com/CvijanCBS/ETH-hackathon.git
cd ETH-hackathon
```

## Install Dependencies:

```
npm install  # or yarn install
```

## Environment Setup:

Create a file named .env in the project root directory.

Copy the contents from .env.example (provided below) into .env.
Replace the placeholders with your actual values (e.g., private keys, network URLs).

Replace with your actual values
```
PRIVATE_KEY = 
ETHERSCAN_API_KEY = 
SEPOLIA_RPC_URL = 
INFURA_RPC_URL = 
LINEASCAN_API_KEY = 
```

# Using Hardhat:

Compile Contracts:

```
npx hardhat compile
```

Deploy Contracts:

```
npx hardhat ignition deploy ignition/modules/VHistory.js
```

This will deploy your contracts to a local Hardhat network. You can interact with them using the provided Hardhat development tools.
Deploy Contracts (Mainnet/Testnet):

Refer to Hardhat documentation for specific deployment instructions tailored to your chosen network and security best practices. This often involves using tools like MetaMask or dedicated deployment scripts.
Environment Variables Example (.env.example):
