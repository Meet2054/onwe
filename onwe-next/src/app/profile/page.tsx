"use client";
import PostAvatar from "@/components/post_component/PostAvatar";
import Profile from "@/components/profile/Profile";
import ProfilePost from "@/components/profile/ProfilePost";
import { setUser } from "@/lib/features/user/userSlice";

import { UserProfile } from "@/types/type";

import axios from "axios";

import React, { Suspense, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useSWR from "swr";

import onwevideo from '../../components/profile/vid.mp4'
import { Instagram } from "lucide-react";
import RenderLinks from "@/components/profile/RenderLinks";
import ProfileRightSection from "@/components/profile/ProfileRightSection";
import { useSignIn } from "@/hooks/useSignIn";

const fetcher = async (url: string, getToken: any) => {
  
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/user/info`,
    {},
    {
      headers: {
        Authorization: `Bearer ${ getToken()}`,
      },
    }
  );
  return data;
};
const Page = () => {
  const [userInfo, setUserInfo] = useState<UserProfile>();
  const dispatch = useDispatch();
  const { getToken } = useSignIn();

  const { data: swrData } = useSWR(
    ["/user/info", getToken],
    ([url, getToken]) => fetcher(url, getToken),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  useEffect(() => {
    if (swrData) {
      console.log("qwerty", swrData);
      dispatch(setUser(swrData));
      setUserInfo(swrData);
    }
  }, [swrData]);
  // const fetchData = async () => {
  //   const token = await getToken();

  //   try {
  //     const { data } = await axios.post(
  //       `${process.env.NEXT_PUBLIC_API_URL}/user/info`,
  //       {},
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //           Accept: "*/*",
  //           "ngrok-skip-browser-warning": "69420",
  //         },
  //       }
  //     );
  //     dispatch(setUser(data));

  //     setUserInfo(data);
  //   } catch (error) {
  //     console.log("user/info error", error);
  //   }
  // };
  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <div className="overflow-y-auto h-screen scrollbar-custom p-2 pl-0 " >
      <div>
        <div className="relative w-full h-64 bg-white">
          {/* Cover Image Section */}
          <div className="absolute inset-0 bg-black rounded-xl">
            {/* <img
              src="https://s3-alpha-sig.figma.com/img/9b83/1a86/621b7e2196d598bdc440cb6ebf27de3a?Expires=1727049600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AoC5lf~i8CmAEObKFN9x6hE0gTGXfFPX7u1BPwRQGT7dOP45lZLgm2lg6Jj4tfZyrs1M6c2EcZA-wgXh66bZnX0d34dTl2mM7Y8sfm~jXzu7H5v4JHfEav6T1GR4nqlUKyAUiFFdsS06pc6vkX9Eb2SDicCun9h39i~8XJin0Krn4JzZt26b~81vZC9T0YyZsTtFPcktEaJDUmECLPZdHzc1ZEX3Nxtn-vCx8tz0eMxPpjAwGll9a5eZhbYfmZVlMIETlbRcgy7mD7vIG5EBN1272nn0JkUo-E8Dq3Lb8UsCOUXhdbug8OJZXxMkeh78Iu2-JP2Jvu2eLjtbKPKmHQ__"
              alt="Cover"
              className="w-full h-full object-cover rounded-lg"
            /> */}
            
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

          {/* Social Icons */}
      <div className="absolute bottom-8 right-8 flex space-x-4 border p-2 bg-gray-500 rounded-lg ">
      {userInfo?.user?.links.map((link, index) => (
          <RenderLinks key={index} link={link} />
        ))}
    </div>
        </div>
      </div>
      {/* <div className="bg-white w-full h-[200px] ">
        <img className="h-full w-full object-cover rounded-lg" src="https://s3-alpha-sig.figma.com/img/9b83/1a86/621b7e2196d598bdc440cb6ebf27de3a?Expires=1727049600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AoC5lf~i8CmAEObKFN9x6hE0gTGXfFPX7u1BPwRQGT7dOP45lZLgm2lg6Jj4tfZyrs1M6c2EcZA-wgXh66bZnX0d34dTl2mM7Y8sfm~jXzu7H5v4JHfEav6T1GR4nqlUKyAUiFFdsS06pc6vkX9Eb2SDicCun9h39i~8XJin0Krn4JzZt26b~81vZC9T0YyZsTtFPcktEaJDUmECLPZdHzc1ZEX3Nxtn-vCx8tz0eMxPpjAwGll9a5eZhbYfmZVlMIETlbRcgy7mD7vIG5EBN1272nn0JkUo-E8Dq3Lb8UsCOUXhdbug8OJZXxMkeh78Iu2-JP2Jvu2eLjtbKPKmHQ__"/>
      </div> */}

      <div className="h-[100vh] w-full sm:flex items-center sm:p-0  bg-white">
        <div className="hidden sm:flex w-full h-full flex-col sm:flex-row animate-slide-up fade-in-5 rounded-xl bg-white gap-16  justify-between">
          <div className="w-[35%] h-full flex justify-center items-start mt-[50px] ">
            <Suspense fallback={<div>loading ...</div>}>
              <Profile userInfo={userInfo!} />
            </Suspense>
          </div>
          <div className="w-full sm:w-[65%] p-2 pt-3 bg-white rounded-lg h-full">
            <Suspense fallback={<div>loading ...</div>}>
              {/* <ProfilePost posts={userInfo?.posts!} /> */}
              <ProfileRightSection posts={userInfo?.posts!} />
            </Suspense>
          </div>
        </div>
        {/* smaller screen */}
        <div className="sm:hidden w-full h-full flex pl-4 pt-4 items-center content-center overflow-y-auto scrollbar-hidden bg-white mb-14 pb-6">
          <div className="w-full h-[96vh] flex flex-col animate-slide-up fade-in-5 rounded-xl bg-white mr-4 items-center">
            <div className="w-[45%] h-max flex justify-center items-start mt-4">
              <Suspense fallback={<div>loading ...</div>}>
                <Profile userInfo={userInfo!} />
              </Suspense>
            </div>
            <div className="w-full p-2  bg-white rounded-lg h-full">
              <Suspense fallback={<div>loading ...</div>}>
               {/* <ProfilePost posts={userInfo?.posts!} /> */}
                <ProfileRightSection posts={userInfo?.posts!} />
              </Suspense>
            </div>
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
