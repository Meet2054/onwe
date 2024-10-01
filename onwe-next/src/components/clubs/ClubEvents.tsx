"use client";
import React, { useRef, useState, useEffect } from "react";
import useSWR from "swr";
import axios from "axios";
import EventCard2 from "@/components/events/EventCard2";
import ListViewCard from "@/components/events/ListViewCard";
import { ViewSelect } from "@/components/events/ViewSelect";
import RenderCalendar from "@/components/calendar/RenderCalendar";
import ActiveComponent from "@/components/events/ActiveComponent";
import { Event } from "../../lib/types/event";
import { LoaderCircle } from "lucide-react";
import { useSignIn } from "@/hooks/useSignIn";

// Fetcher function that includes token in headers
const fetcher = async (url: string, token: string) => {
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "69420",
    },
  });
  return response.data;
};

const ClubEvents: React.FC<{club:string}> = ({club}) => {
  const { getToken } = useSignIn();
  const [listview, setListView] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const eventRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Fetch token and set it in state
  useEffect(() => {
    const fetchToken = async () => {
      const fetchedToken = getToken();
      setToken(fetchedToken);
    };
    fetchToken();
  }, [getToken]);

  // Use SWR to fetch events
  const { data: events, error } = useSWR(
    token ? `${process.env.NEXT_PUBLIC_API_URL}/clubs/events/${club}` : null,
    (url) => fetcher(url, token!)
  );

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">Failed to load events</div>
      </div>
    );
  }

  if (!events) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderCircle className="animate-spin" />
      </div>
    );
  }

  const scrollToEvent = (eventId: number) => {
    const eventIndex = events.findIndex((event: Event) => event.id === eventId);
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
    setCurrentEvent(event);
  };

  const handleCloseActiveComponent = () => {
    setCurrentEvent(null);
  };

  return (
    <div className="flex h-[95vh] overflow-hidden ">
      <div className="flex flex-col w-[96vw] sm:w-full md:w-3/5 h-full bg-white z-10 rounded-xl m-2 mt-20">
        <div className="md:py-4 top-0 sticky bg-white md:px-8 md:ml-12 rounded-xl">
          <div className="flex space-x-6 ml-2 mr-2 md:ml-4">
            <ViewSelect onClick={toggleListView} />
          </div>
        </div>
        <div className="md:p-4 w-[96vw] sm:w-full h-[86vh] bg-white pt-6 md:ml-0 ">
          <div
            ref={containerRef}
            className="md:p-8 mb-2 w-full relative overflow-y-auto scrollbar-custom h-full"
          >
            <div
              className={`transition-opacity duration-500 ${
                isTransitioning ? "opacity-0" : "opacity-100"
              }`}
            >
              {events?.map((event: Event, index: number) =>
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
      <div className="md:flex flex-col w-2/5 h-full m-2 ml-0 bg-white rounded-xl hidden mt-20 overflow-scroll">
        <div className="text-center pt-2 font-semibold">Calendar</div>
        <RenderCalendar events={events} scrollToEvent={scrollToEvent} />
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

export default ClubEvents;