import React from 'react';
import Image from 'next/image';

interface LikeNotiProps {
  details: {
    id: string;
    username: string;
    profilePicture: string;
    postPreview: string;
  };
}

const LikeNoti: React.FC<LikeNotiProps> = ({ details }) => {
  return (
    <div className="flex items-center p-3 border-b hover:bg-gray-50 cursor-pointer">
      <Image
        src={details.profilePicture}
        alt={`${details.username}'s profile picture`}
        width={40}
        height={40}
        className="rounded-full mr-3"
      />
      <div className="flex-grow">
        <p className="font-semibold">{details.username}</p>
        <p className="text-sm text-gray-600">liked your post</p>
      </div>
      <Image
        src={details.postPreview}
        alt="Liked post preview"
        width={48}
        height={48}
        className="rounded"
      />
    </div>
  );
};

export default LikeNoti;
