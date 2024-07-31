import React, { useEffect, useRef, useState } from "react";
import PostAvatar from "./PostAvatar";
import { Button } from "../ui/button";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import { getData } from "@/lib/utils";
import { Comment } from "@/types/type";

const SingleComment = ({
  data,
  username,
  comment,
  avatar,
}: {
  data: Comment;
  username: string;
  comment: string;
  avatar: string;
}) => {
  const [replyOpen, setReplyOpen] = useState(false);
  const [reply, setReply] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [replies, setReplies] = useState<Comment[]>([]);
  const { getToken } = useAuth();

  const handleReplyClick = () => {
    setReplyOpen(!replyOpen);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!reply) return;
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/comments`,
        {
          postId: data.postId,
          userId: data.userId,
          content: reply,
          parentId: data.id,
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
      setReply("");
      // console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const showReply = async () => {
    console.log(data);
    const token = await getToken();
    const response = await getData("/subcomments", {
      postId: data.postId,
      parentId: data.id,
    });
    console.log(response);
    setReplies(response);
  };

  useEffect(() => {
    // console.log("data", data);

    if (replyOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [replyOpen]);

  return (
    <div className="flex gap-1">
      <div>
        <PostAvatar size={7} imageUrl={avatar} />
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
          {replies &&
            replies.map((reply) => (
              <SingleComment
                key={reply.id}
                comment={reply.content}
                username={reply.user.username}
                data={reply}
              />
            ))}
          <form onSubmit={handleSubmit}>
            {replyOpen && (
              <div className="flex">
                <input
                  ref={inputRef}
                  onChange={(e) => setReply(e.target.value)}
                  value={reply}
                  className="bg-white border-b outline-none"
                />

                <Button type="submit" className="px-3 py-0" variant="ghost">
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
