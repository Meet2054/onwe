import React from "react";
import PostAvatar from "./PostAvatar";
import LikeComment from "./LikeComment";
import Image from "next/image";
import PostImage from "./PostImage";

const Posts = () => {
  return (
    <div className="w-11/12 border rounded-xl shadow-smrounded-md mt-9 p-4 ">
      <div className="flex items-center gap-3">
        <PostAvatar />
        <div>
          <span className="font-bold">rituisboy</span>
          <span className="block text-sm text-gray-500">2 hours ago</span>
        </div>
      </div>
      <div className="flex flex-col justify-center  items-center">
        <div className="w-10/12 ">
          <div className="mt-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt vel
            itaque nulla dolores ipsam repudiandae iusto corporis dolore, quidem
            hic! Possimus facere illum sed vitae ad dolore accusantium harum
            velit.
          </div>
          <PostImage className="w-full relative h-80 mt-4 overflow-hidden" />

          <div className="w-full">
            <LikeComment />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
