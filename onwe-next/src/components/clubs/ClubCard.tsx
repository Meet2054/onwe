import React from 'react';
import Link from 'next/link';

interface Club {
    id: string;
    name: string;
    image: string
}

interface ClubCardProps {
  club: Club;
}

const ClubCard: React.FC<ClubCardProps> = ({ club }) => {
  return (
    <div className="flex items-center mt-2 ml-6 p-2">
      <div className="rounded-full bg-gray-300 h-10 w-10 mr-3" style={{ backgroundImage: `url(${club.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
      <div>
        <Link href={`/clubs/${club.name}`} className="text-gray-700 hover:text-black">
        <h2 className="text-sm font-bold">{club.name}</h2>
            {/* <img src="" alt="" /> */}
        </Link>
      </div>
    </div>
  );
};

export default ClubCard;
