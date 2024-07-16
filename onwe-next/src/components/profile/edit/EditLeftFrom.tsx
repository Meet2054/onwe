"use client";
import PostAvatar from "@/components/post_component/PostAvatar";
import { Button } from "@/components/ui/button";

import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import React, { ChangeEvent, useState } from "react";

const EditLeftFrom = () => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState<File | string>("");
  const { getToken } = useAuth();

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const token = await getToken();
    if (e.target.files && e.target.files.length > 0) {
      const formData = new FormData();
      formData.append("media", e.target.files[0]);

      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/edit`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      // const response = await getData(
      //   "/user",
      //   formData,
      //   token as string,
      //   "POST"
      // );
      console.log(res.data);

      setImageUrl(e.target.files[0]);
    }
  };
  return (
    <div className="h-full">
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
