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
    <div
      onClick={handleClick}
      className="w-[85%] m-1 p-5 rounded-lg bg-white shadow border"
    >
      <div className="flex items-center gap-3">
        <PostAvatar imageUrl={post?.avatar} />
        <div>
          <Link
            href={`/profile/${post?.username}`}
            className="font-bold hover:text-custom-brown"
          >
            {post?.username || "OnwE"}
          </Link>
          <span className="block text-sm text-gray-500">{timeAgo}</span>
        </div>
      </div>
      <div className="flex flex-col mt-4 ml-1">
        <div className={post?.media.length === 0 ? " ":" "}>
          <PostImage
            images={post?.media}
            className="w-full h-80 relative bg-black rounded-lg ml-0 mb-4"
          />
          <div className={post?.media.length !== 0 ? 'p-2 pt-0 font-sans normal-case relative' : 'font-sans normal-case relative bg-articles-card rounded-2xl shadow p-5 font-medium mb-2'}>{post?.description || ""}</div>
          <div className="w-full">
            <LikeComment post={post} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
