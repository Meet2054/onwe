"use client";
import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../lib/store";
import { filterEvents } from "../../lib/features/events/eventsSlice";
import EventCard from "@/components/events/EventCard";
import axios from "axios";

import { Event } from "../../lib/types/event";

import RenderCalendar from "@/components/calendar/RenderCalendar";
import EventCard2 from "@/components/events/EventCard2";
import ListViewCard from "@/components/events/ListViewCard";
import { ViewSelect } from "@/components/events/ViewSelect";
import { useAuth, useUser } from "@clerk/nextjs";
import ActiveComponent from "@/components/events/ActiveComponent";

const Page: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  // const events = useSelector((state: RootState) => state.events.events);
  const [events, setEvents] = useState<Event[]>([]);
  const [listview, setListView] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const eventRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { getToken } = useAuth();
  

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("https://notable-redbird-tender.ngrok-free.app/events", {
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


  const handleFilter = (filterType: string) => {
    dispatch(filterEvents({ filterType }));
  };

  const scrollToEvent = (eventId: number) => {
    const eventIndex = events.findIndex((event) => event.id === eventId);
    const eventElement = eventRefs.current[eventIndex];

    if (eventElement && containerRef.current) {
      const topPos = eventElement.offsetTop - containerRef.current.offsetTop;
      containerRef.current.scrollTo({
        top: topPos,
        behavior: "smooth",
      });

      eventElement.classList.add(
        "border",
        "rounded-xl",
        "scale-105",
        "transition-all",
        "ease-in-out",
        "duration-500"
      );

      setTimeout(() => {
        // eventElement.classList.add(
        //   "transition-all",
        //   "ease-in-out",
        //   "duration-500"
        // );
        eventElement.classList.remove("scale-105", "border-rose-300");
      }, 500);

      setTimeout(() => {
        eventElement.classList.remove(
          "border",
          "rounded-xl",
          "transition-all",
          "ease-in-out",
          "duration-1000"
        );
      }, 1500);
    }
  };

  const toggleListView = (currentView: string) => {
    if (currentView === "comfort" && !listview) return;
    if (currentView === "list" && listview) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setListView(!listview);
      setIsTransitioning(false);
    }, 500);
  };

  const handleEventClick = (event: Event) => {
    console.log("Event clicked:", event);
    setCurrentEvent(event);
  };
  const handleCloseActiveComponent = () => {
    setCurrentEvent(null);
  };

  return (
    <div className="flex">
      <div className="bg-white flex flex-col w-3/5">
        <div className="py-4 top-0 sticky bg-white px-8 ml-12">
          <div className="flex space-x-6 ml-4">
            {/* <button
              onClick={() => handleFilter("upcoming")}
              className="border rounded-full text-sm p-2 px-3 active:bg-black"
            >
              Upcoming Events
            </button>
            <button
              onClick={() => handleFilter("past")}
              className="border rounded-full text-sm p-2 px-3 active:bg-black"
            >
              Past Events
            </button>
            <button
              onClick={() => handleFilter("remainder")}
              className="border rounded-full text-sm p-2 px-3 active:bg-black"
            >
              My Remainders
            </button> */}

            {/* <button
              onClick={toggleListView}
              className="border rounded-full text-sm p-2 px-3 ml-20 active:bg-black"
            >
              List View
            </button> */}
            <ViewSelect onClick={toggleListView} />
          </div>
        </div>
        <div className="p-4 w-full h-screen ml-12">
          <div
            ref={containerRef}
            className="p-8 mb-2 w-full relative overflow-y-auto h-full"
          >
            {/* Adjust maxHeight value as needed */}
            <div
              className={`transition-opacity duration-500 ${
                isTransitioning ? "opacity-0" : "opacity-100"
              }`}
            >
              {events?.map((event: Event, index) =>
                listview ? (
                  <ListViewCard
                    key={index}
                    {...event}
                    ref={(el) => (eventRefs.current[index] = el)}
                    onClick={() => handleEventClick(event)}
                  />
                ) : (
                  <EventCard2
                    key={index}
                    {...event}
                    ref={(el) => (eventRefs.current[index] = el)}
                    onClick={() => handleEventClick(event)}
                  />
                )
              )}
            </div>
            <div className="size-20"></div>
          </div>
        </div>
      </div>
      <div className="w-2/5">
        <RenderCalendar scrollToEvent={scrollToEvent} />
      </div>
      {currentEvent && (
        <ActiveComponent
          currentEvent={currentEvent}
          onClose={handleCloseActiveComponent}
        />
      )}
    </div>
  );
};

export default Page;
