"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../lib/store";
import { filterEvents } from "../../lib/features/events/eventsSlice";
import EventCard from "@/components/events/EventCard";

import { Event } from "../../lib/types/event";
import EventCalendar from "@/components/calendar/Calendar";
import RenderCalendar from "@/components/calendar/RenderCalendar";
import EventCard2 from "@/components/events/EventCard2";

const Page: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const events = useSelector((state: RootState) => state.events.events);

  const handleFilter = (filterType: string) => {
    dispatch(filterEvents({ filterType }));
  };

  const [listview, setListView] = useState(false);

  return (
    <div className="flex">
      <div className="bg-white flex flex-col w-3/5">
        <div className="top-0 sticky bg-white p-4  ml-12 ">
          <div className="flex space-x-6 ml-4">
            <button
              onClick={() => handleFilter("upcoming")}
              className="border rounded-full text-sm p-1 active:bg-black"
            >
              Upcoming Events
            </button>
            <button
              onClick={() => handleFilter("past")}
              className="border rounded-full text-sm p-1 active:bg-black"
            >
              Past Events
            </button>
            <button
              onClick={() => handleFilter("remainder")}
              className="border rounded-full text-sm p-1 active:bg-black"
            >
              My Remainders
            </button>

            <button
              onClick={() => setListView(!listview)}
              className="border rounded-full text-sm p-1 ml-20  active:bg-black"
            >
              List View
            </button>
          </div>
        </div>
        <div className="p-4 w-full h-screen ml-12 ">
          <div className="p-4 mb-2 w-full relative overflow-y-auto h-full ">
            {/* Adjust maxHeight value as needed */}
            {events.map((event: Event) => (
              <EventCard2 key={event.id} {...event} />
            ))}
            <div className="size-20"></div>
          </div>
        </div>
      </div>
      <div className="w-2/5">
        <RenderCalendar />
      </div>
    </div>
  );
};

export default Page;
