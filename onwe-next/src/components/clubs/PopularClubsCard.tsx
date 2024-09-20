import { base64Prefix } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { AllClub, Club } from "./PopularClubs";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";

const PopularClubsCard = ({ club, type }: { club: any; type: string }) => {
  if (type == "/trending")
    return (
      <Link
        href={`/clubs/${club.name}`}
        className="hover:scale-105 border flex gap-x-1 h-14   rounded-md border-black transition-all ease-in-out duration-150 "
      >
        <div className="w-16 aspect-square  rounded-md relative">
          <Image src={`${base64Prefix}${club.coverimage}`} fill alt="image" />
        </div>
        <div className="w-full h-full rounded-md">
          <div className="text-xl font-bold">{club.name}</div>
          <div
            className="word-wrap
            "
          >
            {club.slogan}
          </div>
        </div>
      </Link>
    );
  if (type == "/clubs/all") {
    return (
      <Link
        href={`/clubs/${club.name}`}
        className="hover:scale-105 border flex gap-x-1 h-14 overflow-hidden  rounded-md border-black transition-all ease-in-out duration-150 "
      >
        <div className="w-20 aspect-square  rounded-md relative">
          <Image
            src={`${base64Prefix}${club.coverImage[0]}`}
            fill
            alt="image"
          />
        </div>
        <div className="w-full h-full rounded-md">
          <div className="text-xl font-bold">{club.clubName}</div>
          <div
            className="word-wrap
            "
          >
            {club.slogan}
          </div>
        </div>
      </Link>
    );
  }
};
export const PopularClubsCardSkeleton = () => {
  return (
    <Skeleton className="w-full flex gap-x-2  items-center justify-between p-3  h-24 border rounded-lg border-2 animate-pulse   bg-gray-100 ">
      <Skeleton className="size-16  rounded-md relative"></Skeleton>
      <Skeleton className="w-full h-full rounded-md">
        <Skeleton className="text-xl font-bold"></Skeleton>
        <Skeleton></Skeleton>
      </Skeleton>
    </Skeleton>
  );
};

export default PopularClubsCard;
