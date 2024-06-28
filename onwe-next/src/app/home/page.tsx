"use client";
import PostsSkeleton from "@/components/post_component/PostSkeleton";
import { useAuth, useUser } from "@clerk/nextjs";
import React, { useState, useEffect, Suspense } from "react";

const Page = () => {
  const { getToken } = useAuth();
  const [token, setToken] = useState("");
  const [showSkeleton, setShowSkeleton] = useState(true);

  const { user } = useUser();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 1000); // Adjust the duration as needed

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    getToken().then((token) => {
      setToken(token!);
    });
  }, [getToken]);

  

  return showSkeleton ? (
    <PostsSkeleton />
  ) : (
    <div className="w-96 p-4 break-all whitespace-pre-wrap">{token}</div>
  );
};

export default Page;
