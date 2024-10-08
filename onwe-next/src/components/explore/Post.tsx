import React from 'react';
import Image from 'next/image';

interface ClubProps {
    post: {
        coverImage: string;
    };
}

const Post: React.FC<ClubProps> = ({ post }) => {
    return (
        <div className="relative w-full h-44 rounded-lg overflow-hidden">
            <Image src={post.coverImage} alt='post' layout="fill" objectFit="cover" className="absolute inset-0 w-full h-full" />
            {/* <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white p-4"> */}
                {/* <p className="text-lg font-light">{post.slogan}</p>
                <h2 className="text-2xl font-bold mt-2">{post.Name}</h2> */}
            {/* </div> */}
        </div>
    );
};

export default Post;