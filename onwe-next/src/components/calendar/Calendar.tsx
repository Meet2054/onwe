import { FC, useState } from "react";
import {
  endOfMonth,
  format,
  getDay,
  startOfMonth,
  parse,
  isSameMonth,
} from "date-fns";

interface EventCalendarProps {
  month: string;
}

const EventCalendar: FC<EventCalendarProps> = ({ month: current }) => {
  const currentDate = new Date();
  const currentMonthDate = format(new Date(), "MMMM yyyy");

  const lastDayOfMonth = parseInt(format(endOfMonth(currentMonthDate), "d"));
  const firstDay = getDay(startOfMonth(currentMonthDate));

  let monthArray: { i: number | string }[] = [];

  for (let i = 0; i < firstDay; i++) {
    monthArray.push({ i: "" });
  }
  for (let i = 1; i <= lastDayOfMonth; i++) {
    monthArray.push({ i });
  }

  const currentDay = format(currentDate, "d");

  return (
    <div className="container py-2  text-black">
      <div>
        <h2 className="text-start text-lg">{format(current, "MMMM")}</h2>
        <div className="flex items-center justify-center grid grid-cols-7 gap-1 mt-3">
          {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
            <div
              key={index}
              className="text-red-500 text-sm font-semibold text-center"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="w-full border border-gray-400 mt-3 opacity-30"></div>
        <div className="grid grid-cols-7 gap-3 mt-1">
          {monthArray.map((val, index) => {
            const [isOpen, setIsOpen] = useState<boolean>(false);
            const hoverClass =
              val.i !== ""
                ? "hover:bg-black hover:text-white opacity-80 text-black text-sm font-medium"
                : "";
            return (
              <div
                className="flex justify-center"
                onClick={() => {
                  if (!hoverClass) return;
                  setIsOpen(!isOpen);
                }}
                key={index}
              >
                <span
                  className={`flex flex-col justify-center items-center w-8 h-8 rounded-full
                    opacity-80 text-black text-sm font-medium ${hoverClass}
                    ${
                      currentDay == val.i && isSameMonth(current, new Date())
                        ? "bg-blue-800 text-yellow-400"
                        : ""
                    }
                    ${isOpen ? "bg-black text-white" : ""}`}
                >
                  {val.i}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EventCalendar;
