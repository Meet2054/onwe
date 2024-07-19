import React from 'react';
import Link from 'next/link';

interface Club {
    id: string;
    clubName: string;
    coverImage: string
}

interface ClubCardProps {
  club: Club;
}

const ClubCard: React.FC<ClubCardProps> = ({ club }) => {
  // const base64Prefix = "data:image/png;base64,";
  const imageSrc = `data:image/png;base64,${club.coverImage}`;

  return (
    <>
    <Link href={`/clubs/${club.clubName}`}>
    <div className="flex items-center mt-2 ml-6 p-2">
      <div className="rounded-full bg-gray-300 h-10 w-10 mr-3"
       style={{ backgroundImage: `url(${imageSrc})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      </div>
      <div>
        <h2 className="text-sm font-bold">{club.clubName}</h2>
            {/* <img src="" alt="" /> */}
      </div>
    </div>
    </Link>
    </>
  );
};

export default ClubCard;
