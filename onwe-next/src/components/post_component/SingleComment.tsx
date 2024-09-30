import React, { useEffect, useRef, useState } from "react";
import PostAvatar from "./PostAvatar";
import { Button } from "../ui/button";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { getData } from "@/lib/utils";
import { Comment } from "@/types/type";
import { formatDistanceToNowStrict, parseISO } from "date-fns";
import { Link } from "next-view-transitions";
import { useSignIn } from "@/hooks/useSignIn";
import useSWR, { useSWRConfig } from "swr";

interface User {
  username: string;
  avatar: string;
}

interface SingleCommentProps {
  data: Comment;
  parentMutator: any;
}

const SingleComment = ({ data, parentMutator }: SingleCommentProps) => {
  const { getUsername } = useSignIn();
  const [replyInputOpen, setReplyInputOpen] = useState(false);
  const [reply, setReply] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [replies, setReplies] = useState<Comment[]>([]);
  const [showReplies, setShowReplies] = useState(false);
  const [repliesHeight, setRepliesHeight] = useState(0);
  const { mutate: pMutate } = useSWRConfig();

  const repliesRef = useRef<HTMLDivElement>(null);
  const { getToken, user } = useSignIn();
  const [timeAgo, setTimeAgo] = useState("");
  const config = useSWRConfig();

  // New state for mentions
  const [mentionOptions, setMentionOptions] = useState<User[]>([]);
  const [showMentions, setShowMentions] = useState(false);

  const { data: swrReply, mutate } = useSWR<Comment[]>(
    `/subcomments/${data.postId}/${data.id}`,
    {
      // revalidateOnFocus: false,
      // Add any additional logic here
    }
  );

  const handleDeleteClick = async () => {
    await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/comments/${data.id}`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
          Accept: "*/*",
          "ngrok-skip-browser-warning": "69420",
        },
      }
    );
    parentMutator();
  };

  const handleReplyClick = () => {
    setReplyInputOpen(!replyInputOpen);
  };

  useEffect(() => {
    const time = data.createdAt;
    if (time) {
      const date = new Date(parseISO(time));
      const timeago = formatDistanceToNowStrict(date, { addSuffix: true });
      setTimeAgo(timeago);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setReply("");
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
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "application/json",
            Accept: "*/*",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );
      const newUser = {
        username: user?.userName,
        avatar: user?.avatar,
      };
      res.data.user = newUser;

      mutate([...swrReply!, res.data], false);

      setReplies((prev) => (prev ? [...prev, res.data] : [res.data]));
      setReply("");
      setShowReplies(true);
      setReplyInputOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (replyInputOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [replyInputOpen]);

  useEffect(() => {
    if (repliesRef.current) {
      setRepliesHeight(repliesRef.current.scrollHeight);
    }
  }, [replies]);

  // New function to handle mentions
  const handleMention = async (query: string) => {
    if (query.length > 0) {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/explore/users/${query}`,
          {
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );
        setMentionOptions(
          response.data.map((user: any) => ({
            username: user.username,
            avatar: user.avatar,
          }))
        );
        setShowMentions(true);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    } else {
      setShowMentions(false);
    }
  };

  // New function to handle mention selection
  const handleMentionSelect = (username: string) => {
    const lastAtSymbolIndex = reply.lastIndexOf("@");
    const newReply =
      reply.slice(0, lastAtSymbolIndex) +
      "@" +
      username +
      " " +
      reply.slice(lastAtSymbolIndex + username.length + 1);
    setReply(newReply);
    setShowMentions(false);
    if (inputRef.current) {
      inputRef.current.focus();
      const length = newReply.length;
      inputRef.current.setSelectionRange(length, length);
    }
  };

  // Updated function to handle reply input change
  const handleReplyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setReply(newValue);

    const lastAtSymbolIndex = newValue.lastIndexOf(
      "@",
      e.target.selectionStart
    );
    if (lastAtSymbolIndex !== -1) {
      const query = newValue.slice(
        lastAtSymbolIndex + 1,
        e.target.selectionStart
      );
      handleMention(query);
    } else {
      setShowMentions(false);
    }
  };

  return (
    <div className="relative flex gap-1 overflow-hidden ">
      {showReplies && (
        <div className="absolute text-xl top-0 left-3 bottom-2 border-l w-10 border-gray-600 rounded-3xl" />
      )}
      <div>
        <PostAvatar size={7} imageUrl={data.user.avatar} />
      </div>
      <div>
        <div className="break-all">
          <Link
            href={`/profile/${data.user.username}`}
            className="p-2 font-semibold hover:underline"
          >
            {data.user.username}
          </Link>
          <span>{data.content}</span>
        </div>
        <div>
          <span className="text-sm">{timeAgo}</span>
          <Button variant="ghost" onClick={handleReplyClick}>
            reply
          </Button>
          {data.user.username === getUsername() && (
            <Button
              className="text-red-600"
              variant="ghost"
              onClick={handleDeleteClick}
            >
              Delete
            </Button>
          )}
          <form onSubmit={handleSubmit}>
            {replyInputOpen && (
              <div className="flex flex-col z-100 relative">
                {showMentions && mentionOptions.length > 0 && (
                  <div className="absolute z-100 w-full bottom-full mb-1 bg-white border border-gray-300 rounded-md shadow-lg">
                    {mentionOptions.map((user, index) => (
                      <div
                        key={index}
                        className="flex items-center px-4 py-2 cursor-pointer gap-x-2 hover:bg-gray-100"
                        onClick={() => handleMentionSelect(user.username)}
                      >
                        <PostAvatar imageUrl={user.avatar} size={6} />
                        <span>@{user.username}</span>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex">
                  <input
                    ref={inputRef}
                    onChange={handleReplyChange}
                    value={reply}
                    className="bg-white border-b outline-none flex-grow"
                  />
                  <Button type="submit" className="px-3 py-0" variant="ghost">
                    send
                  </Button>
                </div>
              </div>
            )}
          </form>
          <div
            ref={repliesRef}
            className={`overflow-y-auto transition-all duration-500 ease-in-out ${
              showReplies ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            {swrReply &&
              swrReply.map((reply) => (
                <SingleComment
                  key={reply.id}
                  data={reply}
                  parentMutator={mutate}
                />
              ))}
          </div>
          {swrReply && swrReply.length > 0 && (
            <div
              onClick={() => setShowReplies((prev) => !prev)}
              className="p-0 w-max hover:underline text-xs text-gray-500 cursor-pointer"
            >
              <span>
                {showReplies ? (
                  "hide replies"
                ) : (
                  <span>
                    show <span className="text-red-600">{swrReply.length}</span>{" "}
                    replies
                  </span>
                )}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleComment;
