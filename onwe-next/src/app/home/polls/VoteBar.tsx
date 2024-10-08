import React from "react";
import PollComponent from "./PollComponent";

const VoteBar = ({ value }: { value: number }) => {
  const intVal = Math.round(value);
  return (
    <div className="flex gap-4 items-center">
      <div className="w-4/5 h-5 border border-zinc-400 rounded-md">
        <div
          style={{ width: `${value}%` }}
          className="bg-black h-5 rounded-md"
        ></div>
      </div>
      {intVal}%
    </div>
  );
};

export default VoteBar;
