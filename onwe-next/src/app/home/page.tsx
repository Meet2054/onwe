"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth, useUser } from "@clerk/nextjs";
import Posts, { PostsProps } from "@/components/post_component/Posts";
import PostsSkeleton from "@/components/post_component/PostSkeleton";

const Page = () => {
  const { getToken } = useAuth();
  const [token, setToken] = useState("");
  const [error, setError] = useState(null);
  const [responseData, setResponseData] = useState<PostsProps[] | null>(null);

  useEffect(() => {
    const fetchTokenAndData = async () => {
      try {
        const fetchedToken = await getToken({ template: "test" });

        setToken(fetchedToken!);

        axios
          .get(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
            headers: {
              Authorization: `Bearer ${fetchedToken}`,
              "Content-Type": "application/json",
              Accept: "*/*",
              "ngrok-skip-browser-warning": "69420",
            },
          })
          .then((data) => {
            // console.log(data.data);

            setResponseData(data.data);
          });
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      }
    };

    fetchTokenAndData();
  }, [getToken]);

  return !responseData ? (
    <PostsSkeleton />
  ) : error ? (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="text-red-500">
        <p>Error fetching data: {error}</p>
      </div>
    </div>
  ) : (
    <div className="flex overflow-auto h-screen w-screen">
      <div className="h-full w-full flex flex-col items-center overflow-y-auto scrollbar-hide">
        {responseData &&
          responseData.length > 0 &&
          responseData.map((post, index) => {
            return <Posts key={index} post={post} />;
          })}

        <div className="mt-20"></div>
      </div>
    </div>
  );
};

export default Page;
