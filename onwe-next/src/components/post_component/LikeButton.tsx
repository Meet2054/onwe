import { PostsProps } from "@/types/type";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { ThumbsUp } from "lucide-react";
import React, { useEffect, useState } from "react";

const LikeButton = ({ post }: { post: PostsProps }) => {
  console.log(post);

  const [isClicked, setIsClicked] = useState(post?.liked || false);
  const [likeCount, setLikeCount] = useState(post?.likes);
  const { getToken } = useAuth();

  const handleLike = async () => {
    await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/posts/like`,
      { postId: post.id },
      {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
          "Content-Type": "application/json",
          Accept: "*/*",
          "ngrok-skip-browser-warning": "69420",
        },
      }
    );
  };

  return (
    <div className="flex justify-center items-center gap-2">
      <div
        className={`w-8 h-8 rounded-2xl border border-gray-400 justify-center items-center gap-2.5 inline-flex cursor-pointer`}
      >
        <div
          className="flex justify-center"
          onClick={() => {
            setLikeCount((prev) => (isClicked ? prev - 1 : prev + 1));
            setIsClicked(!isClicked);
            handleLike();
          }}
        >
          <ThumbsUp
            strokeWidth={1.4}
            stroke="black"
            fillOpacity={0.5}
            fill={isClicked ? "blue" : "white"}
            className={`w-6 h-5 relative flex-col justify-start items-start  inline-flex`}
          />
        </div>
      </div>
      {likeCount}
    </div>
  );
};

export default LikeButton;
