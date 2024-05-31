import { useState } from "react"
import { toast } from "react-toastify"
import { useAccount } from "wagmi"

type FormDataType = {
  vin?: string | undefined
  actual_mileage?: number | undefined
  production_date?: string | undefined
  owner?: string | undefined
}

export default function ManufacturerTab() {
  const [formData, setFormData] = useState<FormDataType>({})
  const [formError, setFormError] = useState({})

  const account = useAccount()

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
    setFormError({})
    setFormData({})
  }

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setFormError({ ...formError, [e.target.name]: e.target.value })
  }

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="w-full px-3 text-gray-900 h-fit min-h-[500px] gap-6 flex flex-col"
    >
      <h1 className="font-medium text-lg mb-6">Add car's service info</h1>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900">Enter VIN</label>
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
        <input
          onChange={(e) => handleChange(e)}
          name={"production_date"}
          value={formData?.production_date || ""}
          type="date"
          id="small-input"
          className="block max-w-[500px] w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      {/* <div>
         <label  className="block mb-2 text-sm font-medium text-gray-900">Enter current mileage</label>
         <input onChange={(e) => handleChange(e)} name={'actual_mileage'} value={formData?.actual_mileage || ''} type="number" id="small-input" className="block max-w-[500px] w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500"/>
        </div> */}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900">{`Enter new owner (leave empty if new car)`}</label>
        <input
          onChange={(e) => handleChange(e)}
          name={"owner"}
          value={formData?.owner || ""}
          type="text"
          id="small-input"
          className="block max-w-[500px] w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <button
        type={"submit"}
        className="w-full max-w-[500px] py-2.5 px-2 bg-blue-700 rounded-lg text-white active:opacity-70"
      >
        Submit
      </button>
    </form>
  )
}
