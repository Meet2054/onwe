import Profile from "@/components/profile/Profile";
import ProfilePost from "@/components/profile/ProfilePost";
import React from "react";

const page = () => {
  return (
    <div className="h-[100vh] w-full flex">
      <div className="w-[45%]  flex justify-center items-start">
        <Profile />
      </div>
      <div className="w-[55%] flex justify-center items-center">
        <ProfilePost />
      </div>
    </div>
  );
};

export default page;
