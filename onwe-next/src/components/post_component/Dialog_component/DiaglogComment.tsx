"use client";
import React, { useEffect, useState } from "react";
import PostAuthor from "../PostAuthor";
import SingleComment from "../SingleComment";
import CommentInput from "../CommentInput";

import CopyButton from "../CopyButton";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import axios from "axios";
import { Comment, PostsProps } from "@/types/type";
import { useSignIn } from "@/hooks/useSignIn";
import LikeButton from "../LikeButton";
import useSWR from "swr";
import { globalFetcher } from "@/lib/utils";

const DiaglogComment = ({ post }: { post?: PostsProps }) => {
  const { post: storedPost } = useSelector((state: RootState) => state.post);

  const [comments, setComments] = useState<Comment[]>([]);
  const { data } = useSWR(
    `/posts/${post?.id || storedPost?.id}/comments`,
    globalFetcher,
    {
      onSuccess: (data) => {
        setComments(data);
      },
    }
  );

  // const getComments = async () => {
  //   // console.log(post);

  //   try {
  //     const comment = await axios.get(
  //       `${process.env.NEXT_PUBLIC_API_URL}/posts/${
  //         post?.id || storedPost?.id
  //       }/comments`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${getToken()}`,
  //           "Content-Type": "application/json",
  //           Accept: "*/*",
  //           "ngrok-skip-browser-warning": "69420",
  //         },
  //       }
  //     );

  //     setComments(comment.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getComments();
  // }, [post]);

  return (
    <div className="w-full h-full flex flex-col p-2">
      <div>
        <PostAuthor post={post || storedPost} />
        <div className="border border-gray-200" />
      </div>
      <div className="w-full flex-grow mt-1 h-full  overflow-y-auto  space-y-4  p-2 ">
        {comments &&
          comments.map((comment) => (
            <SingleComment key={comment.id} data={comment} />
          ))}
      </div>
      <div className="flex flex-col w-fullspace-y-2">
        <div className="grid grid-cols-3">
          <div className="justify-self-start px-3">
            <LikeButton post={post!} />
          </div>
          <span>{comments.length} comments</span>
          {/* <CopyButton /> */}
        </div>

        <CommentInput setComments={setComments} />
      </div>
    </div>
  );
};

export default DiaglogComment;
