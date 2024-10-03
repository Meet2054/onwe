"use client";

import { PostContext } from "@/app/home/Providor";
import { useSignIn } from "@/hooks/useSignIn";
import { PostsProps } from "@/types/type";
import axios from "axios";
import { Heart } from "lucide-react";
import React, { useEffect, useState, useContext, useCallback } from "react";

const LikeButton = ({ post }: { post: PostsProps }) => {
  const [isLiked, setIsLiked] = useState(post?.liked || false);
  const [likeCount, setLikeCount] = useState(post?.likes || 0);
  const [isUpdating, setIsUpdating] = useState(false);
  const { getToken } = useSignIn();
  const mutate = useContext(PostContext);

  const updateLikeStatus = useCallback(async () => {
    if (isUpdating) return;

    setIsUpdating(true);
    const newIsLiked = !isLiked;
    const newLikeCount = newIsLiked ? likeCount + 1 : likeCount - 1;
    setIsLiked(newIsLiked);
    setLikeCount(newLikeCount);

    // Update the SWR cache
    mutate((prevData: PostsProps[][]) => {
      return prevData.map((page) =>
        page.map((p) =>
          p.id === post.id
            ? { ...p, liked: newIsLiked, likes: newLikeCount }
            : p
        )
      );
    }, false);

    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/like`,
        { postId: post.id },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "application/json",
            Accept: "*/*",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );

      // false means we don't want to revalidate immediately
    } catch (error) {
      console.error("Error updating like status:", error);
    } finally {
      setIsUpdating(false);
    }
  }, [isLiked, likeCount, post.id, getToken, mutate, isUpdating]);

  useEffect(() => {
    setIsLiked(post.liked);
    setLikeCount(post.likes);
  }, [post.liked, post.likes]);

  return (
    <div className="flex justify-center items-center gap-2">
      <button
        className="flex justify-center items-center"
        onClick={updateLikeStatus}
        disabled={isUpdating}
        aria-label={isLiked ? "Unlike" : "Like"}
      >
        <Heart
          strokeWidth={isLiked ? 0 : 1.5}
          fillOpacity={0.8}
          fill={isLiked ? "red" : "white"}
          className="flex-col justify-start items-start w-6 h-6"
        />
      </button>
      <div className="text-[17px] w-4">{likeCount}</div>
    </div>
  );
};

export default React.memo(LikeButton);
