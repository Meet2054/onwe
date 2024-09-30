"use client";
import React, { useState } from "react";
import { Calendar, Info } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setClubTab } from "@/lib/features/clubs/tabSlice";
import { RootState } from "@/lib/store";
import EventForm from "@/components/clubs/EventForm"

const GeneralAnnounce = ({ club,isAdmin }: { club: string, isAdmin:boolean }) => {
  const dispatch = useDispatch();
  const tab = useSelector((state: RootState) => state.tab.tab);
  const [isFormOpen, setFormOpen] = useState(false)

  const toggleForm = ()=>{
    setFormOpen(!isFormOpen)
  }
  const handleTabClick = (tab: string) => {
    dispatch(setClubTab(tab));
  };

  return (
    <div className="z-10 sm:ml-0 sm:w-[72%] bg-white w-full fixed overflow-x-auto">
      <div className="w-full h-[8.05vh] items-center justify-between  border flex py-5">
        {/* <div className="pl-10 font-bold text-lg">Events</div> */}
        <div className="flex sm:gap-x-2 gap-x-3 items-center ml-6">
          <div
            className={`px-6 py-1 rounded-full flex items-center cursor-pointer text-sm sm:text-lg  ${
              tab === "general"
                ? "bg-black text-white"
                : "bg-white text-black border"
            }`}
            onClick={() => handleTabClick("general")}
          >
            General
          </div>
          <div
            className={`px-2 sm:px-6 py-1 rounded-full flex items-center cursor-pointer text-sm sm:text-lg ${
              tab === "announcement"
                ? "bg-black text-white"
                : "bg-white text-black border"
            }`}
            onClick={() => handleTabClick("announcement")}
          >
            Announcements
          </div>
          <div
            className={`px-2 sm:px-6 py-1 rounded-full flex items-center cursor-pointer text-sm sm:text-lg ${
              tab === "events"
                ? "bg-black text-white"
                : "bg-white text-black border"
            }`}
            onClick={() => handleTabClick("events")}
          >
            Events
          </div>
          {isAdmin &&<div className="px-2 sm:px-6 py-1 rounded-full flex items-center cursor-pointer text-sm sm:text-lg" onClick={toggleForm}>
              +<Calendar/>
          </div>}
        </div>
        <div className="flex items-center">
          <div className="mr-2 bg-white sm:px-8 px-2 py-2 rounded-xl shadow border">
            {club}
          </div>
          <div className="pr-8 ml-2">
            <Info />
          </div>
        </div>
      </div>
      <EventForm isOpen={isFormOpen} onClose={toggleForm} />
    </div>
  );
};

export default GeneralAnnounce;
