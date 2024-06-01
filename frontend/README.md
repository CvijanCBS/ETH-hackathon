# VHistory frontend

## Requirements to run:

In order to run this project you would need to populate .end file with the following data: 

```
VITE_ENV=DEVELOPMENT 

VITE_MANUFACTURER_CONTRACT_ADDRESS=contract address without 0x 
VITE_SERVICE_CONTRACT_ADDRESS=contract address without 0x
VITE_CAR_OWNER_CONTRACT_ADDRESS=contract address without 0x
```

## Run locally:

```bash
npm install
# Install the dependencies
```

```bash
npm run dev
# Starts development server on 5173 port
```

## Code style and linting:

```bash
npm run lint
# Performs checks on the code
```

```bash
npm run format
# Formats the code
```

## Deploy the project:

```bash
npm run build
# Builds the project
```
