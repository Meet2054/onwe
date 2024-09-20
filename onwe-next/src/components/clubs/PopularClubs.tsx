"use client";
import React, { useEffect, useState } from "react";
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
export interface AllClub {
  clubId: number;
  clubName: string;
  coverImage: string[];
  slogan: string;
}

interface PopularClubsProps {
  type: "/popular" | "/trending" | "/clubs/all";
}

const fetcher = async (url: string) => {
  const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + url, {
    headers: { Authorization: "Bearer " + localStorage.getItem("onwetoken") },
  });
  return response.data;
};

const PopularClubs = ({ type }: PopularClubsProps) => {
  const { data: clubs, error, isLoading } = useSWR<Club[]>(`${type}`, fetcher);
  const [title, settitle] = useState("");
  useEffect(() => {
    if (type == "/popular") {
      settitle("Popular");
    } else if (type == "/trending") {
      settitle("Trending");
    } else if (type == "/clubs/all") {
      settitle("All Clubs");
    }
  }, []);

  if (!clubs || isLoading) {
    return (
      <div className="p-2  mt-3 ">
        <div className="space-x-2">
          <span className="text-lg font-bold">{title}</span>
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

  return (
    <div className="p-2  mt-3 ">
      <div className="space-x-2">
        <span className="text-lg font-bold">{title}</span>
        <span className="px-4 py-[2px] text-base  font-semibold rounded-full border-2 border-black shadow-[3px_3px_0_0_#000]">
          CLUB
        </span>
      </div>
      <div className="w-full  mt-3 grid grid-cols-4 gap-3">
        {clubs.map((club) => (
          <PopularClubsCard key={club.id} club={club} type={type} />
        ))}
      </div>
    </div>
  );
};

export default PopularClubs;
