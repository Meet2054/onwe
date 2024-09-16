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
import Link from "next/link"; // Import Link from next/link

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
      console.log(fetchedToken);
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

  const handleSelectMagazine = (magazine: Magazine) => {
    setSelectedMagazine(magazine);
    dispatch(selectMagazine(magazine));
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-gray-100 overflow-y-auto scrollbar-custom border border-r-2 flex flex-col items-center">
        <div className="flex flex-wrap gap-10  justify-center p-5 items-center w-full max-md:max-w-full">
            <div className="flex gap-1.5 items-center self-stretch my-auto text-base tracking-normal leading-none text-center whitespace-nowrap">
              <Link href="/articles" passHref>
                <button className="overflow-hidden gap-2.5  self-stretch px-4 my-auto font-medium rounded-lg border border-solid border-black border-opacity-40 min-h-[40px] text-zinc-800 w-[124px]">
                    Articles
                </button>
              </Link>
              <div className="overflow-hidden gap-2.5 pt-3 self-stretch px-4 my-auto font-bold text-white rounded-lg bg-zinc-800 min-h-[40px] w-[124px]">
                Magazines
              </div>
            </div>
        </div>
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
