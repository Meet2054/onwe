import { base64Prefix } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { Club } from "./PopularClubs";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";

const PopularClubsCard = ({ club }: { club: Club }) => {
  return (
    <Link
      href={`/clubs/${club.name}`}
      className="hover:scale-105 w-full flex gap-x-2
      hover:shadow-[0_1px_0_0_#000]  animate-in zoom-in-0 
      items-center justify-between p-3  h-24 border rounded-lg border border-black transition-all ease-in-out duration-150 hover:shadow-md"
    >
      <div className="w-20 aspect-square  rounded-md relative">
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
