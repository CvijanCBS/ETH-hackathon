import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Buffer } from "buffer"
import React from "react"
import ReactDOM from "react-dom/client"
import { WagmiProvider } from "wagmi"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App.tsx"
import { config } from "./wagmi.ts"

import "./index.css"

globalThis.Buffer = Buffer


const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        <App/>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
)
