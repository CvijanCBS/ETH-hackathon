import { useEffect, useState } from "react"
import { useAccount, useReadContract, useWriteContract } from "wagmi"
import { abi as manufacturerAbi } from "../abi/Manufacturer.json"
import { abi as serviceAbi } from "../abi/CarShops.json"
import { appConfig } from "../utils/config"
import { toast } from "react-toastify"
import { Spinner } from "../utils/icons"
import { isAddress } from "viem"

export default function Home() {
  const [vin, setVin] = useState("")
  const [vinError, setVinError] = useState("")
  const [services, setServices] = useState<any>()
  const [inspectingCarInfo, setInspectingCarInfo] = useState(false)
  const [ownerAddress, setOwnerAddress] = useState("")
  const [ownerAddressError, setOwnerAddressError] = useState("")
  const [isOwner, setIsOwner] = useState(false)

  //hooks
  const account = useAccount()
  const { writeContract, error, isPending, isSuccess, status, isError } = useWriteContract()

  const vehicleData = useReadContract({
    abi: manufacturerAbi,
    address: `0x${appConfig.manufacturerContractAddress}`,
    functionName: "getVehicleData",
    args: [vin],
  })

  const serviceData = useReadContract({
    abi: serviceAbi,
    address: `0x${appConfig.serviceContractAddress}`,
    functionName: "getVehicleServiceData",
  })

  async function handleSubmit(e: any) {
    e.preventDefault()
    if (account?.isDisconnected) {
      setVinError("Connect your account first")
      return
    }
    if (!vin) {
      setVinError("VIN is required")
      return
    }
    if (vin.length !== 17) {
      setVinError("VIN must be 17 characters long")
      return
    }
    setVinError("")
    await vehicleData.refetch()
    // @ts-ignore
    if (vehicleData?.data?.productionDate !== 0n) {
      setInspectingCarInfo(true)
    } else {
      setInspectingCarInfo(false)
      toast.info("Report not found for that VIN", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

  async function checkOwner() {
    console.log("checking")
    setOwnerAddressError("")
    if (account?.isDisconnected) {
      setOwnerAddressError("Connect your account first")
      return
    }
    if (!ownerAddress) {
      setOwnerAddressError("Address is required")
      return
    }
    if (!isAddress(ownerAddress)) {
      setOwnerAddressError("Incorrect address type")
      return
    }
    setOwnerAddressError("")
    writeContract({
      abi: manufacturerAbi,
      address: `0x${appConfig.manufacturerContractAddress}`,
      functionName: "verifyData",
      args: [vin, ownerAddress],
    })
    setOwnerAddress("")
  }

  const date = (bigDate: any) => {
    // @ts-ignore
    let dat: any = new Date(Number(bigDate) * 1000)
    dat = dat.toDateString()
    return dat
  }

  // effects
  useEffect(() => {
    async function getOnlyNeededServices() {
      if (serviceData?.data) {
        const data = serviceData?.data
        // @ts-ignore
        const onlyNeededServices = data.filter((service: any) => {
          if (service[0] === vin) {
            return service
          }
        })
        setServices(onlyNeededServices)
      }
    }
    getOnlyNeededServices()
  }, [serviceData?.data])

  useEffect(() => {
    async function check() {
      if (isSuccess)
        return toast.success(`Successfully validated owner`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      if (isError)
        return toast.error(`Not valid owner address`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      console.error(error)
    }
    check()
  }, [isError, error, isSuccess])

  console.log(serviceData?.data, services)
  return (
    <div className="w-full min-h-full flex items-center justify-center">
      {/* @ts-ignore */}
      {inspectingCarInfo && vehicleData?.data?.productionDate !== 0n ? (
        <div className="w-full bg-white rounded-lg shadow-md py-5 px-4 ">
          <div className="flex flex-col gap-5">
            <h1 className="text-gray-900 font-bold text-2xl mb-4">Car's info</h1>
            <p className="text-gray-600 font-medium">
              {" "}
              <span className="text-gray-900 font-bold">VIN:</span> {` ${vin}`}
            </p>
            <img src="/carInspect.jpeg" className="w-full max-w-[500px] aspect-auto rounded-lg" alt="car" />
            <div className="w-full max-w-[500px] flex flex-row justify-between items-center">
              <p className="text-base font-medium text-gray-900">Production date:</p> {/* @ts-ignore */}
              <p className="text-base text-gray-500">{date(vehicleData?.data?.productionDate)}</p>{" "}
            </div>
            <div className="w-full max-w-[500px] flex flex-row justify-between items-center">
              <p className="text-base font-medium text-gray-900">Initial mileage:</p> {/* @ts-ignore */}
              <p className="text-base text-gray-500">{Number(vehicleData?.data?.initialMileage)}</p>{" "}
            </div>
            <div className="w-full max-w-[500px] flex flex-row justify-between items-center">
              <p className="text-base font-medium text-gray-900">Previous mileage:</p> {/* @ts-ignore */}
              <p className="text-base text-gray-500">{Number(vehicleData?.data?.initialMileage)}</p>{" "}
            </div>
            <div className="w-full max-w-[500px] flex flex-row justify-between items-center">
              <p className="text-base font-medium text-gray-900">Current mileage:</p> {/* @ts-ignore */}
              <p className="text-base text-gray-500">{Number(vehicleData?.data?.initialMileage)}</p>{" "}
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-gray-900 font-medium">Check ownership:</p>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">Enter owner's address</label>
                {ownerAddressError && <p className="text-red-600 text-base">{ownerAddressError}</p>}
                <input
                  onChange={(e) => setOwnerAddress(e.target.value)}
                  value={ownerAddress || ""}
                  type="text"
                  id="small-input"
                  className="block max-w-[500px] w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button
                type="button"
                onClick={() => checkOwner()}
                className={`flex items-center justify-center w-full max-w-[500px] py-2.5 px-2 bg-blue-700 rounded-lg text-white active:opacity-70 ${
                  isPending || !ownerAddress ? "bg-gray-200" : ""
                }`}
              >
                {isPending ? <Spinner className={"w-6 h-6"} /> : `Check`}
              </button>
            </div>
          </div>
          {/* @ts-ignore */}
          {serviceData?.data?.length > 0 && (
            <div className="flex flex-col gap-5 mt-9">
              <h1 className="text-gray-900 font-bold text-2xl mb-3">Car's services info</h1>
              {services.map((serviceData: any, index: number) => {
                ;<div key={index}>
                  <div className="w-full max-w-[500px] flex flex-row justify-between items-center">
                    <p className="text-base font-medium text-gray-900">Date:</p> {/* @ts-ignore */}
                    <p className="text-base text-gray-500">{date(serviceData[1])}</p>{" "}
                  </div>
                  <div className="w-full max-w-[500px] flex flex-row justify-between items-center">
                    <p className="text-base font-medium text-gray-900">Car's mileage:</p> {/* @ts-ignore */}
                    <p className="text-base text-gray-500">{Number(serviceData[3])}</p>{" "}
                  </div>
                </div>
              })}
            </div>
          )}
        </div>
      ) : (
        <form onSubmit={(e) => handleSubmit(e)} className="w-[500px] bg-white py-5 px-4 rounded-lg shadow-md">
          <h1 className="text-gray-900 font-bold text-xl mb-9">Search by VIN</h1>

          <h2 className="text-gray-500 font-medium text-base mb-6">
            {" "}
            Search any vehicle history by providing it's VIN number
          </h2>
          {vinError && <p className="text-red-600 text-base">{vinError} </p>}
          <label className="mb-2 text-sm font-medium text-gray-900 sr-only ">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              onChange={(e) => setVin(e.target.value)}
              value={vin || ""}
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500   dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter VIN here.."
              required
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
