import React from 'react'
import { ClubCardHome } from '@/types/type';
import Image from 'next/image';
import Link from 'next/link';
interface props  {
    club: ClubCardHome
}
const Right1Club:React.FC<props> = ({club}) => {
    const imageSrc = `data:image/png;base64,${club.coverimage}`;
    
  return (
    <div>
      <Link href={`/clubs/${club.name}`} className="w-[93%] h-16 top-12 mb-2 left-3 bg-white rounded-xl flex items-center gap-3 pl-4">
            <Image src={imageSrc} width={20} height={20} alt="" className="w-[40px] rounded-xl" />
            <div className="flex flex-col">
              <span className='text-md bold'>{club.name}</span>
              <span className="text-sm text-gray-500">{club.slogan}</span>
            </div>
      </Link>
    </div>
  )
}

export default Right1Club
