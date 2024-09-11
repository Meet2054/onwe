import React from 'react'
import Image from 'next/image'
import party from "@/../public/images/rightsideImages/party.png"

const Right2 = () => {
  return (
    <div>
        <div className="w-full h-[18vh] mt-4 bg-[#EBF0FD] flex flex-col items-start justify-center pl-5 rounded-xl gap-y-2">
          <div className="flex items-center gap-1">
            <Image src={party} alt="" className="w-[25px]" />
            <span className="font-extrabold text-lg">Join the Fun</span>
          </div>
          <span>
            Hey peeps! Inviting you all to attend tonights Onwe event at PU Circle
          </span>
        </div>
    </div>
  )
}

export default Right2
