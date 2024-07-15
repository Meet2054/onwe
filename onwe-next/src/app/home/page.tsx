"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth, useUser } from "@clerk/nextjs";
import Posts, { PostsProps } from "@/components/post_component/Posts";
import PostsSkeleton from "@/components/post_component/PostSkeleton";
import { useDispatch } from "react-redux";
import { setPost } from "@/lib/features/posts/postSlice";

const Page = () => {
  const { getToken } = useAuth();
  const [token, setToken] = useState("");
  const [error, setError] = useState<any>(null);
  const [responseData, setResponseData] = useState<PostsProps[] | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTokenAndData = async () => {
      try {
        const fetchedToken = await getToken({ template: "test" });
        // console.log(fetchedToken);

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
            dispatch(setPost(data.data[0]));
            // console.log(data.data);

            setResponseData(data.data);
          });
      } catch (error) {
        // throw new Error(error?.message);
        console.error("Error fetching data:", error);
        setError(error);
      }
    };

    fetchTokenAndData();
  }, [getToken]);
  if (!responseData && !error) {
    return <PostsSkeleton />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        <div className="text-red-500">
          <p>Error fetching data: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex overflow-auto h-screen w-screen">
      <div className="h-full w-full flex flex-col items-center overflow-y-auto scrollbar-hide">
        {responseData &&
          responseData.length > 0 &&
          responseData.map((post, index) => <Posts key={index} post={post} />)}
        <div className="mt-20"></div>
      </div>
    </div>
  );
};

export default Page;
