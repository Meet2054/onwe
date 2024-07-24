import React from "react";
import DialogBox from "./Dialog_component/DialogBox";
import LikeButton from "./LikeButton";
import CopyButton from "./CopyButton";
import { PostsProps } from "@/types/type";

const LikeComment = ({ post }: { post: PostsProps }) => {
  return (
    <div className="w-full p-2 flex justify-between ">
      <LikeButton />

      <div className="justify-start items-start gap-2.5 flex">
        <div className=" w-20 h-8 px-3 py-2 rounded-2xl border border-gray-400 justify-center items-center gap-2.5 inline-flex">
          <div className="text-black text-sm font-normal ">
            <DialogBox post={post} />
          </div>
        </div>

        <CopyButton />
      </div>
    </div>
  );
};

export default LikeComment;
