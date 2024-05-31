import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="bg-gray-50/80 py-5 w-full px-2 overflow-y-auto h-[calc(100vh-64px)]">
        <Outlet />
      </div>
    </>
  )
}
