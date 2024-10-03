"use client";

import { useEffect, useRef, useCallback } from "react";
import useSWRInfinite from "swr/infinite";
import axios from "axios";
import RenderPoll from "../../app/home/polls/RenderPoll";
import { Skeleton } from "../ui/skeleton";
import { useSignIn } from "@/hooks/useSignIn";

const PAGE_SIZE = 7;

const fetchPosts = async (url: string, token: string) => {
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "69420",
    },
  });
  return response.data;
};

const ProfilePolls = ({ username }: { username: string | null }) => {
  const { getToken } = useSignIn();
  const token = getToken();

  const getKey = (pageIndex: number, previousPageData: any[]) => {
    if (previousPageData && !previousPageData.length) return null; // reached the end
    return `${process.env.NEXT_PUBLIC_API_URL}/polls/${username}?page=${pageIndex + 1}&limit=${PAGE_SIZE}`;
  };

  const { data, error, size, setSize } = useSWRInfinite(
    getKey,
    (url) => fetchPosts(url, token),
    { revalidateFirstPage: false }
  );

  const polls = data ? [].concat(...data) : [];
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastPollElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoadingMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !isReachingEnd) {
          setSize((prevSize) => prevSize + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoadingMore, isReachingEnd, setSize]
  );

  if (error) return <div>Error loading polls</div>;

  return (
    <div className="flex h-screen w-[90%]">
      <div className="h-full w-full flex flex-col">
        {isLoadingInitialData && <ProfilePollSkeleton />}
        {polls.map((poll, index) => (
          <div
            key={index}
            ref={index === polls.length - 1 ? lastPollElementRef : null}
          >
            <RenderPoll isDeleted={true} poll={poll} />
          </div>
        ))}
        {isLoadingMore && <ProfilePollSkeleton />}
        {polls?.length === 0 && <div className="mt-4 text-center">No polls</div>}
        <div className="mt-20" />
      </div>
    </div>
  );
};

export default ProfilePolls;

const ProfilePollSkeleton = () => {
  return (
    <div className="flex flex-col gap-1 h-full mt-5">
      <Skeleton className="h-[150px] w-[85%] animate-pulse" />
      <Skeleton className="h-[150px] w-[85%] animate-pulse" />
      <Skeleton className="h-[150px] w-[85%] animate-pulse" />
      <Skeleton className="h-[150px] w-[85%] animate-pulse" />
    </div>
  );
};