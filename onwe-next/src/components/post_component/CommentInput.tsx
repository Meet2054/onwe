"use client";
import React, { FormEvent, useState, useRef } from "react";
import { Button } from "../ui/button";
import { ArrowUp, LoaderPinwheel } from "lucide-react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { useSignIn } from "@/hooks/useSignIn";
import PostAvatar from "../post_component/PostAvatar";

interface User {
  username: string;
  avatar: string;
}

const CommentInput = ({ setComments, mutate, isLoading }) => {
  const [comment, setComment] = useState("");
  const { post } = useSelector((state: RootState) => state.post);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { getToken, user } = useSignIn();
  const [mentionOptions, setMentionOptions] = useState<User[]>([]);
  const [showMentions, setShowMentions] = useState(false);
  const commentInputRef = useRef<HTMLInputElement>(null);

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

  const handleMentionSelect = (username: string) => {
    const lastAtSymbolIndex = comment.lastIndexOf("@");
    const newComment =
      comment.slice(0, lastAtSymbolIndex) +
      "@" +
      username +
      " " +
      comment.slice(lastAtSymbolIndex + username.length + 1);
    setComment(newComment);
    setShowMentions(false);
    if (commentInputRef.current) {
      commentInputRef.current.focus();
      const length = newComment.length;
      commentInputRef.current.setSelectionRange(length, length);
    }
  };

  const handleClick = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!comment || isSubmitting) return;
    setIsSubmitting(true);
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/comments`,
      {
        content: comment,
        parentId: null,
        postId: post.id,
      },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
          Accept: "*/*",
          "ngrok-skip-browser-warning": "69420",
        },
        withCredentials: true,
      }
    );

    const newData = {
      ...data,
      user: {
        avatar: user?.avatar,
        username: user?.userName,
      },
    };

    setComment("");
    setIsSubmitting(false);

    setComments((prev) => (prev ? [newData, ...prev] : [newData]));
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setComment(newValue);

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
    <form onSubmit={handleClick}>
      <div className="flex justify-center border border-black relative rounded-full">
        {showMentions && mentionOptions.length > 0 && (
          <div className="absolute z-10 w-full mb-1 bg-white border border-gray-300 rounded-md shadow-lg bottom-10 left-0">
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
        <input
          ref={commentInputRef}
          className="w-11/12 px-2 rounded-full focus-visible:outline-none border-0 focus-visible:ring-0"
          placeholder="Comment ...."
          value={comment}
          onChange={handleCommentChange}
        />
        <Button
          variant="ghost"
          className="hover:rounded-full hover:text-black p-2"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <LoaderPinwheel size={16} />
          ) : (
            <ArrowUp strokeWidth={1} />
          )}
        </Button>
      </div>
    </form>
  );
};

export default CommentInput;
