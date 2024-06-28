import { FC, useEffect, useState } from "react";
import {
  endOfMonth,
  format,
  getDay,
  startOfMonth,
  isSameMonth,
  parseISO,
  isSameDay,
  parse,
} from "date-fns";
import { Event } from "@/lib/types/event";
import { cn } from "@/lib/utils";
interface EventCalendarProps {
  month: string;
  events: Event[];
  scrollToEvent: (eventId: number) => void;
}

const EventCalendar: FC<EventCalendarProps> = ({
  events,
  month: current,
  scrollToEvent,
}) => {
  // console.log(events);

  const currentDate = new Date();
  const currentMonthDate = format(new Date(), "MMMM yyyy");

  const currentMonthDate2 = parse(current, "MMMM yyyy", new Date());

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
    <div className="container py-2 text-black">
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
                ? "hover:bg-gray-200 opacity-80 text-black text-sm font-medium"
                : "";

            const date = new Date(
              currentMonthDate2.getFullYear(),
              currentMonthDate2.getMonth(),
              Number(val.i)
            );

            const hasEvent = events.some((event) =>
              isSameDay(parseISO(event.date), date)
            );

            let eventBackground = "";
            if (hasEvent) {
              const event = events.find((event) =>
                isSameDay(parseISO(event.date), date)
              );
              if (event?.bg) {
                eventBackground = `bg-[#${event.bg.toLowerCase()}]`;
              }
            }
            return (
              <div
                className="flex justify-center"
                // onClick={() => {

                //   if (!hoverClass) return;
                //   setIsOpen(!isOpen);
                // }}
                onClick={() => {
                  if (hasEvent) {
                    const event = events.find((event) =>
                      isSameDay(parseISO(event.date), date)
                    );
                    if (event) scrollToEvent(event.id);
                  }
                }}
                key={index}
              >
                <span
                  className={`flex flex-col justify-center items-center w-8 h-8 rounded-full
                    opacity-80 text-black text-sm font-medium ${hoverClass}
                    ${
                      currentDay == val.i && isSameMonth(current, new Date())
                        ? "bg-black text-white"
                        : ""
                    } ${eventBackground}`}
                >
                  {val.i}
                  {hasEvent && !eventBackground ? (
                    <span className="size-1 bg-red-500 rounded-full" />
                  ) : (
                    <span className={eventBackground} />
                  )}
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
