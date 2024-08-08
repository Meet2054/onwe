import React from "react";
import Image from "next/image";
import Link from "next/link";
import { TopClubProp } from "./TopClubs";

interface ClubProps {
  club: TopClubProp
}

const Club: React.FC<ClubProps> = ({ club }) => {
  const base64Prefix = "data:image/png;base64,";
  return (
    <Link
      className="relative w-full h-36 sm:h-44 rounded-lg overflow-hidden"
      href={`/clubs/${club.clubName}`}
    >
      <Image
        src={`${base64Prefix}${club.coverImage}`}
        alt={club.clubName}
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 w-full h-full"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end items-center text-white pb-5">
        <p className="text-xs sm:text-lg font-light ml-5">{club.slogan}</p>
        <h2 className="text-sm md:text-2xl font-bold mt-2">{club.clubName}</h2>
      </div>
    </Link>
  );
};

export default Club;
