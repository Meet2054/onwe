import React from "react";

const PopularClubs = () => {
  return (
    <div className="p-2  mt-3 ">
      <div className="space-x-2">
        <span className="text-lg font-bold">Popular</span>
        <span className="px-4 py-[2px] text-base  font-semibold rounded-full border-2 border-black shadow-[3px_3px_0_0_#000]">
          CLUB
        </span>
      </div>
      <div className="w-full  mt-3 grid grid-cols-4 gap-3">
        <div className="w-full flex gap-x-2  items-center justify-between p-3  h-24 border rounded-lg border-2 border-black shadow-[2px_2px_0_0_#000]">
          <div className="size-16 border-2 border-black shadow-[2px_2px_0_0_#000] rounded-md"></div>
          <div className="   w-full h-full border-2 border-black shadow-[2px_2px_0_0_#000] rounded-md">
            s
          </div>
        </div>
        <div className="w-full flex gap-x-2  items-center justify-between p-3  h-24 border rounded-lg border-2 border-black shadow-[2px_2px_0_0_#000]">
          <div className="size-16 border-2 border-black shadow-[2px_2px_0_0_#000] rounded-md"></div>
          <div className="   w-full h-full border-2 border-black shadow-[2px_2px_0_0_#000] rounded-md">
            s
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularClubs;
