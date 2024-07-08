"use client";
import { addMonths, format, subMonths } from "date-fns";
import EventCalendar from "./Calendar";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth, useUser } from "@clerk/nextjs";
import { Event } from "../../lib/types/event";



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
  const { getToken } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("https://eb64-117-198-141-197.ngrok-free.app/events", {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
            "ngrok-skip-browser-warning": "69420"
          },
        });
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [getToken]);

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
