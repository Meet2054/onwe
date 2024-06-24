import React from "react";
import PostAuthor from "../PostAuthor";
import SingleComment from "../SingleComment";
import CommentInput from "../CommentInput";
import LikeButton from "../LikeButton";
import CopyButton from "../CopyButton";

const DiaglogComment = () => {
  const randomComments = [
    { username: "user1", comment: "Lorem ipsum dolor sit amet" },
    { username: "user2", comment: "Consectetur adipiscing elit" },
    { username: "user3", comment: "Sed do eiusmod tempor incididunt" },
    { username: "user4", comment: "Ut labore et dolore magna aliqua" },
    { username: "user5", comment: "Quis ipsum suspendisse ultrices gravida" },
    { username: "user1", comment: "Risus commodo viverra maecenas" },
    { username: "user3", comment: "Accumsan lacus vel facilisis" },
    {
      username: "user4",
      comment: "Aenean et tortor at risus viverra adipiscing at in",
    },
    {
      username: "user2",
      comment: "Maecenas volutpat blandit aliquam etiam erat velit",
    },
    { username: "user5", comment: "Nunc sed augue lacus viverra vitae congue" },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div className="">
        <PostAuthor />
        <div className="border border-gray-200" />
      </div>
      <div className="w-full h-[70%] overflow-y-auto  space-y-4 scrollbar-hide p-4">
        {randomComments.map((comment, index) => (
          <SingleComment
            key={index}
            username={comment.username}
            comment={comment.comment}
          />
        ))}
      </div>
      <div className="flex flex-col space-y-2">
        <div className="flex justify-between items-center">
          <LikeButton />
          <span>{randomComments.length} comments</span>
          <CopyButton />
        </div>
        <CommentInput />
      </div>
    </div>
  );
};

export default DiaglogComment;
