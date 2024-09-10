import React from "react";
import PostAvatar from "./PostAvatar";
import { PostsProps } from "@/types/type";
import Link from "next/link";
import Description from "./Description";

const PostAuthor = ({ post }: { post: PostsProps }) => {
  return (
    <div className=" flex gap-1">
      <div>
        <PostAvatar size={7} imageUrl={post.avatar} />
      </div>
      <div>
        <Link href={`/profile/${post.username}`} className="p-2 font-semibold">
          {post.username}
        </Link>
        <span><Description des={post.description} /></span>
      </div>
    </div>
  );
};

export default PostAuthor;
