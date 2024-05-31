import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./views/home"
import DashBoard from "./views/dashboard"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="dashboard" element={<DashBoard />} />
    </Route>,
  ),
)

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose())
}

function App() {
  return <RouterProvider router={router} />
}
export default App

{
  /* <div>
  <h2 className="text-3xl">Account</h2>

  <div>
    status: {account.status}
    <br />
    addresses: {JSON.stringify(account.addresses)}
    <br />
    chainId: {account.chainId}
  </div>

  {account.status === "connected" && (
    <button type="button" onClick={() => disconnect()}>
      Disconnect
    </button>
  )}
</div>

<div>
  <h2>Connect</h2>
  {connectors.map((connector) => (
    <button key={connector.uid} onClick={() => connect({ connector })} type="button">
      {connector.name}
    </button>
  ))}
  <div>{status}</div>
  <div>{error?.message}</div>
</div> */
}
