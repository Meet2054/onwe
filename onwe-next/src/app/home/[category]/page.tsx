"use client";
import Posts from "@/components/post_component/Posts";
import { useParams } from "next/navigation";
import React from "react";

const page = () => {
  const { category }: { category: string } = useParams();
  // TODO - Add the logic to fetch the data for the category
  return (
    <div>
      <Posts category={category} />
    </div>
  );
};

export default page;
