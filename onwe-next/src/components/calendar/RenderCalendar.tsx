"use client";
import { addMonths, format, subMonths } from "date-fns";
import EventCalendar from "./Calendar";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

const current = new Date();
const prevMonth_2 = subMonths(current, 2);
const prevMonth = subMonths(current, 1);
const nextMonth = addMonths(current, 1);
const nextMonth_2 = addMonths(current, 2);

const monthArray = [current, nextMonth].map((date) =>
  format(date, "MMMM yyyy").toLocaleUpperCase()
);

function RenderCalendar({
  scrollToEvent,
}: {
  scrollToEvent?: (eventId: number) => void;
}) {
  const events = useSelector((state: RootState) => state.events.events);

  return (
    <div className="px-10">
      {monthArray.map((month, index) => (
        <EventCalendar
          events={events}
          key={index}
          month={month}
          scrollToEvent={scrollToEvent!}
        />
      ))}
    </div>
  );
}

export default RenderCalendar;
