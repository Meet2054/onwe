"use client";
import Posts from "@/components/post_component/Posts";
import PostsSkeleton from "@/components/post_component/PostSkeleton";
import { useAuth, useUser } from "@clerk/nextjs";
import axios from "axios";
import React, { useState, useEffect, Suspense } from "react";

const Page = () => {
  const { getToken } = useAuth();
  const [token, setToken] = useState("");
  const [showSkeleton, setShowSkeleton] = useState(true);

  const { user } = useUser();

  const getData = async () => {
    const data = await axios.get(
      "https://8db0-47-247-94-66.ngrok-free.app/api/posts"
    );
    console.log(data.data);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 1000); // Adjust the duration as needed

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    getToken({ template: "test" }).then((token) => {
      setToken(token!);
    });

    getData();
  }, [getToken]);

  return showSkeleton ? (
    <PostsSkeleton />
  ) : (
    <div className="flex overflow-auto h-screen w-screen ">
      <div className="h-full w-full flex flex-col items-center  overflow-y-auto scrollbar-hide">
        <Posts />
        <Posts />
        <Posts />
        <Posts />
        <Posts />
        <Posts />
        <Posts />
        <Posts />
        <div className="mt-20"></div>
      </div>
    </div>
  );
};

export default Page;
