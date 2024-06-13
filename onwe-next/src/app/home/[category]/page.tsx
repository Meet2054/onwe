"use client";
import Posts from "@/components/post_component/Posts";
import { useParams } from "next/navigation";
import React from "react";

const Page = () => {
  const { category }: { category: string } = useParams();
  // TODO - Add the logic to fetch the data for the category
  return (
    <div className="flex flex-col space-y-10 overflow-y-auto justify-between h-full">
      <div className="flex-1 p-5 space-y-5 scrollbar-hide">
        <Posts />
        <Posts />
        <Posts />
        <Posts />
        <Posts />
      </div>
    </div>
  );
};

export default Page;
