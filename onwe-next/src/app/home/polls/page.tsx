"use client";

import PostAvatar from "@/components/post_component/PostAvatar";
import { Button } from "@/components/ui/button";
import RenderPoll from "./RenderPoll";
import axios from "axios";
import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import useSWRInfinite from "swr/infinite";
import PostsSkeleton from "@/components/post_component/PostSkeleton";
import { useSignIn } from "@/hooks/useSignIn";

const PAGE_SIZE = 10;

const Page = () => {
  const { getToken } = useSignIn();
  const [tempData, setData] = useState([]);

  // Fetcher function using axios
  const fetcher = useCallback(
    async (url: string) => {
      try {
        const token =getToken(); // Get the token outside of axios request
        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
          },
        });
        return res.data; // Return fetched data
      } catch (err) {
        throw err;
      }
    },
    [getToken]
  );

  // Get key for pagination
  const getKey = useCallback(
    (pageIndex: number, previousPageData: any[] | null) => {
      if (previousPageData && !previousPageData.length) return null; // reached the end
      return `${process.env.NEXT_PUBLIC_API_URL}/polls?page=${pageIndex + 1}&limit=${PAGE_SIZE}`; // API endpoint with pagination
    },
    []
  );

  // Using useSWRInfinite to handle pagination
  const { data, error, size, setSize, isValidating } = useSWRInfinite<any[]>(
    getKey,
    fetcher,
    {
      revalidateFirstPage: false,
      persistSize: true,
      revalidateOnFocus: false,
    }
  );

  const polls = useMemo(() => (data ? ([] as any[]).concat(...data) : []), [data]);

  // Infinite scroll logic
  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isValidating) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !isValidating) {
          setSize((prevSize) => prevSize + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isValidating, setSize]
  );

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
    <div className="flex  h-screen w-full">
      <div className="h-full w-full flex flex-col overflow-y-auto scrollbar-hide">
        {polls.length === 0 && !isValidating ? (
          <div>No polls available.</div>
        ) : (
          polls.map((poll, index) => (
            <div
              key={poll.id || index}
              ref={index === polls.length - 4 ? lastElementRef : null}
            >
              <RenderPoll poll={poll} />
            </div>
          ))
        )}
        {isValidating && <PostsSkeleton />}
        <div className="mt-20" />
      </div>
    </div>
  );
};

export default Page;
