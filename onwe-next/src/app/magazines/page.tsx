"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";

// Sample magazine data type
type Magazine = {
  id: number;
  title: string;
  date: string;
  description: string;
  media: string[]; // Assuming media is an array of strings
};

// Magazine Component to list all magazines
const MagazineComponent: React.FC<{
  magazines: Magazine[];
  onSelect: (magazine: Magazine) => void;
}> = ({ magazines, onSelect }) => {
  const base64Prefix = 'data:image/png;base64,';

  return (
    <div className="p-1 bg-gray-100">
      {magazines.map((magazine) => (
        <div
          key={magazine.id}
          className="mb-8 p-2 cursor-pointer hover:bg-gray-200 flex flex-col items-center"
          onClick={() => onSelect(magazine)}
        >
          <div className="w-full h-48 relative">
            <Image
              src={`${base64Prefix}${magazine.media[0]}`} // Assuming media is an array of base64 strings
              alt={magazine.title}
              layout="fill"
              objectFit="contain"
              className="border rounded-xl"
            />
          </div>
          <h3 className="items-center text-md text-gray-400 font-bold">
            {magazine.title}
          </h3>
          <p className="text-xs text-gray-600">
            MAGAZINE {magazine.id < 10 ? `0${magazine.id}` : magazine.id}.{" "}
            {magazine.date}
          </p>
        </div>
      ))}
    </div>
  );
};

// Magazine Details Component to show selected magazine details
const MagazineDetailsComponent: React.FC<{ magazine: Magazine }> = ({
  magazine,
}) => {
  const base64Prefix = 'data:image/png;base64,';
  console.log("hi")
  return (
    <div className="w-screen h-screen p-4 flex flex-col">
      <h1 className="text-4xl font-bold text-gray-600">WHATS AROUND?</h1>
      <h2 className="text-xl text-gray-600 mb-4">
        MAGAZINE {magazine.id < 10 ? `0${magazine.id}` : magazine.id}.{" "}
        {magazine.date}
      </h2>
      <p className="mb-4">{magazine.description}</p>
      <div className="w-full h-full relative">
        <Image
          src={`${base64Prefix}${magazine.media[0]}`}
          alt={magazine.title}
          layout="fill"
          objectFit="contain"
          className="rounded-lg"
        />
      </div>
    </div>
  );
};

// Main Page Component
const Page: React.FC = () => {
  const [magazines, setMagazines] = useState<Magazine[]>([]);
  const [selectedMagazine, setSelectedMagazine] = useState<Magazine | null>(
    null
  );
  const { getToken } = useAuth();

  // Ensure the component runs on the client side
  // const { useClient } = useClient();

  useEffect(() => {
    // Fetch magazines from API when the component mounts
    const fetchMagazines = async () => {
      try {
        const token = await getToken();
        console.log(token)
        console.log("a")
        const response = await axios.get(
          "https://eb64-117-198-141-197.ngrok-free.app/magazines",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "69420",
            },
          }
        );
        setMagazines(response.data);
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching magazines:", error);
      }
    };

    fetchMagazines();
  }, []); // Make sure to include useClient in the dependency array

  const handleSelectMagazine = (magazine: Magazine) => {
    setSelectedMagazine(magazine);
  };
  
  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-gray-100 overflow-y-auto border border-r-2 flex flex-col items-center">
        <h1 className="mt-4 w-1/2 border rounded-xl border-gray-400 flex justify-center items-center hover:bg-slate-400">
          Previous 
        </h1>
        <MagazineComponent
          magazines={magazines}
          onSelect={handleSelectMagazine}
        />
      </div>
      <div className="w-3/4 overflow-y-auto flex">
        {selectedMagazine ? (
          <MagazineDetailsComponent magazine={selectedMagazine} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 ml-80">
              Select a magazine to see the details
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
