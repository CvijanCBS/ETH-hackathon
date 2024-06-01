import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useAccount, useWriteContract } from "wagmi"
import { abi } from "../abi/CarOwner.json"
import { appConfig } from "../utils/config"
import { Spinner } from "../utils/icons"
import { isAddress } from "viem"

type FormDataType = {
  vin?: string | undefined
  vin2?: string | undefined
  actual_mileage?: number | undefined
  production_date?: string | undefined
  new_owner?: string | undefined
}
type FormErrorType = {
  vin?: string | undefined
  vin2?: string | undefined
  actual_mileage?: string | undefined
  production_date?: string | undefined
  new_owner?: string | undefined
}

export default function CarOwnerTab() {
  const [formData, setFormData] = useState<FormDataType>({})
  const [formError, setFormError] = useState<FormErrorType>({})

  //hooks
  const account = useAccount()
  const { writeContract, error, isPending, isSuccess, status, isError } = useWriteContract()

  const handleSubmitRegisterCar = (e: any) => {
    e.preventDefault()
    if (account?.isDisconnected)
      return toast.error("Please connect your wallet", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    if (!formData?.vin) return setFormError((prev) => ({ ...prev, vin: "Vin is required" }))
    if (formData?.vin.length !== 17) return setFormError((prev) => ({ ...prev, vin: "Vin must be 17 characters long" }))
    if (!formData?.production_date)
      return setFormError((prev) => ({ ...prev, production_date: "Enter production date of the vehicle" }))
    if (!formData?.actual_mileage)
      return setFormError((prev) => ({ ...prev, actual_mileage: "Enter actual mileage of the vehicle" }))
    if (formData?.actual_mileage && formData?.actual_mileage < 0)
      return setFormError((prev) => ({ ...prev, actual_mileage: "Actual mileage can not be lower than 0" }))

    const date = new Date(formData?.production_date).getTime() / 1000

    // Send data in contract call
    writeContract({
      abi,
      address: `0x${appConfig.carOwnerContractAddress}`,
      functionName: "changeCarInfo",
      args: [formData?.vin, date, Number(formData?.actual_mileage)],
    })
    setFormError({})
    setFormData({})
  }

  const handleSubmitOwnership = (e: any) => {
    e.preventDefault()
    if (account?.isDisconnected)
      return toast.error("Please connect your wallet", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    if (!formData?.vin2) return setFormError((prev) => ({ ...prev, vin2: "Vin is required" }))
    if (formData?.vin2.length !== 17)
      return setFormError((prev) => ({ ...prev, vin2: "Vin must be 17 characters long" }))
    if (!formData?.new_owner) return setFormError((prev) => ({ ...prev, new_owner: "Enter new owner's address" }))
    if (!isAddress(formData?.new_owner))
      return setFormError((prev) => ({ ...prev, new_owner: "This address is not valid" }))

    // @ts-ignore
    const date = new Date(formData?.production_date).getTime() / 1000

    // Send data in contract call
    writeContract({
      abi,
      address: `0x${appConfig.carOwnerContractAddress}`,
      functionName: "requestOwnershipChange",
      args: [formData?.vin2, formData?.new_owner],
    })
    setFormError({})
    setFormData({})
  }

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setFormError({})
  }

  // Effects
  useEffect(() => {
    async function check() {
      if (isSuccess)
        return toast.success(`Successful!`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      if (isError)
        return toast.error(`Something went wrong.`, {
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

  return (
    <>
      <form
        onSubmit={(e) => handleSubmitRegisterCar(e)}
        className="w-full px-3 text-gray-900 h-fit min-h-[500px] gap-6 flex flex-col"
      >
        <h1 className="font-medium text-lg mb-6">Register car</h1>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">Enter VIN</label>
          {formError?.vin && <p className="text-red-600 text-base">{formError?.vin}</p>}
          <input
            onChange={(e) => handleChange(e)}
            name={"vin"}
            value={formData?.vin || ""}
            type="text"
            id="small-input"
            className="block max-w-[500px] w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">Enter production date</label>
          {formError?.production_date && <p className="text-red-600 text-base">{formError?.production_date}</p>}
          <input
            onChange={(e) => handleChange(e)}
            name={"production_date"}
            value={formData?.production_date || ""}
            type="date"
            id="small-input"
            className="block max-w-[500px] w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">{`Enter car's mileage`}</label>
          {formError?.actual_mileage && <p className="text-red-600 text-base">{formError?.actual_mileage}</p>}
          <input
            onChange={(e) => handleChange(e)}
            name={"actual_mileage"}
            value={formData?.actual_mileage || ""}
            type="number"
            id="small-input"
            className="block max-w-[500px] w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button
          disabled={!formData?.vin || isPending}
          type={"submit"}
          className={` flex items-center justify-center w-full max-w-[500px] py-2.5 px-2 bg-blue-700 rounded-lg text-white active:opacity-70 ${
            !formData?.vin || isPending ? "bg-gray-300" : ""
          }`}
        >
          {isPending ? <Spinner className={"w-6 h-6 fill-blue-600 animate-spin"} /> : `Add car`}
        </button>
      </form>
      <form
        onSubmit={(e) => handleSubmitOwnership(e)}
        className="w-full px-3 text-gray-900 h-fit min-h-[500px] gap-6 flex flex-col"
      >
        <h1 className="font-medium text-lg mb-6">Request ownership change</h1>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">Enter VIN</label>
          {formError?.vin2 && <p className="text-red-600 text-base">{formError?.vin2}</p>}
          <input
            onChange={(e) => handleChange(e)}
            name={"vin2"}
            value={formData?.vin2 || ""}
            type="text"
            id="small-input"
            className="block max-w-[500px] w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className=" mb-2 text-sm font-medium text-gray-900 flex flex-col">{`Enter new owner `}</label>
          {formError?.vin2 && <p className="text-red-600 text-base">{formError?.vin2}</p>}
          <input
            onChange={(e) => handleChange(e)}
            name={"new_owner"}
            value={formData?.new_owner || ""}
            type="text"
            id="small-input"
            className="block max-w-[500px] w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          disabled={!formData?.vin2 || !formData?.new_owner || isPending}
          type={"submit"}
          className={` flex items-center justify-center w-full max-w-[500px] py-2.5 px-2 bg-blue-700 rounded-lg text-white active:opacity-70 ${
            !formData?.vin2 || !formData?.new_owner || isPending ? "bg-gray-300" : ""
          }`}
        >
          {isPending ? <Spinner className={"w-6 h-6 fill-blue-600 animate-spin"} /> : `Request`}
        </button>
      </form>
    </>
  )
}
