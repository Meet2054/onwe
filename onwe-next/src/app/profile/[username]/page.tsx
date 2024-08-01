"use client";
import Profile from "@/components/profile/Profile";
import ProfilePost from "@/components/profile/ProfilePost";
import { setUser } from "@/lib/features/user/userSlice";
import { UserProfile } from "@/types/type";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

interface Params {
  username: string;
}

interface PageProps {
  params: Params;
}

const Page = ({ params }: PageProps) => {
  const { username } = params;

  const [userInfo, setUserInfo] = useState<UserProfile>();
  const dispatch = useDispatch();
  const { getToken } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      const token = await getToken();
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/user/${username}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "*/*",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );
      dispatch(setUser(data));

      setUserInfo(data);
    };
    fetchData();

    // return () => {
    //   axios.CancelToken.source().cancel("Component unmounted");
    // };
  }, []);
  return (
    <div className="h-[100vh] w-full flex items-center  bg-[#F1F1F1]  overflow-y-hidden">
      <div className="w-full h-[96vh] flex animate-slide-up fade-in-5 rounded-xl bg-white mr-4">
        <div className="w-[45%]  flex justify-center items-start">
          <Profile userInfo={userInfo!} />
        </div>
        <div className="w-[55%] p-2 overflow-y-auto">
          <ProfilePost posts={userInfo?.posts!} />
        </div>
      </div>
    </div>
  );
};

export default Page;
