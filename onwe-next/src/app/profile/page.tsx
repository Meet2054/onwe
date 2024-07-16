"use client";
import Profile from "@/components/profile/Profile";
import ProfilePost from "@/components/profile/ProfilePost";
import { UserProfile } from "@/types/type";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [userInfo, setUserInfo] = useState<UserProfile>();
  const { getToken } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      const token = await getToken();
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/info`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "*/*",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );
      console.log(data);

      setUserInfo(data);
    };
    fetchData();

    return () => {
      axios.CancelToken.source().cancel("Component unmounted");
    };
  }, []);
  return (
    <div className="h-[100vh] w-full flex animate-slide-up fade-in-5">
      <div className="w-[45%]  flex justify-center items-start">
        <Profile userInfo={userInfo} />
      </div>
      <div className="w-[55%] flex justify-center items-center">
        <ProfilePost posts={userInfo?.posts} />
      </div>
    </div>
  );
};

export default Page;
