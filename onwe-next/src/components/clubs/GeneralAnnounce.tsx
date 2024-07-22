"use client"
import React from 'react'
import { Info } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setClubTab } from "@/lib/features/clubs/tabSlice";
import { RootState } from "@/lib/store";

const GeneralAnnounce = () => {
  const dispatch = useDispatch();
  const tab = useSelector((state: RootState) => state.tab.tab);

  const handleTabClick = (tab: string) => {
    dispatch(setClubTab(tab));
  };

  return (
    <div>
      <div className="w-full h-[7vh] items-center border bg-white flex justify-around py-5">
        <div className="font-bold">Events</div>
        <div className="flex gap-x-2">
          <div
            className={`px-6 py-1 rounded-full flex items-center cursor-pointer ${tab === "general" ? "bg-black text-white" : "bg-white text-black border"}`}
            onClick={() => handleTabClick("general")}
          >
            General
          </div>
          <div
            className={`px-6 py-1 rounded-full flex items-center cursor-pointer ${tab === "announcements" ? "bg-black text-white" : "bg-white text-black border"}`}
            onClick={() => handleTabClick("announcements")}
          >
            Announcements
          </div>
        </div>
        <div>
          <Info />
        </div>
      </div>
    </div>
  );
}

export default GeneralAnnounce;
