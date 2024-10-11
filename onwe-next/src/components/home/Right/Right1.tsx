import React, { useEffect, useState } from 'react';
import axios from "axios";
import useSWR from "swr";
import Right1Club from './Right1Club';
import { ClubCardHome } from '@/types/type';
import { useSignIn } from '@/hooks/useSignIn';

const fetcher = async ([url, token]: [string, string]) => {
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
    const fetchedToken = getToken();
    setToken(fetchedToken);
  }, [getToken]);

  const { data, error } = useSWR(
    token ? [`${process.env.NEXT_PUBLIC_API_URL}/trending`, token] : null,
    fetcher
  );

  useEffect(() => {
    if (data) {
      setTrendingClubs(data);
    }
  }, [data]);

  if (error) return <div>Error loading clubs</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <div className="w-full flex flex-col rounded-2xl mb-5">
        <div className="text-black pl-4  text-lg border-l-4 border-black">
          Trending
          <span className="text-[10px] ml-2 border rounded-2xl py-1 px-3">
            clubs
          </span>
        </div>
        <div className="flex flex-col h-full overflow-hidden gap-2 mt-4 grid ">
          {trendingClubs.map((trendingclub) => (
            <Right1Club key={trendingclub.id} club={trendingclub} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Right1;
