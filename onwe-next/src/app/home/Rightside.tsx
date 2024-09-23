"use client";
import Right1 from "@/components/home/Right/Right1";
import Right2 from "@/components/home/Right/RIght2";
import Right3 from "@/components/home/Right/Right3";
const Rightside = () => {
  return (
    <div className="flex px-4 pt-3 max-h-screen overflow-none scrollbar-hide items-center content-center bg-white">
      <div className="flex flex-col w-full h-[96vh]">
        <Right1/>
        <Right2/>
        <Right3/>
      </div>
    </div>
  );
};

export default Rightside;
