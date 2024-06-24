import { Copy } from "lucide-react";
import React from "react";
import DialogBox from "./DialogBox";
import LikeButton from "./LikeButton";

const LikeComment = () => {
  return (
    <div className="w-full p-2 flex justify-between ">
      <LikeButton />

      <div className="justify-start items-start gap-2.5 flex">
        <div className=" w-20 h-8 px-3 py-2 rounded-2xl border border-gray-400 justify-center items-center gap-2.5 inline-flex">
          <div className="text-black text-sm font-normal ">
            <DialogBox />
          </div>
        </div>

        <div className=" w-11 h-8 px-3 py-2 rounded-2xl border border-black/opacity-30 justify-center items-center gap-2.5 inline-flex">
          <Copy strokeWidth={1} className="w-5 h-5 " />
        </div>
      </div>
    </div>
  );
};

export default LikeComment;
