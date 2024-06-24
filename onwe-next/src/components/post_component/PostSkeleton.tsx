// components/post_component/PostsSkeleton.tsx
import React from "react";
import { Skeleton } from "../ui/skeleton";

const PostsSkeleton = () => {
  return (
    <div className="w-11/12 border rounded-xl shadow-sm rounded-md mt-9 p-4 animate-pulse">
      <div className="flex items-center gap-3">
        <Skeleton className="w-10 h-10 rounded-full bg-gray-300" />
        <div>
          <Skeleton className="w-24 h-4 mb-1  bg-gray-300" />
          <Skeleton className="w-16 h-3 bg-gray-300" />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center mt-4">
        <div className="w-10/12">
          <Skeleton className="h-6 mb-4  bg-gray-300 " />
          <Skeleton className="h-6 mb-4  bg-gray-300" />
          <Skeleton className="h-6 mb-4  bg-gray-300" />
          <Skeleton className="h-6 mb-4  bg-gray-300" />
          <Skeleton className="w-full h-64 mt-4  bg-gray-300" />
          <div className="w-full mt-4">
            <Skeleton className="w-full h-8  bg-gray-300" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostsSkeleton;
