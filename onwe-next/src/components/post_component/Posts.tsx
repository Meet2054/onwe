"use client";
import React, { useEffect, useState, useRef } from "react";
import PostAvatar from "./PostAvatar";
import LikeComment from "./LikeComment";
import PostImage from "./PostImage";
import { useDispatch } from "react-redux";
import { setPost } from "@/lib/features/posts/postSlice";
import { PostsProps } from "@/types/type";
import { parseISO, formatDistanceToNowStrict } from "date-fns";
import Link from "next/link";
import "../../app/globals.css";
import Description from "./Description";

interface PostsComponentProps {
  post: PostsProps;
}

const Posts: React.FC<PostsComponentProps> = ({ post }) => {
  const [timeAgo, setTimeAgo] = useState("");
  const [isExpanded, setIsExpanded] = useState(false); // State to track if description is expanded
  const [showMoreButton, setShowMoreButton] = useState(false); // State to decide whether to show 'more' button
  const descriptionRef = useRef<HTMLDivElement>(null); // Ref to access description element
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

  useEffect(() => {
    // Check the height of the description to determine if "more" button is needed
    if (descriptionRef.current) {
      const lineHeight = 20; // Example line-height in pixels, adjust based on your CSS
      const maxLines = 4;
      const maxHeight = lineHeight * maxLines;
      if (descriptionRef.current.scrollHeight > maxHeight) {
        setShowMoreButton(true);
      }
    }
  }, [post?.description]);

  // Toggle the expanded state of the description
  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      onClick={handleClick}
      className="w-[80%] m-1 p-5 pb-2 rounded-lg bg-white "
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
      <div className= {` flex flex-col mt-4 ml-12 ${post?.media.length === 0 ? "bg-zinc-100 border shadow rounded-2xl" : ""} `}>
        {post?.description && (
          <div className={post?.media.length === 0 ? " " : " "}>
            <div
              ref={descriptionRef}
              className={`${
                post?.media.length !== 0
                  ? "inter font-[400] text-sm shadow p-2 pb-1 rounded-md normal-case relative"
                  : "inter normal-case relative  rounded-2xl  p-5 font-medium "
              } ${isExpanded ? "" : "line-clamp-4"}`} // Apply line clamping only when not expanded
              style={{ display: "-webkit-box", WebkitBoxOrient: "vertical" }}
            >
              <Description des={post?.description} />
              {/* {post?.description} */}
              {showMoreButton && (
                <button
                  onClick={toggleDescription}
                  className="absolute bottom-0 right-4 text-gray-500 text-sm font-semibold hover:underline ml-[92%] mt-0"
                >
                  {isExpanded ? "...less" : "...more"}
                </button>
              )}
            </div>

            {/* Toggle button for more/less */}
          </div>
        )}

        <PostImage
          images={post?.media}
          fill="cover"
          className="h-[450px] bg-black relative rounded-lg ml-0 mt-2"
        />
        <div className={`w-full ${ post?.media.length === 0? "px-5 pb-1" : ""} `}>
          <LikeComment post={post} />
        </div>
      </div>
    </div>
  );
};

export default Posts;
