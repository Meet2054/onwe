"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import DialogBox from "../post_component/Dialog_component/DialogBox";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setPost } from "@/lib/features/posts/postSlice";
import useSWRInfinite from "swr/infinite";
import PostsSkeleton from "@/components/post_component/PostSkeleton"; // Loading Skeleton for posts
import { LoaderPinwheelIcon } from "lucide-react";
import { useSignIn } from "@/hooks/useSignIn";

interface Post {
  id: string;
  media: string[];
}

const PAGE_SIZE = 16; // Set to 16 as you mentioned in the query

const fetcher = async (url: string, token: string) => {
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "69420",
    },
  });
  return response.data;
};

const TopPosts: React.FC = () => {
  const dispatch = useDispatch();
  const { getToken } = useSignIn();
  const [token, setToken] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true); // Track if there are more posts to load
  const [allPosts, setAllPosts] = useState<Post[]>([]); // New state for all posts

  // Parse query parameters from window.location.search
  const queryParams = new URLSearchParams(window.location.search);
  const tag = queryParams.get("tag");

  // Fetch the token
  useEffect(() => {
    const fetchToken = async () => {
      const fetchedToken =  getToken();
      setToken(fetchedToken);
    };
    fetchToken();
  }, [getToken]);

  // Function to generate the URL based on tag and page index
  const getKey = (pageIndex: number, previousPageData: Post[] | null) => {
    if (!hasMore) return null; // Stop fetching if no more data
    if (!token) return null; // Wait until token is available
    if (previousPageData && previousPageData.length < PAGE_SIZE) {
      setHasMore(false); // Stop if previous data has fewer than PAGE_SIZE posts
      return null;
    }
    if (tag) {
      return `${process.env.NEXT_PUBLIC_API_URL}/search/hashtag/${tag}?page=${pageIndex + 1}&limit=${PAGE_SIZE}`;
    }
    return `${process.env.NEXT_PUBLIC_API_URL}/top-posts?page=${pageIndex + 1}&limit=${PAGE_SIZE}`;
  };

  const { data, error, setSize, isValidating } = useSWRInfinite<Post[]>(
    (pageIndex, previousPageData) => getKey(pageIndex, previousPageData),
    (url) => fetcher(url, token!)
  );

  // Update the allPosts state when new data is fetched
  useEffect(() => {
    if (data) {
      const newPosts = ([] as Post[]).concat(...data);
      setAllPosts((prevPosts) => [...prevPosts, ...newPosts]);
    }
  }, [data]);

  // Infinite scrolling logic
  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isValidating || !hasMore) return; // Stop if validating or no more posts
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setSize((size) => size + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isValidating, setSize, hasMore]
  );

  const handleClick = (post: Post) => {
    dispatch(setPost(post));
  };

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
    <div className="w-full sm:p-4">
      {tag && (
        <h4 className="w-full h-20 flex items-center text-5xl">#{tag}</h4>
      )}
      <div className="px-5">
        <div className="gap-1 grid grid-cols-3 sm:grid-cols-4">
          {allPosts?.map((post, index) => {
            if (index === allPosts.length - 4) {
              return (
                <div
                  ref={lastElementRef}
                  key={post.id || index}
                  className="h-80"
                >
                  <DialogBox
                    className={""}
                    imageUrl={post.media[0]}
                    post={post}
                  />
                </div>
              );
            }
            return (
              <div onClick={() => handleClick(post)} key={post.id} className="h-80">
                <DialogBox className={""} imageUrl={post.media[0]} post={post} />
              </div>
            );
          })}
        </div>
        {isValidating && hasMore && <div className="w-full flex items-center justify-center h-40 m-auto"><LoaderPinwheelIcon className="animate-spin" strokeWidth={1.25} strokeOpacity={0.7} height={40} width={40}/></div>} 
      </div>
    </div>
  );
};

export default TopPosts;
