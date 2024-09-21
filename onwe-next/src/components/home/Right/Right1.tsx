import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import rect from "@/../public/images/rightsideImages/Rectangle.png"
import axios from "axios";
import useSWR from "swr";
import Right1Club from './Right1Club';
import { ClubCardHome } from '@/types/type';
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

const Right1 = () => {
    const [trendingClubs, setTrendingClubs] = useState<ClubCardHome[]>([]);
    
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
        token ? `${process.env.NEXT_PUBLIC_API_URL}/trending` : null,
        (url) => fetcher(url, token!)
      );
    
      useEffect(() => {
        if (data) {
          setTrendingClubs(data);
        }
      }, [data]);

  return (
    <div>
      <div className="w-full h-[40vh] flex flex-col p-3 pl-0   rounded-2xl" style={{
                    // backgroundImage: `url(${rect.src})`, // Use the imported rect as background image
                    // backgroundSize: 'cover',
                    // backgroundPosition: 'center',
                }}>
          <div className=" text-black pl-4 pl-2 text-lg border-l-4 border-black">
            Trending
            <span className="text-[10px] ml-2 border rounded-2xl py-1 px-3">
              club
            </span>
          </div>
          <div className="flex flex-col overflow-hidden space-y-2 mt-4 ml-4">
          {trendingClubs.map((trendingclub) => (
            <Right1Club key={trendingclub.id} club={trendingclub}/>
          ))}
        </div>
        </div>
    </div>
  )
}

export default Right1
