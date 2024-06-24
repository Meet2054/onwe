import React from "react";
import PostAvatar from "./PostAvatar";
import { Button } from "../ui/button";

const Comments = ({ comment }: { comment: string }) => {
  return (
    <div className="w-full h-max  mt-4 flex space-x-2">
      <PostAvatar />
      <div>
        <span className="font-bold">username</span> <span>{comment}</span>
        <div>
          <span>3h ago</span> <Button variant="destructive">reply</Button>
        </div>
      </div>
    </div>
  );
};

export default Comments;
