"use client";
import PostAvatar from "@/components/post_component/PostAvatar";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const EditLeftFrom = () => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState<File | string>("");

  const handleFileChange = (e) => {
    setImageUrl(e.target.files[0]);
  };
  return (
    <div className="h-[100dvh]">
      <div className="flex gap-2 h-10 mb-10">
        <Button className="border h-10 w-1/2 bg-black text-white rounded-full hover:ring-2 border hover:bg-black">
          Profile
        </Button>
        <Button
          variant="ghost"
          className="border h-10 w-1/2 text-black rounded-full"
        >
          Account
        </Button>
      </div>
      <div className="text-3xl font-bold">Edit Profile</div>
      <div className="text-base">
        Keep your personal details private. Information you add here is visible
        to anyone who can view your profile.
      </div>

      <div className="mt-11 text-center">photo</div>
      <div className="flex justify-center mt-5">
        <PostAvatar
          className="border border-[16px]"
          size={52}
          imageUrl={imageUrl}
        />
      </div>
      <div className="flex justify-center mt-5 gap-3">
        <Button variant="ghost" className="border rounded-full relative group">
          <input
            type="file"
            className="border border-none opacity-0  absolute w-10"
            onChange={handleFileChange}
            accept="image/*"
          />
          new
        </Button>
        <Button
          variant="ghost"
          className="text-red-500 border rounded-full"
          onClick={() => setImageUrl("")}
        >
          remove
        </Button>
      </div>
    </div>
  );
};

export default EditLeftFrom;
