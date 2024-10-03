"use client";
import TopPosts from "@/components/explore/TopPosts";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";


const Page = () => {
  const search = useSelector((state: RootState) => state.explore.search);
  return (
    <div className="h-screen">
      <TopPosts />
      {/* {search && (
        <div className="fixed inset-0 bg-opacity-50 flex sm:items-center justify-center">
          <SearchComponent />
        </div>
      )} */}
    </div>
  );
};

export default Page;
