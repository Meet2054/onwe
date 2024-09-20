import { FC, useEffect, useRef, useState } from "react";
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
  console.log("events",events)
  const currentDate = new Date();
  const currentMonthDate = format(new Date(), "MMMM yyyy");

  const currentMonthDate2 = parse(current, "MMMM yyyy", new Date());

  const lastDayOfMonth = parseInt(format(endOfMonth(currentMonthDate2), "d"));
  const firstDay = getDay(startOfMonth(currentMonthDate2));

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
        <h2 className="text-start text-lg">
          {format(currentMonthDate2, "MMMM")}
        </h2>
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
            const eventBgRef = useRef<HTMLDivElement>(null);
            const date = new Date(
              currentMonthDate2.getFullYear(),
              currentMonthDate2.getMonth(),
              Number(val.i)
            );

            const hasEvent = events.some((event) =>
              isSameDay(parseISO(event.dateOfEvent), date)
            );

            const event = events.find((event) =>
              isSameDay(parseISO(event.dateOfEvent), date)
            );
            let eventBackground = "";
            if (hasEvent && event?.bg) {
              eventBackground = `bg-[#${event.bg.toLowerCase()}]`;
            }

            const isCurrentDay =
              currentDay === val.i.toString() &&
              isSameMonth(currentMonthDate2, currentDate);

            const hoverClass =
              val.i !== ""
                ? "hover:bg-gray-200 opacity-80 text-black text-sm font-medium"
                : "";

            const eventStyle = `${isCurrentDay ? "bg-black text-white" : ""} ${
              hasEvent && event?.bg ? `bg-[#${event.bg.toLowerCase()}]` : ""
            }`;

            // useEffect(() => {
            //   if (eventBgRef.current) {
            //     eventBgRef.current.style.backgroundColor = `#${event?.bg}`;
            //   }
            // });

            return (
              <div
                className="flex justify-center"
                onClick={() => {
                  if (hasEvent && event) {
                    scrollToEvent(event.id);
                  }
                }}
                key={index}
              >
                <span
                  className={`flex flex-col justify-center items-center w-8 h-8 rounded-full ${hoverClass} ${eventStyle}`}
                >
                  {hasEvent ? (
                    eventBackground ? (
                      <span
                        ref={eventBgRef}
                        className={`size-7 flex justify-center items-center rounded-full`}
                      >
                        {val.i}
                      </span>
                    ) : (
                      <span
                        className={`flex flex-col justify-center items-center`}
                      >
                        {val.i}
                        <span className="size-1 bg-red-600 flex rounded-full"></span>
                      </span>
                    )
                  ) : (
                    <span>{val.i}</span>
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
