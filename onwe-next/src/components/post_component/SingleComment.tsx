import React from "react";
import PostAvatar from "./PostAvatar";
import { Button } from "../ui/button";

const SingleComment = ({
  username,
  comment,
}: {
  username: string;
  comment: string;
}) => {
  return (
    <div className="flex gap-1">
      <div>
        <PostAvatar size={7} />
      </div>
      <div>
        <div className="">
          <span className="p-2 font-semibold">{username}</span>
          <span>{comment}</span>
        </div>
        <div>
          <span>3h ago</span>
          <Button>reply</Button>
        </div>
      </div>
    </div>
  );
};

export default SingleComment;
