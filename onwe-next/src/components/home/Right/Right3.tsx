import React, { useEffect, useState } from 'react'
import useSWR from "swr";
import axios from "axios";
import ListViewCard from "@/components/events/ListViewCard";
import { EventCardHome } from '@/types/type';
import ListViewHome from '@/components/events/ListViewHome';
import { useSignIn } from '@/hooks/useSignIn';

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
    console.log(upcomingEvents,"raaaaaaaaaa");
    
    const { getToken } = useSignIn();
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const fetchToken = async () => {
          const fetchedToken =  getToken();
          setToken(fetchedToken);
        };
        fetchToken();
      }, [getToken]);

      const { data, error } = useSWR(
        token ? `${process.env.NEXT_PUBLIC_API_URL}/events` : null,
        (url) => fetcher(url, token!)
      );
    
      useEffect(() => {
        if (data) {
          console.log(data,"sundarammmmm");
          
          setUpcomingEvents(data);
        }
      }, [data]);
      console.log(upcomingEvents);
      
  return (
    <div>
      <div className="w-full h-[40vh] mt-4">
          <div className="pl-4 pt-2 border-l-4 border-black">
            <span className="text-xl ">Upcoming Events</span>
          </div>
          <div className="flex flex-col overflow-hidden space-y-2 mt-4">
          {upcomingEvents.map((uevent) => (
            <ListViewHome key={uevent.id} event={uevent}/>
          ))}
        </div>
        </div>
    </div>
  )
}

export default Right3
