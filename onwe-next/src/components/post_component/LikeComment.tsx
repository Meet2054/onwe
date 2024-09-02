import React from "react";
import DialogBox from "./Dialog_component/DialogBox";
import LikeButton from "./LikeButton";
import CopyButton from "./CopyButton";
import { PostsProps } from "@/types/type";

const LikeComment = ({ post }: { post: PostsProps }) => {
  return (
    <div className="w-full p-2 flex justify-start items-start gap-3 relative  h-14  ">
      <LikeButton post={post} />
      <div>
        <DialogBox post={post} />
      </div>
      <CopyButton />
    </div>
  );
};

export default LikeComment;
