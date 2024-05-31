import { useEffect } from "react"
import { useConnect } from "wagmi"

export default function ConnectWalletModal({ setIsOpen }: { setIsOpen: any }) {
  const { connectors, connect, isSuccess } = useConnect()

  useEffect(() => {
    if (isSuccess) {
      setIsOpen(false)
    }
  }, [isSuccess])
  return (
    <div className="absolute w-full h-full top-0 left-0 bg-black/30 flex items-center justify-center z-[9999]">
      <div className="w-[500px] h-fit py-2 bg-white shadow-md rounded-lg">
        <div className="flex items-center justify-between p-2 md:p-3 border-b rounded-t dark:border-gray-600">
          <h3 className="text-xl font-semibold text-gray-900 ">Connect wallet</h3>
          <button
            onClick={() => setIsOpen((prev: boolean) => !prev)}
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="static-modal"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <div className="flex flex-col  py-5">
          {connectors.map((connector) => (
            <button
              className="w-full cursor-pointer py-2"
              key={connector.uid}
              onClick={() => connect({ connector })}
              type="button"
            >
              {connector.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
