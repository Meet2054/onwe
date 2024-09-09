import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Hashtag {
    tagname: string;
    numberofposts: number
}

interface HashTagCardProps {
  hashtag: Hashtag;
}

const Hashtag: React.FC<HashTagCardProps> = ({ hashtag }) => {
  console.log(hashtag.tagname);
  const imageSrc = 'https://github.com/Meet2054/onwe/blob/main/onwe-next/public/images/pngtree-hashtags-icon-on-white-background-png-image_5040948.png'

  return (
    <div className="flex items-center mt-2 ml-6 p-2">
      <div className="rounded-full bg-gray-300 h-10 w-10 mr-3 border"
      style={{ backgroundImage: `url(${imageSrc})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
       </div>
      <div>
        <Link href={`/search/${hashtag.tagname}`} className="text-gray-700 hover:text-black">
        <h2 className="text-sm text-black font-bold">#{hashtag.tagname}</h2>
            {/* <img src="" alt="" /> */}
        </Link>
      </div>
      <div>
        <p className="text-gray-500 text-sm">{hashtag.numberofposts} posts</p>
      </div>
    </div>
  );
};

export default Hashtag;