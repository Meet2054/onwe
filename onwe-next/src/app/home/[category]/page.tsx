"use client";
import Posts from "@/components/post_component/Posts";
import { useParams } from "next/navigation";
import React from "react";

const Page = () => {
  const { category }: { category: string } = useParams();
  // TODO - Add the logic to fetch the data for the category
  return (
    <div className="h-full w-full flex flex-col items-center  mb-4">
      <Posts />
      <Posts />
      <Posts />
      <Posts />
      <Posts />
      <Posts />
      <Posts />
      <Posts />
      <Posts />
      <div className="border  mt-6 " />
    </div>
  );
};

export default Page;
