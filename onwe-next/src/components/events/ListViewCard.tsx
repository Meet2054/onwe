import React from "react";
import Image from "next/image";

interface EventCardProps {
  title: string;
  subtitle: string;
  dateOfEvent: string;
  time: string;
  description: string;
  photo: string;
  onClick: () => void;
}
const formatDate = (dateStr: string) => {
  const dateObj = new Date(dateStr);
  const day = dateObj.getDate();
  const month = dateObj.toLocaleString("default", { month: "short" });

  // Pad day with leading zero if needed
  const formattedDay = day < 10 ? `0${day}` : `${day}`;

  return { day: formattedDay, month };
};

// eslint-disable-next-line react/display-name
const ListViewCard = React.forwardRef<HTMLDivElement, EventCardProps>(
  ({ title, subtitle, dateOfEvent, time, description, onClick }, ref) => {
    const { day, month } = formatDate(dateOfEvent);
    return (
      <div
        ref={ref}
        onClick={onClick}
        className="w-[43dvw] h-16 rounded-lg mb-3 flex"
      >
        <div className="w-20 h-full">
          <button className="border ml-2 mt-1 p-1 px-2.5 bg-gray-200 rounded-xl ">
            <h1 className="text-lg font-extrabold">{day}</h1>
            <h1 className="text-[10px] font-semibold mt-[-4px]">{month}</h1>
          </button>
        </div>
        <div className="h-full grow flex justify-between border-b-2">
          <div className="w-52 h-full flex flex-col">
            <h1 className="text-lg font-medium">{title}</h1>
            <h1 className="text-sm mt-1 text-gray-500">{subtitle}</h1>
          </div>
          <div className="w-20 h-full flex justify-center items-center">
            <button className="border text-[12px] bg-gray-200 rounded-full p-1 pl-2 pr-2">
              +remind
            </button>
          </div>
        </div>
      </div>
    );
  }
);

export default ListViewCard;
