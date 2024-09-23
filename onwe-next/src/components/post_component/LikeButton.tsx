"use client";
import { useSignIn } from "@/hooks/useSignIn";
import { setPost } from "@/lib/features/posts/postSlice";
import { RootState } from "@/lib/store";
import { PostsProps } from "@/types/type";

import axios from "axios";
import { Heart } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const LikeButton = ({ post }: { post: PostsProps }) => {
  const [isClicked, setIsClicked] = useState(post?.liked || false);
  const [likeCount, setLikeCount] = useState(post?.likes || 0);
  const { getToken } = useSignIn();
  const { timeline } = useSelector((state: RootState) => state.timeline);
  const dispatch = useDispatch();

  const likeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null); // Timeout reference

  const handleLike = async () => {
    const res = await axios.patch(
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
    // Optionally update the post in redux store
    // dispatch(setPost({...post, likes: isClicked ? post.likes - 1 : post.likes + 1, liked: !isClicked}));
  };

  const handleClick = () => {
    setLikeCount((prev) => (isClicked ? prev - 1 : prev + 1));
    setIsClicked((prev) => !prev);

    // Clear the previous timeout if the user clicks again within 1 second
    if (likeTimeout.current) {
      clearTimeout(likeTimeout.current);
    }

    // Set a new timeout for 1 second to handle the debounced like request
    likeTimeout.current = setTimeout(() => {
      handleLike(); // Send the API request only after 1 second of inactivity
    }, 1000);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/${post.id}`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "application/json",
            Accept: "*/*",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );

      const data = res.data;
      setIsClicked(() => data?.liked);
      setLikeCount(() => data?.likes);
    };
    fetchData();
  }, [getToken, post.id]);

  return (
    <div className="flex justify-center items-center gap-2 ">
      <div className="flex justify-center" onClick={handleClick}>
        <Heart
          strokeWidth={isClicked ? 0 : 1.5}
          fillOpacity={0.8}
          fill={isClicked ? "red" : "white"}
          className={`flex-col justify-start items-start`}
        />
      </div>
      <div className="text-[17px] w-1">{likeCount}</div>
    </div>
  );
};

export default LikeButton;
