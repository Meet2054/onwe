"use client";
import React, { useEffect, useState } from "react";
import PostAuthor from "../PostAuthor";
import SingleComment from "../SingleComment";
import CommentInput from "../CommentInput";
import LikeButton from "../LikeButton";
import CopyButton from "../CopyButton";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import { Comment } from "@/types/type";

const DiaglogComment = () => {
  const { post } = useSelector((state: RootState) => state.post);
  const { getToken } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);

  const getComments = async () => {
    // console.log(post);

    try {
      const comment = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/${post.id}/comments`,
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
            "Content-Type": "application/json",
            Accept: "*/*",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );

      setComments(comment.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getComments();
  }, [post]);

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div className="">
        <PostAuthor />
        <div className="border border-gray-200" />
      </div>
      <div className="w-full h-[70%] overflow-y-auto  space-y-4 scrollbar-hide p-4">
        {comments &&
          comments.map((comment, index) => (
            <SingleComment
              key={index}
              data={comment}
              username={comment.user?.username}
              comment={comment.content}
            />
          ))}
      </div>
      <div className="flex flex-col space-y-2">
        <div className="flex justify-between items-center">
          <LikeButton post={post} />
          <span>{comments.length} comments</span>
          <CopyButton />
        </div>
        <CommentInput setComments={setComments} />
      </div>
    </div>
  );
};

export default DiaglogComment;
