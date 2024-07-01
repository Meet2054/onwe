"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ArrowUp } from "lucide-react";
import { useUser } from "@clerk/nextjs";

const CommentInput = () => {
  const { user } = useUser();
  const [comment, setComment] = useState("");

  const handleClick = () => {
    console.log(user?.username);
    console.log(comment);
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setComment("");
      }}
    >
      <div className="flex justify-center border border-black rounded-full">
        <input
          className=" w-10/12 px-2  rounded-full focus-visible:outline-none border-0 focus-visible:ring-0"
          placeholder="comment ...."
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
        <Button
          variant="ghost"
          className="hover:rounded-full hover:text-black p-2 "
          onClick={handleClick}
        >
          <ArrowUp strokeWidth={1} />
        </Button>
      </div>
    </form>
  );
};

export default CommentInput;
