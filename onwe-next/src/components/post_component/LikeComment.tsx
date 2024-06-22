import { Copy, ThumbsUp } from "lucide-react";
import React from "react";

const LikeComment = () => {
  return (
    <div className="w-full p-2 flex justify-between ">
      <div className="w-8 h-8 rounded-2xl border border-gray-400 justify-center items-center gap-2.5 inline-flex">
        <ThumbsUp
          strokeWidth={1}
          className=" w-6 h-5 relative flex-col justify-start items-start inline-flex"
        />
      </div>
      <div className="justify-start items-start gap-2.5 flex">
        <div className=" w-20 h-8 px-3 py-2 rounded-2xl border border-gray-400 justify-center items-center gap-2.5 inline-flex">
          <div className="text-black text-sm font-normal ">comment</div>
        </div>
        <div className=" w-11 h-8 px-3 py-2 rounded-2xl border border-black/opacity-30 justify-center items-center gap-2.5 inline-flex">
          <Copy strokeWidth={1} className="w-5 h-5 " />
        </div>
      </div>
    </div>
  );
};

export default LikeComment;
