import React from "react";
import RenderCalendar from "../calendar/RenderCalendar";

interface ClubCalendarProps {
  club: string;
}

const ClubEvents = ({ club }: ClubCalendarProps) => {
  return (
    <div className="w-full  grid grid-cols-5">
      <div className="col-span-3  h-screen"></div>
      <div className="col-span-2 h-screen flex items-center justify-center">
        <RenderCalendar />
      </div>
    </div>
    // <div className="bg-red-400 w-full h-screen flex items-center justify-center">
    // <RenderCalendar />
    // </div>
  );
};

export default ClubEvents;
