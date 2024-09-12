"use client";

import PostAvatar from "@/components/post_component/PostAvatar";
import { Button } from "@/components/ui/button";
import RenderPoll from "../../app/home/polls/RenderPoll";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";


const ProfilePolls = () => {

  const { getToken } = useAuth()
  const [tempData, setData] = useState([]);


  useEffect(() => {
    // Declare fetchData inside useEffect and call it properly
    const fetchData = async () => {
      try {
        const token = await getToken(); // Get the token outside of axios request
        console.log(token)
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
    <div className="flex  h-screen w-[90%]">
      <div className="h-full w-full flex flex-col ">
        {tempData
        .map((poll, index) => (
          <RenderPoll key={index} poll={poll} />
        ))}

        <div className="mt-20" />
      </div>
    </div>
  );
};

export default ProfilePolls;
