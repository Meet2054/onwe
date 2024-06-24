"use client";
import Posts from "@/components/post_component/Posts";
import { useParams } from "next/navigation";
import React from "react";

const Page = () => {
  const { category }: { category: string } = useParams();
  // TODO - Add the logic to fetch the data for the category
  return (
    <div className="flex overflow-auto h-screen w-screen ">
      <div className="h-full w-full flex flex-col items-center  overflow-y-auto scrollbar-hide">
        <Posts />
        <Posts />
        <Posts />
        <Posts />
        <Posts />
        <Posts />
        <Posts />
        <Posts />
        <div className="mt-20"></div>
      </div>
    </div>
  );
};

export default Page;
