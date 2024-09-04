// import React from "react";
// // import rect from "../assets/Rectangle.png";
// // import party from "../assets/party.png";
// const RightCom = () => {
//   return (
//     <div className="flex px-4 h-screen items-center content-center bg-white">
//       <div className="flex flex-col w-full h-[96vh]">
//         <div className="w-full h-[40vh] relative">
//           <img src="" alt="" className="w-full h-full rounded-xl" />
//           <div className="absolute top-2 left-3 text-white text-lg">
//             Trending
//             <span className="text-[10px] ml-2 border rounded-2xl py-1 px-3">
//               club
//             </span>
//           </div>
//           <div className="absolute w-[93%] h-16 top-12 left-3 bg-white rounded-xl flex items-center gap-3 pl-4">
//             <img src="" alt="" className="w-[40px] rounded-xl" />
//             <div className="flex flex-col">
//               <span>common activities</span>
//               <span className="text-">PU</span>
//             </div>
//           </div>
//           <div className="absolute w-[93%] h-16 top-32 left-3 bg-white rounded-xl"></div>
//           <div className="absolute w-[93%] h-16 top-52 left-3 bg-white rounded-xl"></div>
//         </div>
//         <div className="w-full h-[20vh] mt-4 bg-[#EBF0FD] flex flex-col items-start justify-center pl-5 rounded-xl">
//           <div className="flex items-center gap-1">
//             <img src="" alt="" className="w-[25px]" />
//             <span className="font-extrabold text-lg">Join the Fun</span>
//           </div>
//           <span>
//             Discover amazing clubs and connect with like-minded people. Start
//             your adventure now!
//           </span>
//         </div>
//         <div className="w-full h-[40vh] mt-4 ">
//           <div className="pl-4 pt-2 border-l-4 border-black">
//             <span className="text-xl ">June , 2024</span>
//           </div>
//           <div className="w-full mt-4 h-[70px] bg-black flex items-center justify-between pl-4 pr-4 rounded-2xl  text-white">
//             <div className="flex gap-4">
//               <div className="flex flex-col bg-white px-3 text-black rounded-xl">
//                 <span className="text-lg font-extrabold">24</span>
//                 <span className="text-[12px]">Jun</span>
//               </div>
//               <div className="flex flex-col">
//                 <span className="font-extrabold">Summer Night!</span>
//                 <span className="font-extralight">EDM Party</span>
//               </div>
//             </div>
//             <div className=" bg-[#DCDCDC] px-3 py-1 rounded-2xl">
//               <img src="" alt="" />
//               <span className="text-black">remind</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RightCom;

"use client"

import React from "react";
import TrendingClubs from "../c/components/c/TrendingClubs";
import EventCalendar from "../c/components/c/EventCalendar";


const RightCom: React.FC = () => {
  return (
    <aside className="flex flex-col pt-5 pb-5 max-md:ml-0 max-md:w-full">
      <div className="flex flex-col max-md:mt-4">
        <TrendingClubs />
        <div className="flex flex-col justify-center items-center px-6 py-4 mt-5 tracking-normal text-black rounded-md min-h-[95px] max-md:px-5 max-md:mr-2">
          <div className="flex flex-col max-w-full w-[342px]">
            <h2 className="text-lg font-bold">🎉 Join the Fun</h2>
            <p className="mt-2 text-sm">
              Discover amazing clubs and connect with like-minded people. Start
              your adventure now!
            </p>
          </div>
        </div>
        <EventCalendar />
      </div>
    </aside>
  );
};

export default RightCom;