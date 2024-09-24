"use client";
import PostAvatar from "@/components/post_component/PostAvatar";
import { Button } from "@/components/ui/button";
import { useSignIn } from "@/hooks/useSignIn";
import { RootState } from "@/lib/store";
import { useSWRConfig } from "swr";
import axios from "axios";
import Link from "next/link";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const EditLeftFrom = () => {
  const [imageUrl, setImageUrl] = useState<File | string>("");
  const { getToken, user: USER } = useSignIn();
  const { user } = useSelector((state: RootState) => state.user);
  const { mutate } = useSWRConfig();

  useEffect(() => {
    if (user) {
      setImageUrl(user?.user.avatar!);
    }
  }, [user]);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageUrl(e.target.files[0]);
      const formData = new FormData();
      formData.append("media", e.target.files[0]);

      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/edit?isavatar=true`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      USER.updateAvatar(res.data.avatar);
      mutate("/user/info");
      setImageUrl(res.data.avatar);
    }
  };

  const handleRemove = async () => {
    const formData = new FormData();
    formData.append("media", "gg");

    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/edit?isavatar=true`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    USER.removeAvatar();
    mutate("/user/info");
    setImageUrl("");
  };
  return (
    <div className="h-full ">
      <div className="flex gap-2 h-10 mb-10">
        <Button className="border h-10 w-1/2 bg-black text-white rounded-full hover:ring-2 border hover:bg-black">
          <Link className="h-full w-full" href="/profile">
            Profile
          </Link>
        </Button>
      </div>
      <div className="text-2xl font-bold">Edit Profile</div>
      <div className="text-base">
        Keep your personal details private. Information you add here is visible
        to anyone who can view your profile.
      </div>

      <div className="mt-11 text-center">photo</div>
      <div className="flex justify-center mt-5">
        <PostAvatar
          className="border border-[16px]"
          size={52}
          imageUrl={imageUrl || USER.avatar}
        />
      </div>
      <div className="flex justify-center mt-5 gap-3">
        <Button variant="ghost" className="border rounded-xl relative group">
          <input
            type="file"
            className="border border-none opacity-0  absolute w-10"
            onChange={handleFileChange}
            accept="image/*"
          />
          New
        </Button>
        <Button
          variant="ghost"
          className="text-red-500 border rounded-xl"
          onClick={handleRemove}
        >
          Remove
        </Button>
      </div>
    </div>
  );
};

export default EditLeftFrom;
