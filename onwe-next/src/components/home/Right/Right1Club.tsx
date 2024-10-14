import React from 'react'
import { ClubCardHome } from '@/types/type';
import Image from 'next/image';
import Link from 'next/link';
interface props  {
    club: ClubCardHome
}
const Right1Club:React.FC<props> = ({club}) => {
    
  return (
    <div>
    <Link href={`/clubs/${club.name}`} className="w-full h-[70px] overflow-hidden shadow bg-gray-50 border  b hover:shadow-md  rounded-xl flex gap-3 items-center px-4 py-1">
            <img src={club.coverimage}  alt="" className="h-12 w-12 rounded-full" />
            <div className="flex flex-col">
              <span className='text-md bold'>{club.name}</span>
              <span className="text-sm text-gray-500">{club.slogan}</span>
            </div>
      </Link>
    </div>
  )
}

export default Right1Club
