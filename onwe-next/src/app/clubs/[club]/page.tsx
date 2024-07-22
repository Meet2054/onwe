"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import Join from "@/components/clubs/Join";
import General from "@/components/clubs/General";
import Announcement from "@/components/clubs/Announcement";



const Page = () => {
  const params = useParams();
  const club = Array.isArray(params.club) ? params.club[0] : params.club;
  const tab = useSelector((state: RootState) => state.tab.tab);
  const { getToken } = useAuth();
  
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken();
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/${club}/${tab}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "69420",
          },
        });
        setData(response.data);
        setError(null);
        setStatus(response.status);
      } catch (err: any) {
        if (err.response) {
          setError(err.response.data.message);
          setStatus(err.response.status);
        } else {
          setError("An unexpected error occurred");
          setStatus(null);
        }
        setData(null);
      }
    };

    fetchData();
  }, [club, tab, getToken]);

  if (status === 404) {
    return <div className="error">Club does not exist</div>;
  }

  if (status === 403) {
    return <Join />;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="content">
    {tab === "general" ? (
      <General posts={data.posts} club={club} />
    ) : (
      <Announcement posts={data.posts} club={club} />
    )}
  </div>
  );
};

export default Page;
