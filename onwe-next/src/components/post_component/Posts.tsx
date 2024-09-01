"use client";
import React, { useEffect, useState } from "react";
import PostAvatar from "./PostAvatar";
import LikeComment from "./LikeComment";
import PostImage from "./PostImage";
import { useDispatch } from "react-redux";
import { setPost } from "@/lib/features/posts/postSlice";
import { PostsProps } from "@/types/type";
import { parseISO, formatDistanceToNowStrict } from "date-fns";
import Link from "next/link";

interface PostsComponentProps {
  post: PostsProps;
}

const Posts: React.FC<PostsComponentProps> = ({ post }) => {
  const [timeAgo, setTimeAgo] = useState("");
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setPost(post!));
  };
  useEffect(() => {
    const time = post?.createdAt;
    if (time) {
      const date = new Date(parseISO(time));
      const timeago = formatDistanceToNowStrict(date, { addSuffix: true });
      setTimeAgo(timeago);
    }
  }, []);

  return (
    <div onClick={handleClick} className="w-11/12 border-b  rounded-md mt-9 ">
      <div className="flex items-center gap-3">
        <PostAvatar imageUrl={post?.avatar} />
        <div>
          <Link
            href={`/profile/${post?.username}`}
            className="font-bold hover:underline"
          >
            {post?.username || "rituisboy"}
          </Link>
          <span className="block text-sm text-gray-500">{timeAgo}</span>
        </div>
      </div>
      <div className="flex flex-col ">
        <div className="">
          <div className="mt-4">{post?.description || ""}</div>
          <PostImage
            images={post?.media}
            className="w-96 relative h-96 mt-4 overflow-hidden"
          />

          <div className="w-full">
            <LikeComment post={post} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
