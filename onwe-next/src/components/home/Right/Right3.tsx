import React from 'react'

const Right3 = () => {
  return (
    <div>
      <div className="w-full h-[40vh] mt-4 ">
          <div className="pl-4 pt-2 border-l-4 border-black">
            <span className="text-xl ">Upcoming Events</span>
          </div>
          <div className="w-full mt-4 h-[70px] bg-black flex items-center justify-between pl-4 pr-4 rounded-2xl  text-white">
            <div className="flex gap-4">
              <div className="flex flex-col bg-white px-3 text-black rounded-xl">
                <span className="text-lg font-extrabold">24</span>
                <span className="text-[12px]">Jun</span>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold">Summer Night!</span>
                <span className="font-extralight">EDM Party</span>
              </div>
            </div>
            <div className=" bg-[#DCDCDC] px-3 py-1 rounded-2xl">
              <img src="" alt="" />
              <span className="text-black">remind</span>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Right3
