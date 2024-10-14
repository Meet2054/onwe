import React, { useEffect, useState } from "react";
import useSWR from "swr";
import axios from "axios";
import ListViewCard from "@/components/events/ListViewCard";
import { EventCardHome } from "@/types/type";
import ListViewHome from "@/components/events/ListViewHome";
import { useSignIn } from "@/hooks/useSignIn";

const fetcher = async (url: string, token: string) => {
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "69420",
    },
  });
  return response.data;
};

const Right3 = () => {
  const [upcomingEvents, setUpcomingEvents] = useState<EventCardHome[]>([]);

  const { data, error } = useSWR("/events", {
    onSuccess: (data) => {
      setUpcomingEvents(data);
    },
  });

  return (
    <div>
      <div className="w-full">
        <div className="pl-4 pt-2 border-l-4 border-black">
          <span className="text-xl ">Upcoming Events</span>
        </div>
        <div className="flex flex-col  space-y-2 mt-4">
          {upcomingEvents.map(
            (uevent, index) =>
              index < 3 && <ListViewHome key={uevent.id} event={uevent} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Right3;
