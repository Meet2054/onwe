import React from "react";
import PostAvatar from "./PostAvatar";

const PostAuthor = () => {
  return (
    <div className="flex gap-1">
      <div>
        <PostAvatar size={7} />
      </div>
      <div>
        <span className="p-2 font-semibold">rituisboy</span>
        <span>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat
        </span>
      </div>
    </div>
  );
};

export default PostAuthor;
