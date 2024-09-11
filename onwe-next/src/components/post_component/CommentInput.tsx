"use client";
import React, { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import { ArrowUp } from "lucide-react";
import { useAuth, useUser } from "@clerk/nextjs";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

const CommentInput = ({ setComments }) => {
  const { user } = useUser();
  const [comment, setComment] = useState("");
  const { post } = useSelector((state: RootState) => state.post);
  const { getToken } = useAuth();

  const handleClick = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!comment) return;
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/comments`,
      {
        content: comment,
        parentId: null,
        postId: post.id,
      },
      {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
          "Content-Type": "application/json",
          Accept: "*/*",
          "ngrok-skip-browser-warning": "69420",
        },
      }
    );

    const newData = {
      ...data,
      user: {
        avatar: user?.imageUrl,
        username: user?.username,
      },
    };

    setComment("");

    setComments((prev) => (prev ? [newData, ...prev] : [newData]));
  };
  return (
    <form onSubmit={handleClick}>
      <div className="flex justify-center border border-black ">
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
          type="submit"
        >
          <ArrowUp strokeWidth={1} />
        </Button>
      </div>
    </form>
  );
};

export default CommentInput;
