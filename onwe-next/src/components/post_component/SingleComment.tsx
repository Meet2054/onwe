"use client";
import React, { useEffect, useRef, useState } from "react";
import PostAvatar from "./PostAvatar";
import { Button } from "../ui/button";
import { Comment } from "./Dialog_component/DiaglogComment";

import { useAuth } from "@clerk/nextjs";
import { getData } from "@/lib/utils";

const SingleComment = ({
  data,
  username,
  comment,
}: {
  data: Comment;
  username: string;
  comment: string;
}) => {
  const [replyOpen, setReplyOpen] = useState(false);
  const [reply, setReply] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { getToken } = useAuth();

  const handleReplyClick = () => {
    setReplyOpen(!replyOpen);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!reply) return;
    try {
      const response = await getData("/comments", {
        postId: data.postId,
        userId: data.userId,
        content: reply,
        parentId: data.id,
      });
      console.log(response);

      setReply("");
      // console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const showReply = () => {
    console.log(data);
  };

  useEffect(() => {
    console.log("data", data);

    if (replyOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [replyOpen]);

  return (
    <div className="flex gap-1">
      <div>
        <PostAvatar size={7} />
      </div>
      <div>
        <div className="">
          <span className="p-2 font-semibold">{username}</span>
          <span>{comment}</span>
        </div>
        <div>
          <span>3h ago</span>
          <Button variant="ghost" onClick={handleReplyClick}>
            reply
          </Button>
          <Button onClick={showReply} variant="link">
            show reply
          </Button>
          <form onSubmit={handleSubmit}>
            {replyOpen && (
              <div className="flex">
                <input
                  ref={inputRef}
                  onChange={(e) => setReply(e.target.value)}
                  value={reply}
                  className="bg-white border-b outline-none "
                />

                <Button type="submit" className=" px-3 py-0" variant="ghost">
                  send
                </Button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SingleComment;
