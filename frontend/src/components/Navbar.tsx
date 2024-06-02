import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import ConnectWalletModal from "./modals/ConnectWallet"
import { useAccount, useDisconnect } from "wagmi"
import { toast } from "react-toastify"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const account = useAccount()
  const { disconnect } = useDisconnect()

  // effect
  useEffect(() => {
    async function checkChainId() {
      if (account?.isDisconnected) return
      if (account?.chainId !== 59141) {
        toast.error("Please switch your network in wallet to Linea Sepolia", {
          position: "top-center",
          autoClose: 50000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }
    }
    checkChainId()
  }, [account?.chainId])

  return (
    <nav className="flex flex-row px-4 w-full h-fit min-h-16 justify-between items-center">
      {isOpen && <ConnectWalletModal setIsOpen={setIsOpen} />}
      <div className="flex flex-row gap-1  md:gap-9 text-base items-center font-medium text-gray-900">
        <Link to="/">
          <img src="/logo.png" className="md:w-[130px] md:h-[30px] w-[90px] h-[20px] " />
        </Link>
        {account?.isConnected && <Link to="/dashboard">Dashboard</Link>}
      </div>
      {account.isConnected ? (
        <button
          onClick={() => disconnect()}
          className="px-2 py-2.5 border border-gray-500 rounded-lg hover:bg-gray-50 active:opacity-65 "
        >
          Disconnect
        </button>
      ) : (
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="px-2 py-2.5 border border-gray-500 rounded-lg hover:bg-gray-50 active:opacity-65 "
        >
          Connect wallet
        </button>
      )}
    </nav>
  )
}
