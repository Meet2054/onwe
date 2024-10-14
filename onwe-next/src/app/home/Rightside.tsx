"use client";
import Right1 from "@/components/home/Right/Right1";
import Right2 from "@/components/home/Right/RIght2";
import Right3 from "@/components/home/Right/Right3";
import RightArticles from "@/components/home/Right/RightArticles";
const Rightside = () => {
  return (
    <div className="flex px-2 pt-3 h-screen w-full  items-center content-center bg-white">
      <div className="flex flex-col gap-4 w-full h-screen overflow-y-auto scrollbar-custom pr-1">
        <RightArticles />
        
        <Right2/>
        <Right3/>
        <Right1/>
        {/* <RightArticles /> */}
      </div>
    </div>
  );
};

export default Rightside;
