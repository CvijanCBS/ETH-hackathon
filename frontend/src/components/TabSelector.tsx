type TabSelectorType = {
    currentTab: String;
    setCurrentTab: (tab: string) => void;
}

export default function TabSelector({currentTab, setCurrentTab}: TabSelectorType ) {
   function selectTab(tab: string) {
        setCurrentTab(tab)
    }
    return (
        <div className=" md:ml-4 w-fit flex flex-row items-start justify-start border-b-[1px] border-b-gray-300 gap-4">
            <div onClick={() => selectTab('service')} className={`${currentTab === 'service' ? 'border-b-gray-900  border-b-[1px]' : ''} pb-4  cursor-pointer`}> Service</div>
            <div onClick={() => selectTab('manufacturer')} className={`${currentTab === 'manufacturer' ? 'border-b-gray-900 border-b-[1px]' : ''}  pb-4  cursor-pointer`}> Manufacturer</div>
            <div onClick={() => selectTab('owner')} className={`${currentTab === 'owner' ? 'border-b-gray-900 border-b-[1px]' : ''}  pb-4  cursor-pointer`}> Owner</div>
        </div>
    )
}