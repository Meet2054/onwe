"use client";
import PostAvatar from "@/components/post_component/PostAvatar";
import Profile from "@/components/profile/Profile";
import ProfilePost from "@/components/profile/ProfilePost";
import ProfileRightSection from "@/components/profile/ProfileRightSection";
import RenderLinks from "@/components/profile/RenderLinks";
import { setUser } from "@/lib/features/user/userSlice";
import { UserProfile } from "@/types/type";
import axios from "axios";
import React, { Suspense, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSignIn } from "@/hooks/useSignIn";
import onwevideo from '../../../components/profile/vid.mp4';

interface Params {
  username: string;
}

interface PageProps {
  params: Params;
}

const Page = ({ params }: PageProps) => {
  const { username } = params;
  const [uname, setUname] = useState<null | string>(null);
  const [userInfo, setUserInfo] = useState<UserProfile | null>(null);
  const dispatch = useDispatch();
  const { getToken, getUsername } = useSignIn();

  // Fetch user data from the API
  const fetchData = async (token: string) => {
    try {
      const res = await axios.get(
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
      setUserInfo(res.data);
      console.log(res.data);
    } catch (error) {
      console.log("Error in fetching user data:", error);
    }
  };

  useEffect(() => {
    // Ensure that `getToken` and `getUsername` are awaited properly
    const initializeData = async () => {
      const token = await getToken(); // Ensure token is fetched correctly
      const unameFromHook = await getUsername(); // Get the username
      setUname(unameFromHook); // Set the username in state

      if (token && unameFromHook) {
        fetchData(token); // Fetch data only if token and username are available
      }
    };

    // Only initialize data once
    if (!uname) {
      initializeData();
    }
  }, [uname, getToken, getUsername, username]); // Ensure it only runs once when `uname` changes

  return (
    <div className="overflow-y-auto h-screen scrollbar-custom p-2 pl-0">
      <div>
        <div className="relative w-full h-64 bg-white">
          {/* Cover Image Section */}
          <div className="absolute inset-0 bg-black rounded-xl">
            <video className="absolute h-full w-full" loop autoPlay muted>
              <source src={onwevideo} type="video/mp4" />
            </video>
          </div>

          {/* Profile Picture */}
          <div className="absolute left-[9.5%] bottom-[-80px] ">
            <PostAvatar
              size={40}
              className="ring-8 ring-slate-300"
              imageUrl={userInfo?.user?.avatar}
            />
          </div>

          <div className="absolute bottom-8 right-8 flex space-x-4 border p-2 bg-gray-500 rounded-lg ">
            {userInfo?.user?.links.map((link, index) => (
              <RenderLinks key={index} link={link} />
            ))}
          </div>
        </div>
      </div>

      <div className="h-[100vh] w-full sm:flex items-center sm:p-0 bg-white">
        <div className="hidden sm:flex w-full h-full flex-col sm:flex-row animate-slide-up fade-in-5 rounded-xl bg-white mr-4 justify-between">
          <div className="w-[35%] h-full flex justify-center items-start mt-[50px] ">
            <Suspense fallback={<div>Loading ...</div>}>
              <Profile userInfo={userInfo!} showEdit={false} />
            </Suspense>
          </div>
          <div className="w-full sm:w-[65%] p-2 pt-3 bg-white rounded-lg h-full ml-5">
            <Suspense fallback={<div>Loading ...</div>}>
              <ProfileRightSection posts={userInfo?.posts!} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
