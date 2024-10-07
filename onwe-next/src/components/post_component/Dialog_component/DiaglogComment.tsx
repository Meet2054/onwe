"use client";
import React, { useEffect, useState } from "react";
import PostAuthor from "../PostAuthor";
import SingleComment from "../SingleComment";
import CommentInput from "../CommentInput";

import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { Comment, PostsProps } from "@/types/type";
import LikeButton from "../LikeButton";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

const DiaglogComment = ({ post }: { post?: PostsProps }) => {
  const { post: storedPost } = useSelector((state: RootState) => state.post);

  const [comments, setComments] = useState<Comment[]>([]);
  const { data, mutate, isLoading } = useSWR(
    `/posts/${post?.id || storedPost?.id}/comments`,

    {
      onSuccess: (data) => {
        setComments(data);
      },
    }
  );

  return (
    <div className="w-full h-full flex flex-col p-3 rounded-full ">
      <div className="flex gap-3 flex-col">
        <PostAuthor post={post || storedPost} />
        <div className="border border-gray-200" />
      </div>
      <div className="w-full flex-grow mt-1 h-full  overflow-y-auto scrollbar-custom space-y-4  p-4 ">
        {comments &&
          comments.map((comment) => (
            <SingleComment
              key={comment.id}
              data={comment}
              parentMutator={mutate}
            />
          ))}
      </div>
      <div className="flex flex-col w-fullspace-y-2 gap-3">
        <div className="grid grid-cols-3">
          <div className="justify-self-start px-3">
            <LikeButton post={post!} />
          </div>
          <span>{comments.length} comments</span>
          {/* <CopyButton /> */}
        </div>

        <CommentInput mutate={mutate} setComments={setComments} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default DiaglogComment;
