// pages/index.tsx
"use client";
import React, { useState, useEffect } from "react";
import useSWR from "swr";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import MagazinesComponent from "@/components/magazines/MagazinesComponent";
import MagazineDetails from "@/components/magazines/MagazineDetails";
import { useDispatch } from "react-redux";
import { selectMagazine } from "@/lib/features/magazines/magazineSlice";

// Sample magazine data type
type Magazine = {
  id: number;
  title: string;
  date: string;
  description: string;
  media: string[]; // Assuming media is an array of strings
};

// Fetcher function that includes token in headers
const fetcher = async (url: string, token: string) => {
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "69420",
    },
  });
  return response.data;
};

const Page: React.FC = () => {
  const [magazines, setMagazines] = useState<Magazine[]>([]);
  const [selectedMagazine, setSelectedMagazine] = useState<Magazine | null>(
    null
  );
  const { getToken } = useAuth();
  const dispatch = useDispatch();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      const fetchedToken = await getToken({ template: "test" });
      setToken(fetchedToken);
    };
    fetchToken();
  }, [getToken]);

  const { data, error } = useSWR(
    token ? `${process.env.NEXT_PUBLIC_API_URL}/magazines` : null,
    (url) => fetcher(url, token!)
  );

  useEffect(() => {
    if (data) {
      setMagazines(data);
    }
  }, [data]);
  // useEffect(() => {
  //   // Fetch magazines from API when the component mounts
  //   const fetchMagazines = async () => {
  //     try {
  //       const token = await getToken();
  //       const response = await axios.get(
  //         `${process.env.NEXT_PUBLIC_API_URL}/magazines`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //             "ngrok-skip-browser-warning": "69420",
  //           },
  //         }
  //       );
  //       setMagazines(response.data);
  //     } catch (error) {
  //       console.error("Error fetching magazines:", error);
  //     }
  //   };

  //   fetchMagazines();
  // }, [getToken]); // Make sure to include getToken in the dependency array

  const handleSelectMagazine = (magazine: Magazine) => {
    setSelectedMagazine(magazine);
    dispatch(selectMagazine(magazine));
  };


  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-gray-100 overflow-y-auto border border-r-2 flex flex-col items-center">
        <h1 className="mt-4 w-1/2 border rounded-xl border-gray-400 flex justify-center items-center hover:bg-slate-400">
          Previous
        </h1>
        <MagazinesComponent
          magazines={magazines}
          onSelect={handleSelectMagazine}
        />
      </div>
      <div className="w-3/4 overflow-y-auto flex">
        {selectedMagazine ? (
          <MagazineDetails magazine={selectedMagazine} />
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
