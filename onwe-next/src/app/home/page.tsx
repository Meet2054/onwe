"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth, useUser } from "@clerk/nextjs";
import Posts from "@/components/post_component/Posts";
import PostsSkeleton from "@/components/post_component/PostSkeleton";

const Page = () => {
  const { getToken } = useAuth();
  const [token, setToken] = useState("");
  const [showSkeleton, setShowSkeleton] = useState(true);
  const { user } = useUser();
  const [error, setError] = useState(null);
  const [responseData, setResponseData] = useState([]);

  useEffect(() => {
    const fetchTokenAndData = async () => {
      try {
        const fetchedToken = await getToken({ template: "test" });
        setToken(fetchedToken!);

        // console.log("Fetched Token:", fetchedToken);
        axios
          .get(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`, {
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 1000); // Adjust the duration as needed

    return () => clearTimeout(timer);
  }, []);

  return showSkeleton ? (
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
          responseData.map((res, index) => {
            return <Posts key={index} res={res} />;
          })}

        {/* <Posts />
        <Posts />
        <Posts />
        <Posts />
        <Posts />
        <Posts />
        <Posts /> */}
        <div className="mt-20"></div>
      </div>
    </div>
  );
};

export default Page;
