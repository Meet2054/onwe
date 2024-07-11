import { ThumbsUp } from "lucide-react";
import React, { useState } from "react";

const LikeButton = ({ likes, liked }: { likes: number; liked: boolean }) => {
  const [isClicked, setIsClicked] = useState(liked);
  const [likeCount, setLikeCount] = useState(likes);

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
          }}
        >
          <ThumbsUp
            strokeWidth={1.4}
            stroke={isClicked ? "black" : "white"}
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
