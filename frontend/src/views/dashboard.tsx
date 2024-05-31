import { useState } from "react";
import TabSelector from "../components/TabSelector";
import ServiceTab from "../components/Service";

export default function DashBoard () {
    const [currentTab, setCurrentTab] = useState<String>('service')
    return (
        <div className="w-full h-fit bg-white py-5 px-2 rounded-lg shadow-md min-h-[500px]">
            <TabSelector currentTab={currentTab} setCurrentTab={setCurrentTab} />
            <hr className="w-full my-5 " ></hr> 
            {currentTab ==='service' && <ServiceTab />}
        </div>
    )
}