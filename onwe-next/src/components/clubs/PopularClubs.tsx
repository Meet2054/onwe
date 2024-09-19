"use client";
import React from "react";
import PopularClubsCard, { PopularClubsCardSkeleton } from "./PopularClubsCard";
import axios from "axios";
import useSWR from "swr";

export interface Club {
  coverimage: string;
  createdAt: string; // ISO 8601 date string
  id: number;
  members: number;
  name: string;
  slogan: string;
  updatedAt: string; // ISO 8601 date string
}

const fetcher = async (url: string) => {
  const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + url, {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  });
  return response.data;
};

interface PopularClubsProps {
  type: "/popular" | "/trending" | "/clubs/all";
}

const PopularClubs = ({ type }: PopularClubsProps) => {
  const { data: clubs, error, isLoading } = useSWR<Club[]>(`${type}`, fetcher);

  if (!clubs || isLoading) {
    return (
      <div className="p-2  mt-3 ">
        <div className="space-x-2">
          <span className="text-lg font-bold">Popular</span>
          <span className="px-4 py-[2px] text-base  font-semibold rounded-full border-2 border-black shadow-[3px_3px_0_0_#000]">
            CLUB
          </span>
        </div>
        <div className="w-full  mt-3 grid grid-cols-4 gap-3">
          <PopularClubsCardSkeleton />
          <PopularClubsCardSkeleton />
          <PopularClubsCardSkeleton />
          <PopularClubsCardSkeleton />
        </div>
      </div>
    );
  }
  if (clubs) {
    console.log(clubs);
  }
  return (
    <div className="p-2  mt-3 ">
      <div className="space-x-2">
        <span className="text-lg font-bold">Popular</span>
        <span className="px-4 py-[2px] text-base  font-semibold rounded-full border-2 border-black shadow-[3px_3px_0_0_#000]">
          CLUB
        </span>
      </div>
      <div className="w-full  mt-3 grid grid-cols-4 gap-3">
        {clubs.map((club) => (
          <PopularClubsCard key={club.id} club={club} />
        ))}
      </div>
    </div>
  );
};

export default PopularClubs;
