/* eslint-disable react/display-name */
import React from "react";
import Image from "next/image";
import { checkVidImg } from "@/lib/utils";

interface EventCard2Props {
  title: string;
  subtitle: string;
  dateOfEvent: string;
  time: string;
  description: string;
  media: string[];
  onClick: () => void;
}

const EventCard2 = React.forwardRef<HTMLDivElement, EventCard2Props>(
  (
    { title, subtitle, dateOfEvent, time, description, media, onClick },
    ref
  ) => {
    console.log("media:",media[0])
    return (
      <div
        ref={ref}
        onClick={onClick}
        className="w-4/5 h-[180px] rounded-lg mb-3 flex"
      >
        <div
          className="border w-[190px] rounded-xl"
          style={{
            backgroundImage: `url("${(media[0])}")`,
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        <div className="ml-3 grow">
          <div className=" flex-col justify-start items-start gap-4 inline-flex">
            <div className="flex-col justify-start items-start gap-0 flex">
              <div className="text-black text-lg font-bold capitalize">
                {title}
              </div>
              <div className=" text-red-500 text-[14px] font-semibold uppercase ">
                {new Date(dateOfEvent)
                  .toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                  .toUpperCase()}
                , {time}
              </div>
            </div>
            <div className="w-72 h-16 text-black text-sm font-normal">
              {subtitle}
              <br />
              {description}
            </div>
            <div className=" w-72 justify-between items-center inline-flex">
              <div className=" w-9 h-8 px-3 py-2 rounded-2xl border border-black/opacity-20 justify-center items-center gap-2.5 flex">
                <button className="text-black text-sm font-medium">i</button>
              </div>
              <div className="h-8 justify-end items-center gap-2.5 flex">
                <div className="w-20 px-3 py-2 rounded-2xl border border-black/opacity-20 justify-center items-center gap-2.5 flex">
                  <button className="whitespace-nowrap text-black text-sm font-normal">
                    + remind
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default EventCard2;

{
  /* <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold">{title}</h2>
        <div className="flex space-x-3">
            <button className="px-2 py-1 border rounded-full text-gray-700">i</button>
            <button className="px-3 py-1 border rounded-full text-gray-700">+ remind</button>
        
        </div>
      </div>
      <div className="text-gray-600 mb-4">
        {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase()}, {time}
      </div>
      {/* <div className="flex space-x-2 mb-4">
      {photos.map((photo, index) => (
  <div key={index} className="w-1/2 h-52 bg-gray-200 rounded-2xl relative overflow-hidden" style={{ backgroundImage: `url(${photo})`,  backgroundSize: '100% 100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}> */
}
{
  /* </div> */
}
{
  /* ))} */
}
{
  /* </div> */
}
// <div className="text-gray-700 mb-4">
//     {description}
// </div> *
