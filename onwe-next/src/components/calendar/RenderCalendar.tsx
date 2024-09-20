"use client";
import { addMonths, format, subMonths } from "date-fns";
import EventCalendar from "./Calendar";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { useEffect, useState } from "react";
import axios from "axios";
import { Event } from "../../lib/types/event";
import { useSignIn } from "@/hooks/useSignIn";

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
  // const events = useSelector((state: RootState) => state.events.events);
  const { getToken } = useSignIn();
  const [events, setEvents] = useState<Event[]>([]);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/events`,
          {
            headers: {
              Authorization: `Bearer ${getToken()}`,
              "ngrok-skip-browser-warning": "69420",
            },
          }
        );
        console.log(response.data)
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="lg:px-10 flex flex-col gap-20 mt-3">
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
