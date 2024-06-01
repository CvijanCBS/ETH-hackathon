import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useAccount, useWriteContract } from "wagmi"
import { appConfig } from "../utils/config"
import { abi } from "../abi/Manufacturer.json"
import { Spinner } from "../utils/icons"

type FormDataType = {
  vin?: string | undefined
  oil_filter?: boolean | undefined
  air_filter?: boolean | undefined
  fuel_filter?: boolean | undefined
  cabin_filter?: boolean | undefined
  date?: string | undefined
  mileage?: number | undefined
}

type FormDataError = {
  vin?: string | undefined
  date?: string | undefined
  mileage?: string | undefined
}
export default function ServiceAdd() {
  const [formData, setFormData] = useState<FormDataType>({})
  const [formError, setFormError] = useState<FormDataError>({})

  //hooks
  const account = useAccount()
  const { writeContract, error, isPending, isSuccess, status, isError } = useWriteContract()

  //functions
  const handleSubmit = (e: any) => {
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
      if (!formData?.date)
        return setFormError((prev) => ({ ...prev, date: "Date is required" }))
    if (formData?.mileage && formData?.mileage < 0)
      return setFormError((prev) => ({ ...prev, mileage: "Actual mileage can not be lower than 0" }))

    // Send data in contract call
    writeContract({
      abi,
      address: `0x${appConfig.serviceContractAddress}`,
      functionName: "writeServiceData",
      args: [
        formData?.vin,
        [formData?.air_filter && 'AIR_FILTER', 
          formData?.oil_filter && 'OIL_FILTER',
          formData?.fuel_filter && 'FUEL_FILTER',
          formData?.cabin_filter && 'CABIN_FILTER',
          formData?.air_filter && 'AIR_FILTER',
        ],
        // new Date(formData?.production_date).getTime(),
        formData?.mileage || 0,
      ],
    })
    setFormError({})
    setFormData({})
  }

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setFormError({ ...formError, [e.target.name]: e.target.value })
  }

  const handleCheckBoxChange = (e: any) => {
    console.log(e)
    setFormData({ ...formData, [e.target.name]: e.target.checked })
    setFormError({ ...formError, [e.target.name]: e.target.checked })
  }

  // Effects
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
      className="w-full px-3 text-gray-900 h-fit min-h-[500px] gap-6 flex flex-col border-b-[1px] border-b-gray-500 pb-5"
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
        <h2 className="mb-2 mt-3">Select what is done:</h2>

        <div className="flex items-center me-4">
          <input
            checked={formData?.oil_filter || false}
            type="checkbox"
            name="oil_filter"
            onChange={(e) => handleCheckBoxChange(e)}
            className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"
          />
          <label className="ms-2 text-sm font-medium text-gray-900 ">Oil Filter</label>
        </div>
        <div className="flex items-center me-4">
          <input
            checked={formData?.air_filter || false}
            type="checkbox"
            name="air_filter"
            onChange={(e) => handleCheckBoxChange(e)}
            className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"
          />
          <label className="ms-2 text-sm font-medium text-gray-900 ">Air Filter</label>
        </div>
        <div className="flex items-center me-4">
          <input
            checked={formData?.fuel_filter || false}
            type="checkbox"
            name="fuel_filter"
            onChange={(e) => handleCheckBoxChange(e)}
            className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"
          />
          <label className="ms-2 text-sm font-medium text-gray-900 ">Fuel Filter</label>
        </div>
        <div className="flex items-center me-4">
          <input
            checked={formData?.cabin_filter || false}
            type="checkbox"
            name="cabin_filter"
            onChange={(e) => handleCheckBoxChange(e)}
            className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"
          />
          <label className="ms-2 text-sm font-medium text-gray-900 ">Cabin Filter</label>
        </div>
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900">Enter date</label>
        {formError?.date && <p className="text-red-600 text-base">{formError?.date}</p>}
        <input
          onChange={(e) => handleChange(e)}
          name={"date"}
          value={formData?.date || ""}
          type="date"
          id="small-input"
          className="block max-w-[500px] w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900">Enter current mileage</label>
        {formError?.mileage && <p className="text-red-600 text-base">{formError?.mileage}</p>}
        <input
          onChange={(e) => handleChange(e)}
          name={"mileage"}
          value={formData?.mileage || ""}
          type="number"
          id="small-input"
          className="block max-w-[500px] w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <button
        type={"submit"}
        className="w-full max-w-[500px] py-2.5 px-2 bg-blue-700 rounded-lg text-white active:opacity-70"
      >
        {isPending ? <Spinner className={"w-6 h-6"} /> : `Add service`}
      </button>
    </form>
  )
}
