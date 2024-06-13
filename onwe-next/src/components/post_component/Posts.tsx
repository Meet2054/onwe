import React from "react";
import PostAvatar from "./PostAvatar";
import { MessageSquare, ThumbsUp } from "lucide-react";
import ShareIcon from "./ShareIcon";

const Posts = () => {
  return (
    <div className="w-[826px] h-[538.512px]  bg-white rounded-xl shadow-md mt-5 p-5 md:p-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="flex items-start md:items-center">
          <PostAvatar />
          <div className="px-3 flex flex-col gap-0">
            <span className="text-lg font-bold">Name</span>
            <span className="text-sm relative bottom-1 text-[#5D5D5D]">
              #rituisboy
            </span>
          </div>
        </div>
        <div className="mt-2 md:mt-0 p-2">2 hours ago</div>
      </div>
      <div className="p-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt vel itaque
        nulla dolores ipsam repudiandae iusto corporis dolore, quidem hic!
        Possimus facere illum sed vitae ad dolore accusantium harum velit.
      </div>
      <div className="w-[729.453px] h-[287.671px] border border-gray-400 flex items-center justify-center">
        media
      </div>
      <div className="p-1 flex justify-around md:justify-start space-x-5">
        <div className="w-max flex space-x-2 justify-center items-center">
          <ThumbsUp strokeWidth={1} /> <span className="py-1">69</span>
        </div>
        <div className="w-max flex space-x-2 justify-center items-center">
          <MessageSquare strokeWidth={1} /> <span className="py-1">420</span>
        </div>
        <div className="w-max flex space-x-2 justify-center items-center">
          <ShareIcon /> <span className="py-1">69</span>
        </div>
      </div>
    </div>
  );
};

export default Posts;
