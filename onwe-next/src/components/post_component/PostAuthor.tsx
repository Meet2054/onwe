import React from "react";
import PostAvatar from "./PostAvatar";
import { PostsProps } from "@/types/type";
import Link from "next/link";
import Description from "./Description";

const PostAuthor = ({ post }: { post: PostsProps }) => {
  return (
    <div className="w-full flex gap-1">
      <div>
        <PostAvatar size={7} imageUrl={post.avatar} />
      </div>
      <div className="w-full">
        <Link href={`/profile/${post.username}`} className="p-2 font-semibold">
          {post.username}
        </Link>
        <div 
          className={`
            ${post.media.length === 0 ? ' p-2  flex items-center justify-center' : ''}
            w-full
          `}
        >
          <Description text={post.media.length === 0} des={post.description} />
        </div>
      </div>
    </div>
  );
};

export default PostAuthor;