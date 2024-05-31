import { http, createConfig } from "wagmi"
import { mainnet, optimismSepolia, sepolia, localhost } from "wagmi/chains"
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors"

const isDevelopment = import.meta.env.VITE_ENV === "DEVELOPMENT"

export const config = createConfig({
  chains: [mainnet, sepolia, optimismSepolia, localhost],
  connectors: [
    injected(),
    coinbaseWallet({ appName: "Create Wagmi" }),
    walletConnect({ projectId: import.meta.env.VITE_WC_PROJECT_ID }),
  ],
  transports: {
    [optimismSepolia.id]: http(),
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [localhost.id]: http(),
  },
})

declare module "wagmi" {
  interface Register {
    config: typeof config
  }
}
