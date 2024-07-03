import React from "react";
import Image from "next/image";

interface EventCardProps {
  title: string;
  subtitle: string;
  date: string;
  time: string;
  description: string;
  photo: string;
  onClick: () => void
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
  ({ title, subtitle, date, time, description, onClick }, ref) => {
    const { day, month } = formatDate(date);
    return (
      <div ref={ref} onClick={onClick}  className="w-[43dvw] h-24 rounded-lg mb-3 flex">
        <div className="w-20 h-full">
          <button className="border ml-5 mt-1 p-1 px-1 bg-gray-200 rounded-xl">
            <h1 className="text-xl">{day}</h1>
            <h1 className="text-sm">{month}</h1>
          </button>
        </div>
        <div className="h-full grow flex justify-between border-b">
          <div className="w-52 h-full flex flex-col">
            <h1 className="text-xl">{title}</h1>
            <h1 className="text-lg mt-3 text-gray-500">{subtitle}</h1>
          </div>
          <div className="w-20 h-full flex justify-center items-center">
            <button className="border text-sm bg-gray-200 rounded-full p-1">
              +remind
            </button>
          </div>
        </div>
      </div>
    );
  }
);

export default ListViewCard;
