"use client";
import Image from "next/image";
import rect from "./rightsideImages/Rectangle.png";
import party from "./rightsideImages/party.png";
const rightside = () => {
  return (
    <div className="flex px-4 h-screen items-center content-center bg-white">
      <div className="flex flex-col w-full h-[96vh]">
        <div className="w-full h-[40vh] relative">
          <Image src={rect} alt="" className="w-full h-full rounded-xl" />
          <div className="absolute top-2 left-3 text-white text-lg">
            Trending
            <span className="text-[10px] ml-2 border rounded-2xl py-1 px-3">
              club
            </span>
          </div>
          <div className="absolute w-[93%] h-16 top-12 left-3 bg-white rounded-xl flex items-center gap-3 pl-4">
            <Image src={rect} alt="" className="w-[40px] rounded-xl" />
            <div className="flex flex-col">
              <span>common activities</span>
              <span className="text-">PU</span>
            </div>
          </div>
          <div className="absolute w-[93%] h-16 top-32 left-3 bg-white rounded-xl"></div>
          <div className="absolute w-[93%] h-16 top-52 left-3 bg-white rounded-xl"></div>
        </div>
        <div className="w-full h-[20vh] mt-4 bg-[#EBF0FD] flex flex-col items-start justify-center pl-5 rounded-xl">
          <div className="flex items-center gap-1">
            <Image src={party} alt="" className="w-[25px]" />
            <span className="font-extrabold text-lg">Join the Fun</span>
          </div>
          <span>
            Discover amazing clubs and connect with like-minded people. Start
            your adventure now!
          </span>
        </div>
        <div className="w-full h-[40vh] mt-4 ">
          <div className="pl-4 pt-2 border-l-4 border-black">
            <span className="text-xl ">June , 2024</span>
          </div>
          <div className="w-full mt-4 h-[70px] bg-black flex items-center justify-between pl-4 pr-4 rounded-2xl  text-white">
            <div className="flex gap-4">
              <div className="flex flex-col bg-white px-3 text-black rounded-xl">
                <span className="text-lg font-extrabold">24</span>
                <span className="text-[12px]">Jun</span>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold">Summer Night!</span>
                <span className="font-extralight">EDM Party</span>
              </div>
            </div>
            <div className=" bg-[#DCDCDC] px-3 py-1 rounded-2xl">
              <img src="" alt="" />
              <span className="text-black">remind</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default rightside;
