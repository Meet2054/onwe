"use client";
import Profile from "@/components/profile/Profile";
import ProfilePost from "@/components/profile/ProfilePost";
import { setUser } from "@/lib/features/user/userSlice";
import { UserProfile } from "@/types/type";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Page = () => {
  const [userInfo, setUserInfo] = useState<UserProfile>();
  const dispatch = useDispatch();
  const { getToken } = useAuth();
  const fetchData = async () => {
    const token = await getToken();

    console.log("UserINfo")
    try {
      
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
      dispatch(setUser(data));
  
      setUserInfo(data);
    } catch (error) {
      console.log("user/info error", error)
    }
  };
  useEffect(() => {
    fetchData();


  }, []);

  return (
    <div className="h-[100vh] w-full sm:flex items-center sm:p-0 overflow-y-auto bg-[#F1F1F1]">
      <div className="hidden sm:flex w-full h-[96vh] flex-col sm:flex-row animate-slide-up fade-in-5 rounded-xl bg-white mr-4 items-center">
        <div className="w-[45%] h-max flex justify-center items-start mt-4">
          <Profile userInfo={userInfo!} />
        </div>
        <div className="w-full sm:w-[55%] p-2 bg-white rounded-lg h-full sm:overflow-y-auto">
          <ProfilePost posts={userInfo?.posts!} />
        </div>
      </div>
      {/* smaller screen */}
      <div className="sm:hidden w-full h-full flex pl-4 pt-4 items-center content-center overflow-y-auto bg-white mb-14 pb-6">
        <div className="w-full h-[96vh] flex flex-col animate-slide-up fade-in-5 rounded-xl bg-white mr-4 items-center">
          <div className="w-[45%] h-max flex justify-center items-start mt-4">
            <Profile userInfo={userInfo!} />
          </div>
          <div className="w-full p-2 bg-white rounded-lg h-full">
            <ProfilePost posts={userInfo?.posts!} />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-[100vh] w-full   sm:flex  items-center sm:p-0  overflow-y-auto  bg-[#F1F1F1]  ">
      <div className="w-full h-[96vh]  flex flex-col sm:flex-row  animate-slide-up fade-in-5 rounded-xl bg-white mr-4 items-center">
        <div className="w-[45%] h-max flex justify-center items-start  mt-4 ">
          <Profile userInfo={userInfo!} />
        </div>
        <div className="w-full sm:w-[55%] p-2 bg-white rounded-lg h-full sm:overflow-y-auto">
          <ProfilePost posts={userInfo?.posts!} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-[100vh] w-full flex items-center overflow-y-auto  bg-[#F1F1F1] ">
      <div className="w-full h-[96vh]  flex  animate-slide-up fade-in-5 rounded-xl bg-red-500 mr-4">
        <div className="w-[45%] flex justify-center items-start ">
          <Profile userInfo={userInfo!} />
        </div>
        <div className="w-[55%] p-2 bg-white rounded-lg overflow-y-auto">
          <ProfilePost posts={userInfo?.posts!} />
        </div>
      </div>
    </div>
  );
};

export default Page;
