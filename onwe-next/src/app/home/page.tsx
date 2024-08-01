"use client";

import React, { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import Posts from "@/components/post_component/Posts";
import PostsSkeleton from "@/components/post_component/PostSkeleton";
import { useDispatch } from "react-redux";
import { setPost } from "@/lib/features/posts/postSlice";
import { setTimeline } from "@/lib/features/timeline/postSlice";
import useSWR from "swr";
import { getData } from "@/lib/utils";
import { PostsProps } from "@/types/type";

const Page = () => {
  const { getToken } = useAuth();
  const dispatch = useDispatch();

  const fetcher = async (url: string) => {
    try {
      const token = await getToken({ template: "test" });
      if (!token) throw new Error("No token found");
      return getData(url, {}, "GET");
    } catch (err) {
      throw err;
    }
  };

  const {
    data: posts,
    error,
    isValidating,
    isLoading,
  } = useSWR<PostsProps[]>("/posts", fetcher, {
    // revalidateOnFocus: false,
    // revalidateIfStale: false,
  });

  useEffect(() => {
    if (posts) {
      dispatch(setTimeline(posts));
      if (posts.length > 0) dispatch(setPost(posts[0]));
    }
  }, [posts, dispatch]);

  if (isLoading || !posts) {
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
        {posts.map((post, index) => (
          <Posts key={post.id || index} post={post} />
        ))}
        <div className="mt-20" />
      </div>
    </div>
  );
};

export default Page;
