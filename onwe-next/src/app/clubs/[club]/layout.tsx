import { Info } from "lucide-react";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="w-full h-[7vh] items-center border  bg-white flex justify-around py-5">
        <div className="font-bold">Events</div>
        <div className="flex gap-x-2">
          <div className="bg-black text-white px-6 py-1 rounded-full flex items-center">
            General
          </div>
          <div className="bg-black text-white px-6 py-1 rounded-full flex items-center">
            Announcements
          </div>
        </div>
        <div>
          <Info />
        </div>
      </div>
      <div className="bg-[#F1F3F5] h-screen">{children}</div>
    </>
  );
};

export default layout;
