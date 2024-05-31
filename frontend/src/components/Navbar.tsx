import { useState } from "react";
import { Link } from "react-router-dom";
import ConnectWalletModal from "./modals/ConnectWallet";
import { useAccount, useDisconnect } from "wagmi";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const account = useAccount()
    const {disconnect} = useDisconnect()

    return( 
    <nav className="flex flex-row px-4 w-full h-fit min-h-16 justify-between items-center">
        {isOpen && <ConnectWalletModal setIsOpen={setIsOpen} />}
        <div className="flex flex-row gap-9 text-base items-center font-medium text-gray-900">    
        <Link to="/"><img src='/logo.png' className="w-[130px] h-[30px]" /></Link>
        <Link to="/dashboard">Dashboard</Link>
        </div>
        {account.isConnected ? <button onClick={()=> disconnect() } className="px-2 py-2.5 border border-gray-500 rounded-lg hover:bg-gray-50 active:opacity-65 ">Disconnect</button> : <button onClick={()=> setIsOpen((prev)=> !prev)} className="px-2 py-2.5 border border-gray-500 rounded-lg hover:bg-gray-50 active:opacity-65 ">Connect wallet</button>}
    </nav>

    )
}