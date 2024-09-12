"use client";
import PostAvatar from "@/components/post_component/PostAvatar";
import Profile from "@/components/profile/Profile";
import ProfilePost from "@/components/profile/ProfilePost";
import ProfileRightSection from "@/components/profile/ProfileRightSection";
import RenderLinks from "@/components/profile/RenderLinks";
import { setUser } from "@/lib/features/user/userSlice";
import { UserProfile } from "@/types/type";
import { useAuth, useSession } from "@clerk/nextjs";
import axios from "axios";
import React, { Suspense, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { string } from "zod";
import onwevideo from '../../../components/profile/vid.mp4'

interface Params {
  username: string;
}

interface PageProps {
  params: Params;
}

const Page = ({ params }: PageProps) => {
  const { username } = params;
  const [uname, setUname] = useState<null | string>(null);
  const { session } = useSession();
  useEffect(() => {
    if (session) {
      setUname(session.user.username);
    }
  }, [session]);

  const [userInfo, setUserInfo] = useState<UserProfile>();
  const dispatch = useDispatch();
  const { getToken } = useAuth();
  const fetchData = async () => {
    const token = await getToken();

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

      setUserInfo(() => res.data);
      console.log(res.data);
    } catch (error) {
      console.log("error in user/username call", error);
    }
  };
  useEffect(() => {
    if (uname) {
      fetchData();
    }

    // return () => {
    //   axios.CancelToken.source().cancel("Component unmounted");
    // };
  }, [uname]);
  return (
    <div className="overflow-y-auto h-screen scrollbar-custom p-2 pl-0">
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
    <div className="hidden sm:flex w-full h-full flex-col sm:flex-row animate-slide-up fade-in-5 rounded-xl bg-white mr-4  justify-between">
      <div className="w-[35%] h-full flex justify-center items-start mt-[50px] ">
        <Suspense fallback={<div>loading ...</div>}>
          <Profile userInfo={userInfo!} showEdit={false} />
        </Suspense>
      </div>
      <div className="w-full sm:w-[65%] p-2 pt-3 bg-white rounded-lg h-full ml-5">
        <Suspense fallback={<div>loading ...</div>}>
        <ProfileRightSection posts={userInfo?.posts!} />
        </Suspense>
      </div>
    </div>
    </div>
    </div>
  );
};

export default Page;
