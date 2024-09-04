import React from "react";
import DialogBox from "./Dialog_component/DialogBox";
import LikeButton from "./LikeButton";
import CopyButton from "./CopyButton";
import { PostsProps } from "@/types/type";

const LikeComment = ({ post }: { post: PostsProps }) => {
  return (
    <div className="w-full pt-2 pb-1 pl-0 flex justify-start items-start gap-5 relative   ">
      <LikeButton post={post} />
      <div>
        <DialogBox post={post} />
      </div>
      <CopyButton />
    </div>
  );
};

export default LikeComment;
