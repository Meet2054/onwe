"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { useAuth } from "@clerk/nextjs";
import Posts from "@/components/post_component/Posts";
import PostsSkeleton from "@/components/post_component/PostSkeleton";
import { useDispatch } from "react-redux";
import { setPost } from "@/lib/features/posts/postSlice";
import { setTimeline } from "@/lib/features/timeline/postSlice";
import useSWRInfinite from "swr/infinite";
import { getData } from "@/lib/utils";
import { PostsProps } from "@/types/type";

const PAGE_SIZE = 10;

const Page = () => {
  const { getToken } = useAuth();
  const dispatch = useDispatch();

  const fetcher = async (url: string) => {
    try {
      const token = await getToken({ template: "test" });
      if (!token) throw new Error("No token found");
      return getData(
        url,
        { headers: { Authorization: `Bearer ${token}` } },
        "GET"
      );
    } catch (err) {
      throw err;
    }
  };

  const getKey = (pageIndex: number, previousPageData: PostsProps[] | null) => {
    if (previousPageData && !previousPageData.length) return null; // reached the end
    return `/posts?page=${pageIndex + 1}&limit=${PAGE_SIZE}`; // API endpoint with pagination
  };

  const { data, error, setSize, isValidating } = useSWRInfinite<PostsProps[]>(
    getKey,
    fetcher
  );

  const posts = data ? ([] as PostsProps[]).concat(...data) : [];

  useEffect(() => {
    if (posts) {
      dispatch(setTimeline(posts));
      if (posts.length > 0) dispatch(setPost(posts[0]));
    }
  }, [posts, dispatch]);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isValidating) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setSize((size) => size + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isValidating, setSize]
  );

  if (!posts) {
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
        {posts.map((post, index) => {
          if (index === posts.length - 4) {
            return (
              <div ref={lastElementRef} key={post.id || index}>
                <Posts post={post} />
              </div>
            );
          }
          return <Posts key={post.id || index} post={post} />;
        })}
        {isValidating && <PostsSkeleton />}
        <div className="mt-20" />
      </div>
    </div>
  );
};

export default Page;
