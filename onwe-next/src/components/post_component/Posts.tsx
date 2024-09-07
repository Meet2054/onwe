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
import "../../app/globals.css";

interface PostsComponentProps {
  post: PostsProps;
}

const Posts: React.FC<PostsComponentProps> = ({ post }) => {
  const [timeAgo, setTimeAgo] = useState("");
  const [isExpanded, setIsExpanded] = useState(false); // State to track if description is expanded
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
  }, [post?.createdAt]);

  // Toggle the expanded state of the description
  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      onClick={handleClick}
      className="w-[85%] m-1 p-5 rounded-lg bg-white "
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
        <div className={post?.media.length === 0 ? " " : " "}>
          
        {post?.description && (
    <>
      <div
        className={`${
          post?.media.length !== 0
            ? "inter font-[400] text-sm shadow p-2 pb-1 rounded-md normal-case relative mb-2 " 
            : "inter normal-case relative bg-articles-card rounded-2xl shadow p-5  font-medium mb-2"
        } ${isExpanded ? "" : "line-clamp-4"}`}
      >
        {post?.description || ""}
      </div>

      {/* Toggle button for more/less */}
      {post?.description.length > 505 && (
        <button
          onClick={toggleDescription}
          className="text-blue-500 text-sm font-semibold hover:underline ml-[92%]"
        >
          {isExpanded ? "less" : "more"}
        </button>
      )}
    </>
  )}

          <PostImage
            images={post?.media}
            className="w-full h-[400px] relative bg-black rounded-lg ml-0 mb-4"
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
