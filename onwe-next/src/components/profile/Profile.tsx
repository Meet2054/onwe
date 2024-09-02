"use client";
import React from "react";
import PostAvatar from "../post_component/PostAvatar";

import Link from "next/link";
import { UserProfile } from "@/types/type";
import RenderLinks from "./RenderLinks";
import { LucidePencilLine } from "lucide-react";

const Profile = ({
  userInfo,
  showEdit = true,
}: {
  userInfo: UserProfile;
  showEdit?: boolean;
}) => {
  return (
    <div className="w-[77%] items-center  mx-auto p-4 flex flex-col">
      <div className="flex justify-center items-center relative">
        <PostAvatar
          size={40}
          className="ring-8 ring-slate-300"
          imageUrl={userInfo?.user?.avatar}
        />
        {showEdit && (
          <div
            className="my-3 p-2 group border rounded-full 
        absolute -bottom-6  right-0  transition-all duration-100"
          >
            <Link href="/profile/edit">
              <LucidePencilLine
                size={16}
                className="group-hover:scale-125 transition-all duration-100 ease-in-out"
              />
            </Link>
          </div>
        )}
      </div>
      <div className="text-2xl font-bold text-center mt-8 whitespace-pre">
        {userInfo?.user?.fullname}
      </div>
      <div className="text-green-500 text-center">
        @{userInfo?.user?.username}
      </div>
      <div className="flex flex-col  gap-x-4">
        {/* {showEdit==false && (userInfo?.isfollowed)?<button className="my-3 p-1 px-5 rounded-full border bg-blue-600 text-white">
         Follow
        </button>:
        <button className="my-3 p-1 px-5 rounded-full border bg-gray-300 text-gray-700">
        Following
       </button>} */}
        <div className="flex "> 
          <div className="my-3 p-1 px-5 rounded-full border border-gray-300">
          {userInfo?.followersCount} Follower 
          </div>
          <div className="my-3 p-1 px-5 rounded-full border border-gray-300">
          {userInfo?.followingCount} Following
          </div>
        </div>
      </div>
      <div className="text-center w-52">
        <p className="whitespace-pre-wrap break-words">{userInfo?.user?.bio}</p>
      </div>
      <div className="flex justify-center gap-8 space mt-4 w-full ">
        {userInfo?.user?.links.map((link, index) => (
          <RenderLinks key={index} link={link} />
        ))}
      </div>
    </div>
  );
};

export default Profile;
