import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useAccount, useWriteContract } from "wagmi"
import { abi } from "../abi/Manufacturer.json"
import { appConfig } from "../utils/config"
import { isAddress } from "viem"
import { Spinner } from "../utils/icons"

type FormDataType = {
  vin?: string | undefined
  actual_mileage?: number | undefined
  production_date?: string | undefined
  owner?: string | undefined
}

type FormErrorType = {
  vin?: string | undefined
  actual_mileage?: string | undefined
  production_date?: string | undefined
  owner?: string | undefined
}

export default function ManufacturerTab() {
  const [formData, setFormData] = useState<FormDataType>({})
  const [formError, setFormError] = useState<FormErrorType>({})

  // Hooks
  const account = useAccount()
  const { writeContract, error, isPending, isSuccess, status, isError } = useWriteContract()

  const handleSubmit = (e: any) => {
    e.preventDefault()
    setFormError({})
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
      return setFormError((prev) => ({ ...prev, production_date: "Production date is required" }))
    if (formData?.actual_mileage && formData?.actual_mileage < 0)
      return setFormError((prev) => ({ ...prev, actual_mileage: "Actual mileage can not be lower than 0" }))
    if (!formData?.owner) return setFormError((prev) => ({ ...prev, owner: "Owner is required" }))
    if (!isAddress(formData?.owner))
      return setFormError((prev) => ({ ...prev, owner: "Owner address is not correct format" }))
    // Send date in contract call
    writeContract({
      abi,
      address: `0x${appConfig.manufacturerContractAddress}`,
      functionName: "produceVehicle",
      args: [
        formData?.vin,
        new Date(formData?.production_date).getTime(),
        formData?.owner,
        formData?.actual_mileage || 0,
      ],
    })
    setFormError({})
    setFormData({})
  }

  const change_owner = () => {
    if (!formData?.owner) return setFormError((prev) => ({ ...prev, owner: "Owner is required" }))
    if (!isAddress(formData?.owner))
      return setFormError((prev) => ({ ...prev, owner: "Owner address is not correct format" }))
    writeContract({
      abi,
      address: `0x${appConfig.manufacturerContractAddress}`,
      functionName: "approveOwnership",
      args: [formData?.vin, formData?.owner],
    })
    setFormError({})
    setFormData({})
  }

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setFormError({ ...formError, [e.target.name]: "" })
  }

  // use Effects
  useEffect(() => {
    async function check() {
      if (isSuccess)
        return toast.success(`Successful`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      if (isError)
        return toast.error(`Something went wrong ${error.message}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        console.error(error);
    }
    check()
  }, [isError, error, isSuccess])
  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="w-full px-3 text-gray-900 h-fit min-h-[500px] gap-6 flex flex-col"
    >
      <h1 className="font-medium text-lg mb-6">Add car's service info</h1>
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
        <label className="block mb-2 text-sm font-medium text-gray-900">Enter current mileage</label>
        <input
          onChange={(e) => handleChange(e)}
          name={"actual_mileage"}
          value={formData?.actual_mileage || ""}
          type="number"
          id="small-input"
          className="block max-w-[500px] w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900">{`Enter new owner`}</label>
        {formError?.owner && <p className="text-red-600 text-base">{formError?.owner}</p>}
        <input
          onChange={(e) => handleChange(e)}
          name={"owner"}
          value={formData?.owner || ""}
          type="text"
          id="small-input"
          className="block max-w-[500px] w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="w-full justify-start items-center max-w-[500px] flex md:flex-row flex-col gap-3">
        <button
          type={"submit"}
          disabled={isPending || !formData?.vin}
          className={` w-full max-w-[500px] py-2.5 px-2 bg-blue-700 rounded-lg text-white active:opacity-70 ${
            isPending || (!formData?.vin && "bg-gray-200")
          }`}
        >
          {isPending ? <Spinner className={"w-6 h-6"} /> : `Add new car`}
        </button>
        <button
          type="button"
          onClick={() => change_owner()}
          disabled={isPending || !formData?.vin}
          className={` w-full max-w-[500px] py-2.5 px-2 bg-blue-700 rounded-lg text-white active:opacity-70 ${
            isPending || (!formData?.vin && "bg-gray-200")
          }`}
        >
          {isPending ? <Spinner className={"w-6 h-6"} /> : `Change Owner`}
        </button>
      </div>
    </form>
  )
}
