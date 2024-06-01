import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useAccount, useWriteContract } from "wagmi"
import { appConfig } from "../utils/config"
import { abi } from "../abi/CarShops.json"
import { Spinner } from "../utils/icons"

type FormDataType = {
  name?: string | undefined
  location?: string | undefined
  car_brands?: Number[]
}

type FormDataError = {
  name?: string | undefined
  location?: string | undefined
  car_brands?: string | undefined
}

enum Brands {
  BMW,
  AUDI,
  FIAT,
  RENAULT,
  PAGANI,
  KOENIGSEGG,
}

export default function ServiceRegister() {
  const [formData, setFormData] = useState<FormDataType>({ car_brands: [] })
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
    if (!formData?.name) return setFormError((prev) => ({ ...prev, name: "Name is required" }))
    if (formData?.name.length < 2)
      return setFormError((prev) => ({ ...prev, name: "Name must be at least 2 characters long" }))
    if (!formData?.location) return setFormError((prev) => ({ ...prev, location: "Location is required" }))
    if (formData?.location.length < 1) return setFormError((prev) => ({ ...prev, location: "Location is not valid" }))
    // @ts-ignore
    if (formData?.car_brands.length < 1)
      return setFormError((prev) => ({ ...prev, car_brands: "Select at least one car brand" }))

    // Send data in contract call
    writeContract({
      abi,
      address: `0x${appConfig.serviceContractAddress}`,
      functionName: "registerCarShop",
      args: [formData?.name, formData?.location, formData?.car_brands || []],
    })
    setFormError({})
    setFormData({ car_brands: [] })
  }

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setFormError({})
  }

  const handleCheckBoxChange = async (e: any) => {
    const num = Brands[e.target.name]

    const carBrands = formData.car_brands
    // @ts-ignore
    if (carBrands.includes(num)) {
      // @ts-ignore
      carBrands.splice(carBrands.indexOf(num), 1)
    } else {
      // @ts-ignore
      carBrands.push(num)
    }
    setFormData({ ...formData, car_brands: carBrands })
    setFormError({})
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
        return toast.error(`Something went wrong`, {
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
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="w-full px-3 text-gray-900 h-fit min-h-[500px] gap-6 flex flex-col pt-8"
    >
      <h1 className="font-medium text-lg mb-6">Register new car shop</h1>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900">Enter name</label>
        {formError?.name && <p className="text-red-600 text-base">{formError?.name}</p>}
        <input
          onChange={(e) => handleChange(e)}
          name={"name"}
          value={formData?.name || ""}
          type="text"
          id="small-input"
          className="block max-w-[500px] w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <h2 className="mb-2 mt-3">Select car brands you work on:</h2>
        {formError?.car_brands && <p className="text-red-600 text-base">{formError?.car_brands}</p>}
        <div className="flex items-center me-4">
          <input
            checked={formData?.car_brands?.some((element) => element === Brands.AUDI) || false}
            type="checkbox"
            name="AUDI"
            onChange={(e) => handleCheckBoxChange(e)}
            className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"
          />
          <label className="ms-2 text-sm font-medium text-gray-900 ">Audi</label>
        </div>
        <div className="flex items-center me-4">
          <input
            checked={formData?.car_brands?.some((element) => element === Brands.FIAT) || false}
            type="checkbox"
            name="FIAT"
            onChange={(e) => handleCheckBoxChange(e)}
            className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"
          />
          <label className="ms-2 text-sm font-medium text-gray-900 ">Fiat</label>
        </div>
        <div className="flex items-center me-4">
          <input
            checked={formData?.car_brands?.some((element) => element === Brands.RENAULT) || false}
            type="checkbox"
            name="RENAULT"
            onChange={(e) => handleCheckBoxChange(e)}
            className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"
          />
          <label className="ms-2 text-sm font-medium text-gray-900 ">Renault</label>
        </div>
        <div className="flex items-center me-4">
          <input
            checked={formData?.car_brands?.some((element) => element === Brands.PAGANI) || false}
            type="checkbox"
            name="PAGANI"
            onChange={(e) => handleCheckBoxChange(e)}
            className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"
          />
          <label className="ms-2 text-sm font-medium text-gray-900 ">Pagani</label>
        </div>
        <div className="flex items-center me-4">
          <input
            checked={formData?.car_brands?.some((element) => element === Brands.KOENIGSEGG) || false}
            type="checkbox"
            name="KOENIGSEGG"
            onChange={(e) => handleCheckBoxChange(e)}
            className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"
          />
          <label className="ms-2 text-sm font-medium text-gray-900 ">Koenigsegg</label>
        </div>
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900">Enter shop's location</label>
        {formError?.location && <p className="text-red-600 text-base">{formError?.location}</p>}
        <input
          onChange={(e) => handleChange(e)}
          name={"location"}
          value={formData?.location || ""}
          type="text"
          id="small-input"
          className="block max-w-[500px] w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <button
        disabled={!formData?.name || isPending}
        type={"submit"}
        className={` flex items-center justify-center w-full max-w-[500px] py-2.5 px-2 bg-blue-700 rounded-lg text-white active:opacity-70 ${
          !formData?.name || isPending ? "bg-gray-300" : ""
        }`}
      >
        {isPending ? <Spinner className={"w-6 h-6 animate-spin fill-blue-600"} /> : `Register shop`}
      </button>
    </form>
  )
}
