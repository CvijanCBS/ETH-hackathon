import { useState } from "react"
import { toast } from "react-toastify"
import { useAccount } from "wagmi"

type FormDataType = {
    vin?: string | undefined
    oil_filter?: boolean | undefined
    air_filter?: boolean | undefined
    fuel_filter?: boolean | undefined
    cabin_filter?: boolean | undefined
    date?: string | undefined
    mileage?: string | undefined
}

export default function ServiceTab() {
    const [formData, setFormData] = useState<FormDataType>({});
    const [formError, setFormError] = useState({});

    const account = useAccount();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (account?.isDisconnected) return toast.error(
            'Please connect your wallet', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            }
        )
        setFormError({});
        setFormData({});
    }

    const handleChange = (e: any) => {
        setFormData({...formData, [e.target.name]: e.target.value});
        setFormError({...formError, [e.target.name]: e.target.value});
    }

    const handleCheckBoxChange = (e: any) => {
        console.log(e)
        setFormData({...formData, [e.target.name]:  e.target.checked});
        setFormError({...formError, [e.target.name]: e.target.checked});
    }


    return (
        <form onSubmit={(e) => handleSubmit(e)} className="w-full px-3 text-gray-900 h-fit min-h-[500px] gap-6 flex flex-col">
            <h1 className="font-medium text-lg mb-6">Add car's service info</h1>
            <div>
             <label  className="block mb-2 text-sm font-medium text-gray-900">Enter VIN</label>
             <input onChange={(e) => handleChange(e)} name={'vin'} value={formData?.vin || ''} type="text" id="small-input" className="block max-w-[500px] w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500"/>
            </div>
            <div>
           
           <h2 className="mb-2 mt-3" >Select what is done:</h2>


<div className="flex items-center me-4">
<input checked={formData?.oil_filter || false} type="checkbox" name="oil_filter" onChange={(e) => handleCheckBoxChange(e)} className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"/>
    <label  className="ms-2 text-sm font-medium text-gray-900 ">Oil Filter</label>
</div>
<div className="flex items-center me-4">
<input checked={formData?.air_filter || false} type="checkbox" name="air_filter" onChange={(e) => handleCheckBoxChange(e)} className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"/>
    <label  className="ms-2 text-sm font-medium text-gray-900 ">Air Filter</label>
</div>
<div className="flex items-center me-4">
<input checked={formData?.fuel_filter || false} type="checkbox" name="fuel_filter" onChange={(e) => handleCheckBoxChange(e)} className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"/>
    <label  className="ms-2 text-sm font-medium text-gray-900 ">Fuel Filter</label>
</div>
<div className="flex items-center me-4">
<input checked={formData?.cabin_filter || false} type="checkbox" name="cabin_filter" onChange={(e) => handleCheckBoxChange(e)} className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"/>
    <label  className="ms-2 text-sm font-medium text-gray-900 ">Cabin Filter</label>
</div>

            </div>
            <div>
             <label  className="block mb-2 text-sm font-medium text-gray-900">Enter date</label>
             <input onChange={(e) => handleChange(e)} name={'date'} value={formData?.date || ''} type="date" id="small-input" className="block max-w-[500px] w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500"/>
            </div>
            <div>
             <label  className="block mb-2 text-sm font-medium text-gray-900">Enter current mileage</label>
             <input onChange={(e) => handleChange(e)} name={'mileage'} value={formData?.mileage || ''} type="number" id="small-input" className="block max-w-[500px] w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500"/>
            </div>
            

         <button type={'submit'} className="w-full max-w-[500px] py-2.5 px-2 bg-blue-700 rounded-lg text-white active:opacity-70">Submit</button>
        </form>
    )
}