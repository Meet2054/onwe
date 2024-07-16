"use client";
import React from "react";
import PostAvatar from "./PostAvatar";
import LikeComment from "./LikeComment";
import PostImage from "./PostImage";
import { useDispatch } from "react-redux";
import { setPost } from "@/lib/features/posts/postSlice";
import { PostsProps } from "@/types/type";

interface PostsComponentProps {
  post: PostsProps;
}

const Posts: React.FC<PostsComponentProps> = ({ post }) => {
  const dispatch = useDispatch();
  // const search = useSelector((state: RootState) => state.post);

  const handleClick = () => {
    dispatch(setPost(post!));
    // console.log(post);
  };

  return (
    <div
      onClick={handleClick}
      className="w-11/12 border rounded-xl shadow-smrounded-md mt-9 p-4 "
    >
      <div className="flex items-center gap-3">
        <PostAvatar imageUrl={post.avatar} />
        <div>
          <span className="font-bold">{post?.username || "rituisboy"}</span>
          <span className="block text-sm text-gray-500">2 hours ago</span>
        </div>
      </div>
      <div className="flex flex-col justify-center  items-center">
        <div className="w-10/12 ">
          <div className="mt-4">{post?.description || ""}</div>
          <PostImage
            images={post?.media}
            className="w-full relative h-80 mt-4 overflow-hidden"
          />

          <div className="w-full">
            <LikeComment post={post} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
