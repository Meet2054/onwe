import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Profile {
    id: string;
    username: string;
    avatar: string
}

interface ProfileCardProps {
  profile: Profile;
  onClick: () => void;
}

const saveHistory =()=>{

}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, onClick }) => {
  const imageSrc = profile.avatar;

  return (
    <div onClick={onClick} className="flex items-center mt-2 ml-6 p-2">
      <div className="rounded-full bg-gray-300 h-10 w-10 mr-3 border"
      style={{ backgroundImage: `url(${imageSrc})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
       </div>
      <div>
        <Link href={`/profile/${profile.username}`} className="text-gray-700 hover:text-black">
        <h2 className="text-sm text-black font-bold">{profile.username}</h2>
            {/* <img src="" alt="" /> */}
        </Link>
      </div>
    </div>
  );
};

export default ProfileCard;
