import React from "react";

const VoteBar = ({ value }: { value: number }) => {
  const intVal = Math.round(value);
  return (
    <div className="flex gap-4">
      <div className="w-3/4 h-5 border rounded-full">
        <div
          style={{ width: `${value}%` }}
          className="bg-green-300 h-5 rounded-full"
        ></div>
      </div>
      {intVal}%
    </div>
  );
};

export default VoteBar;
