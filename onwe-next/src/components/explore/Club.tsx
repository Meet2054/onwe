import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ClubProps {
    club: {
        coverImage: string;
        name: string;
        slogan: string;
    };
}

const Club: React.FC<ClubProps> = ({ club }) => {
    return (
        <Link className="relative w-full h-44 rounded-lg overflow-hidden" href={`/clubs/${club.name}`}>
            <Image src={club.coverImage} alt={club.name} layout="fill" objectFit="cover" className="absolute inset-0 w-full h-full" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white p-4">
                <p className="text-lg font-light">{club.slogan}</p>
                <h2 className="text-2xl font-bold mt-2">{club.name}</h2>
            </div>
        </Link>
    );
};

export default Club;

