import { ThumbsUp } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";

const LikeButton = () => {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <div
      className={`w-8 h-8 rounded-2xl border border-gray-400 justify-center items-center gap-2.5 inline-flex ${
        isClicked ? "bg-blue-300" : ""
      }`}
    >
      <Button
        onClick={() => {
          setIsClicked(!isClicked);
        }}
      >
        <ThumbsUp
          strokeWidth={1.4}
          stroke="black"
          fillOpacity={0.5}
          className={`w-6 h-5 relative flex-col justify-start items-start  inline-flex ${
            isClicked ? "fill-blue-600   border-white" : ""
          }`}
        />
      </Button>
    </div>
  );
};

export default LikeButton;
