import React from "react";
import PollComponent from "./PollComponent";

const VoteBar = ({ value }: { value: number }) => {
  const intVal = Math.round(value);
  return (
    <div className="flex gap-4 items-center">
      <div className="w-3/4 h-5 border rounded-md">
        <div
          style={{ width: `${value}%` }}
          className="bg-green-400 h-5 rounded-md"
        ></div>
      </div>
      {intVal}%
    </div>
  );
};

export default VoteBar;
