"use client";

import PostAvatar from "@/components/post_component/PostAvatar";
import { Button } from "@/components/ui/button";
import RenderPoll from "./RenderPoll";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";

const Page = () => {

  const { getToken } = useAuth()
  const [tempData, setData] = useState([]);


  useEffect(() => {
    // Declare fetchData inside useEffect and call it properly
    const fetchData = async () => {
      try {
        const token = await getToken(); // Get the token outside of axios request

        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/polls`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
          },
        });

        setData(res.data); // Set the data from response
        // console.log(res.data);
      } catch (err) {
        console.log("Error fetching polls:", err);
      }
    };

    fetchData(); // Call fetchData here
  }, [getToken]);

  return (
    <div className="flex overflow-auto h-screen w-full">
      <div className="h-full w-full flex flex-col overflow-y-auto scrollbar-hide">
        {tempData.map((poll, index) => (
          <RenderPoll key={index} poll={poll} />
        ))}

        <div className="mt-20" />
      </div>
    </div>
  );
};

export default Page;
