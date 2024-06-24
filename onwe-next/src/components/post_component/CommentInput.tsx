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
        <Input
          className=" w-10/12 rounded-full border-none"
          placeholder="comment ...."
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
        <Button onClick={handleClick}>
          <ArrowUp strokeWidth={1} />
        </Button>
      </div>
    </form>
  );
};

export default CommentInput;
