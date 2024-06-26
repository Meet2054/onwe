import React, { useEffect, useRef, useState } from "react";
import PostAvatar from "./PostAvatar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const SingleComment = ({
  username,
  comment,
}: {
  username: string;
  comment: string;
}) => {
  const [replyOpen, setReplyOpen] = useState(false);
  const [reply, setReply] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleReplyClick = () => {
    setReplyOpen(!replyOpen);
  };

  useEffect(() => {
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
          <Button onClick={handleReplyClick}>reply</Button>
          {replyOpen && (
            <div className="flex">
              <Input
                ref={inputRef}
                onChange={(e) => setReply(e.target.value)}
                value={reply}
                pattern="reply"
                className="rounded-full ring-0 border-gray-300 text-black "
              />

              <Button className="border rounded-full hover:">send</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleComment;
