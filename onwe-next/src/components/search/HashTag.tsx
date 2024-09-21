import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Hashtag as HashtagProps } from '@/types/type';

// interface Hashtag {
//     tag: string;
//     count: number
// }

interface HashTagCardProps {
  hashtag: HashtagProps;
  onClick: () => void;
}




const Hashtag: React.FC<HashTagCardProps> = ({ hashtag, onClick }) => {
  const imageSrc = 'https://github.com/Meet2054/onwe/blob/main/onwe-next/public/images/pngtree-hashtags-icon-on-white-background-png-image_5040948.png'

  return (
    <div onClick={onClick} className="flex justify-between items-center mt-2 ml-6 pl-2 pr-10">
      {/* <div className="rounded-full bg-gray-300 h-10 w-10 mr-3 border"
      style={{ backgroundImage: `url(${imageSrc})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
       </div> */}
      <div>
        <Link href={`/explore?tag=${hashtag.tag?.slice(1)}`} className="text-gray-700 hover:text-black">
        <h2 className="text-sm text-black font-bold">{hashtag.tag}</h2>
            {/* <img src="" alt="" /> */}
        </Link>
      </div>
      <div>
        <p className="text-gray-500 text-sm">{hashtag.count} posts</p>
      </div>
    </div>
  );
};

export default Hashtag;