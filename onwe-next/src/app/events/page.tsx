// "use client";
// import React, { useRef, useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState, AppDispatch } from "../../lib/store";
// import { filterEvents } from "../../lib/features/events/eventsSlice";
// import EventCard from "@/components/events/EventCard";
// import axios from "axios";

// import { Event } from "../../lib/types/event";

// import RenderCalendar from "@/components/calendar/RenderCalendar";
// import EventCard2 from "@/components/events/EventCard2";
// import ListViewCard from "@/components/events/ListViewCard";
// import { ViewSelect } from "@/components/events/ViewSelect";
// import { useAuth, useUser } from "@clerk/nextjs";
// import ActiveComponent from "@/components/events/ActiveComponent";

// const Page: React.FC = () => {
//   const dispatch: AppDispatch = useDispatch();
//   // const events = useSelector((state: RootState) => state.events.events);
//   const [events, setEvents] = useState<Event[]>([]);
//   const [listview, setListView] = useState(false);
//   const [isTransitioning, setIsTransitioning] = useState(false);

//   const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
//   const eventRefs = useRef<(HTMLDivElement | null)[]>([]);
//   const containerRef = useRef<HTMLDivElement | null>(null);
//   const { getToken } = useAuth();

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/events`, {
//           headers: {
//             Authorization: `Bearer ${await getToken()}`,
//             "ngrok-skip-browser-warning": "69420"
//           },
//         });
//         setEvents(response.data);
//       } catch (error) {
//         console.error("Error fetching events:", error);
//       }
//     };

//     fetchEvents();
//   }, [getToken]);

//   const handleFilter = (filterType: string) => {
//     dispatch(filterEvents({ filterType }));
//   };

//   const scrollToEvent = (eventId: number) => {
//     const eventIndex = events.findIndex((event) => event.id === eventId);
//     const eventElement = eventRefs.current[eventIndex];

//     if (eventElement && containerRef.current) {
//       const topPos = eventElement.offsetTop - containerRef.current.offsetTop;
//       containerRef.current.scrollTo({
//         top: topPos,
//         behavior: "smooth",
//       });

//       eventElement.classList.add(
//         "border",
//         "rounded-xl",
//         "scale-105",
//         "transition-all",
//         "ease-in-out",
//         "duration-500"
//       );

//       setTimeout(() => {
//         // eventElement.classList.add(
//         //   "transition-all",
//         //   "ease-in-out",
//         //   "duration-500"
//         // );
//         eventElement.classList.remove("scale-105", "border-rose-300");
//       }, 500);

//       setTimeout(() => {
//         eventElement.classList.remove(
//           "border",
//           "rounded-xl",
//           "transition-all",
//           "ease-in-out",
//           "duration-1000"
//         );
//       }, 1500);
//     }
//   };

//   const toggleListView = (currentView: string) => {
//     if (currentView === "comfort" && !listview) return;
//     if (currentView === "list" && listview) return;
//     setIsTransitioning(true);
//     setTimeout(() => {
//       setListView(!listview);
//       setIsTransitioning(false);
//     }, 500);
//   };

//   const handleEventClick = (event: Event) => {
//     console.log("Event clicked:", event);
//     setCurrentEvent(event);
//   };
//   const handleCloseActiveComponent = () => {
//     setCurrentEvent(null);
//   };

//   return (
//     <div className="flex">
//       <div className="bg-white flex flex-col w-3/5">
//         <div className="py-4 top-0 sticky bg-white px-8 ml-12">
//           <div className="flex space-x-6 ml-4">
//             {/* <button
//               onClick={() => handleFilter("upcoming")}
//               className="border rounded-full text-sm p-2 px-3 active:bg-black"
//             >
//               Upcoming Events
//             </button>
//             <button
//               onClick={() => handleFilter("past")}
//               className="border rounded-full text-sm p-2 px-3 active:bg-black"
//             >
//               Past Events
//             </button>
//             <button
//               onClick={() => handleFilter("remainder")}
//               className="border rounded-full text-sm p-2 px-3 active:bg-black"
//             >
//               My Remainders
//             </button> */}

//             {/* <button
//               onClick={toggleListView}
//               className="border rounded-full text-sm p-2 px-3 ml-20 active:bg-black"
//             >
//               List View
//             </button> */}
//             <ViewSelect onClick={toggleListView} />
//           </div>
//         </div>
//         <div className="p-4 w-full h-screen ml-12">
//           <div
//             ref={containerRef}
//             className="p-8 mb-2 w-full relative overflow-y-auto h-full"
//           >
//             {/* Adjust maxHeight value as needed */}
//             <div
//               className={`transition-opacity duration-500 ${
//                 isTransitioning ? "opacity-0" : "opacity-100"
//               }`}
//             >
//               {events?.map((event: Event, index) =>
//                 listview ? (
//                   <ListViewCard
//                     key={index}
//                     {...event}
//                     ref={(el) => (eventRefs.current[index] = el)}
//                     onClick={() => handleEventClick(event)}
//                   />
//                 ) : (
//                   <EventCard2
//                     key={index}
//                     {...event}
//                     ref={(el) => (eventRefs.current[index] = el)}
//                     onClick={() => handleEventClick(event)}
//                   />
//                 )
//               )}
//             </div>
//             <div className="size-20"></div>
//           </div>
//         </div>
//       </div>
//       <div className="w-2/5">
//         <RenderCalendar scrollToEvent={scrollToEvent} />
//       </div>
//       {currentEvent && (
//         <ActiveComponent
//           currentEvent={currentEvent}
//           onClose={handleCloseActiveComponent}
//         />
//       )}
//     </div>
//   );
// };

// export default Page;
"use client";
import React, { useRef, useState, useEffect } from "react";
import useSWR from "swr";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import EventCard2 from "@/components/events/EventCard2";
import ListViewCard from "@/components/events/ListViewCard";
import { ViewSelect } from "@/components/events/ViewSelect";
import RenderCalendar from "@/components/calendar/RenderCalendar";
import ActiveComponent from "@/components/events/ActiveComponent";
import { Event } from "../../lib/types/event";
import { Ban, LoaderCircle } from "lucide-react";
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

const Page: React.FC = () => {
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
  }, []);

  // Use SWR to fetch events
  const { data: events, error } = useSWR(
    token ? `${process.env.NEXT_PUBLIC_API_URL}/events` : null,
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
    <div className="flex bg-[#F1F1F1] sm:overflow-y-hidden">
      <div className="flex flex-col w-[96vw] sm:w-full md:w-3/5 h-[97vh] bg-white z-10 rounded-xl m-2">
        <div className="md:py-4 top-0 sticky bg-white md:px-8 md:ml-12 rounded-xl">
          <div className="flex space-x-6 ml-2 mr-2 md:ml-4">
            <ViewSelect onClick={toggleListView} />
          </div>
        </div>
        <div className="md:p-4 w-[96vw] sm:w-full h-[86vh] bg-white pt-6 md:ml-0 ">
          <div
            ref={containerRef}
            className="md:p-8 mb-2 w-full relative overflow-y-auto h-full"
          >
            <div
              className={`transition-opacity duration-500${isTransitioning ? "opacity-0" : "opacity-100"
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
      <div className="md:flex flex-col w-2/5 h-[97vh] m-2 ml-0 bg-white rounded-xl hidden">
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


export default Page;
