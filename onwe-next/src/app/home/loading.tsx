"use client";
import React, { useEffect, useState } from "react";
import PostsSkeleton from "@/components/post_component/PostSkeleton";
const Loading = () => {
  return (
    <div className="w-full h-full">
      <PostsSkeleton />
    </div>
  );
};

export default Loading;
