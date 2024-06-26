"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ClubCard from "../clubs/ClubCard";

interface Club {
  id: string;
  name: string;
  image: string;
}

const ClubSideBar = () => {
  const [participatedClubs, setParticipatedClubs] = useState<Club[]>([]);
  useEffect(() => {
    const fetchParticipatedClubs = async () => {
      try {
        // Sample clubs data
        const sampleClubs: Club[] = [
          { id: "1", name: "Coding", image: "https://via.placeholder.com/40" },
          {
            id: "2",
            name: "Photography",
            image: "https://via.placeholder.com/40",
          },
          {
            id: "3",
            name: "Competitions",
            image: "https://via.placeholder.com/40",
          },
          {
            id: "4",
            name: "Trekking",
            image: "https://via.placeholder.com/40",
          },
          { id: "5", name: "Events", image: "https://via.placeholder.com/40" },
          {
            id: "6",
            name: "Painting",
            image: "https://via.placeholder.com/40",
          },
          {
            id: "4",
            name: "Trekking",
            image: "https://via.placeholder.com/40",
          },
          { id: "5", name: "Events", image: "https://via.placeholder.com/40" },
          {
            id: "6",
            name: "Painting",
            image: "https://via.placeholder.com/40",
          },
          {
            id: "4",
            name: "Trekking",
            image: "https://via.placeholder.com/40",
          },
          { id: "5", name: "Events", image: "https://via.placeholder.com/40" },
          {
            id: "6",
            name: "Painting",
            image: "https://via.placeholder.com/40",
          },
          {
            id: "4",
            name: "Trekking",
            image: "https://via.placeholder.com/40",
          },
          { id: "5", name: "Events", image: "https://via.placeholder.com/40" },
          {
            id: "6",
            name: "Painting",
            image: "https://via.placeholder.com/40",
          },
          {
            id: "4",
            name: "Trekking",
            image: "https://via.placeholder.com/40",
          },
          { id: "5", name: "Events", image: "https://via.placeholder.com/40" },
          {
            id: "6",
            name: "Painting",
            image: "https://via.placeholder.com/40",
          },
          {
            id: "4",
            name: "Trekking",
            image: "https://via.placeholder.com/40",
          },
          { id: "5", name: "Events", image: "https://via.placeholder.com/40" },
          {
            id: "6",
            name: "Painting",
            image: "https://via.placeholder.com/40",
          },
          {
            id: "4",
            name: "Trekking",
            image: "https://via.placeholder.com/40",
          },
          { id: "5", name: "Events", image: "https://via.placeholder.com/40" },
          {
            id: "6",
            name: "Painting",
            image: "https://via.placeholder.com/40",
          },
        ];
        setParticipatedClubs(sampleClubs);
      } catch (error) {
        console.error("Error fetching participated clubs:", error);
      }
    };

    fetchParticipatedClubs();
  }, []);

  // const userId = "tobetakenfromredux"

  // useEffect(() => {
  //   const fetchParticipatedClubs = async () => {
  //     try {
  //       const response = await axios.get('/api/getParticipatedClubs', { params: { userId } });
  //       setParticipatedClubs(response.data.clubs);
  //     } catch (error) {
  //       console.error('Error fetching participated clubs:', error);
  //     }
  //   };

  //   fetchParticipatedClubs();
  // }, [userId]);
  return (
    <div className="h-screen w-full flex flex-col">
      <div className="flex border h-[7vh] ">
        <h1 className="text-2xl font-bold mt-6 ml-8">CLUBS</h1>
      </div>
      <div className="flex flex-col border-r overflow-y-auto">
        {participatedClubs.map((club) => (
          <ClubCard key={club.id} club={club} />
        ))}
      </div>
    </div>
  );
};

export default ClubSideBar;
