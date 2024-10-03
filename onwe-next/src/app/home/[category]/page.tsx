"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

import Posts from "@/components/post_component/Posts";
import PostsSkeleton from "@/components/post_component/PostSkeleton";
import { useDispatch } from "react-redux";
import { setPost } from "@/lib/features/posts/postSlice";
import { PostsProps } from "@/types/type";
import { useSignIn } from "@/hooks/useSignIn";

interface paramsProps {
  params: {
    category: string;
  };
}

const Page: React.FC<paramsProps> = ({ params }) => {
  const { getToken } = useSignIn();
  const [token, setToken] = useState("");
  const [error, setError] = useState<any>(null);
  const [responseData, setResponseData] = useState<PostsProps[] | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTokenAndData = async () => {
      try {
        const fetchedToken =  getToken();
        // console.log(fetchedToken);

        setToken(fetchedToken!);

        axios
          .get(
            `${process.env.NEXT_PUBLIC_API_URL}/posts/category/${params.category}`,
            {
              headers: {
                Authorization: `Bearer ${fetchedToken}`,
                "Content-Type": "application/json",
                Accept: "*/*",
                "ngrok-skip-browser-warning": "69420",
              },
            }
          )
          .then((data) => {
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
    <div className="flex overflow-auto h-screen w-full bg-white">
      <div className="h-full w-full bg-white flex flex-col overflow-y-auto scrollbar-hide">
        {responseData && responseData.length > 0 ? (
          responseData.map((post, index) => <Posts key={index} post={post} />)
        ) : (
          <div className="h-full w-full text-xl  justify-center items-center flex text-gray-500">
            No post in this category
          </div>
        )}
        <div className="mt-20"></div>
      </div>
    </div>
  );
};

export default Page;
