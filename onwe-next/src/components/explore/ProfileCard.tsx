import React from 'react';
import Link from 'next/link';

interface Profile {
    id: string;
    name: string;
    image: string
}

interface ProfileCardProps {
  profile: Profile;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  return (
    <div className="flex items-center mt-2 ml-6 p-2">
      <div className="rounded-full bg-gray-300 h-10 w-10 mr-3" style={{ backgroundImage: `url(${profile.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
      <div>
        <Link href={`/clubs/${profile.name}`} className="text-gray-700 hover:text-black">
        <h2 className="text-sm font-bold">{profile.name}</h2>
            {/* <img src="" alt="" /> */}
        </Link>
      </div>
    </div>
  );
};

export default ProfileCard;
