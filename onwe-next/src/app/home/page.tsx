"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import Posts from "@/components/post_component/Posts";
import PostsSkeleton from "@/components/post_component/PostSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "@/lib/features/posts/postSlice";
import { setTimeline } from "@/lib/features/timeline/postSlice";
import { RootState } from "@/lib/store";
import useSWR from "swr";
import { getData } from "@/lib/utils";
import { PostsProps } from "@/types/type";

const Page = () => {
  const { getToken } = useAuth();
  const [error, setError] = useState<any>(null);
  const [responseData, setResponseData] = useState<PostsProps[] | []>([]);
  const { timeline } = useSelector((state: RootState) => state.timeline);
  const dispatch = useDispatch();

  const fetcher = async (url: string) => {
    try {
      const token = await getToken({ template: "test" });
      if (!token) throw new Error("No token found");
      return getData(url, {}, "GET");
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  const {
    data: swrData,
    error: swrError,
    isValidating,
  } = useSWR("/posts", fetcher);

  useEffect(() => {
    if (swrData) {
      setResponseData(swrData);
      console.log(swrData);
      dispatch(setTimeline(swrData));
      dispatch(setPost(swrData[0]));
    }
  }, [swrData, dispatch]);

  useEffect(() => {
    if (swrError) {
      setError(swrError);
    }
  }, [swrError]);

  useEffect(() => {
    setError(null); // Reset error state on re-render
  }, []);

  if (!responseData) {
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
        {swrData &&
          swrData.length > 0 &&
          swrData.map((post, index) => <Posts key={index} post={post} />)}
        <div className="mt-20" />
      </div>
    </div>
  );
};

export default Page;
