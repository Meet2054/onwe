"use client";
import TopClubs from "@/components/explore/TopClubs";
import TopPosts from "@/components/explore/TopPosts";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import SearchComponent from "@/components/explore/SearchComponent";

const Page = () => {
  const search = useSelector((state: RootState) => state.explore.search);
  return (
    <div className={`flex flex-col h-[84dvh] overflow-y-auto p-4`}>
      <TopClubs />
      <TopPosts />

      {search && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <SearchComponent />
        </div>
      )}
    </div>
  );
};

export default Page;
