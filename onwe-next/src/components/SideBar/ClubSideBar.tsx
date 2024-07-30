"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";

import ClubCard from "../clubs/ClubCard";

interface Club {
  id: string;
  name: string;
  image: string;
}

const ClubSideBar = () => {
  const [myClubs, setMyClubs] = useState<Club[]>([]);
  const { getToken } = useAuth();

  useEffect(() => {
    // Fetch magazines from API when the component mounts
    const fetchMyClubs = async () => {
      try {
        const token = await getToken();
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/myclubs`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "69420",
            },
          }
        );
        setMyClubs(response.data);
      } catch (error) {
        console.error("Error fetching magazines:", error);
      }
    };

    fetchMyClubs();
  }, [getToken]); // Make sure to include getToken in the dependency array

  return (
    <div className="h-screen w-full flex flex-col border">
      <div className="flex items-center border-b h-[8vh] ">
        <h1 className="text-2xl font-bold pl-8">CLUBS</h1>
      </div>
      <div className="flex flex-col overflow-y-auto space-y-2 mt-4">
        {myClubs.map((club) => (
          <ClubCard key={club.id} club={club} />
        ))}
      </div>
    </div>
  );
};

export default ClubSideBar;
