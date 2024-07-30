"use client";
import React from "react";
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
    <div className="ml-[53px] right-0 left-1/4 fixed z-10">
      <div className="w-full h-[8.05vh] items-center  border bg-white flex justify-between py-5">
        <div className="pl-10 font-bold text-lg">Events</div>
        <div className="flex gap-x-2">
          <div
            className={`px-6 py-1 rounded-full flex items-center cursor-pointer ${
              tab === "general"
                ? "bg-black text-white"
                : "bg-white text-black border"
            }`}
            onClick={() => handleTabClick("general")}
          >
            General
          </div>
          <div
            className={`px-6 py-1 rounded-full flex items-center cursor-pointer ${
              tab === "announcement"
                ? "bg-black text-white"
                : "bg-white text-black border"
            }`}
            onClick={() => handleTabClick("announcement")}
          >
            Announcements
          </div>
        </div>
        <div className="pr-10">
          <Info />
        </div>
      </div>
    </div>
  );
};

export default GeneralAnnounce;
