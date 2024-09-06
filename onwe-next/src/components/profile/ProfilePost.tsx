import { PostsProps } from "@/types/type";
import React, { useEffect } from "react";
import DialogBox from "../post_component/Dialog_component/DialogBox";
import { useDispatch } from "react-redux";
import { setPost } from "@/lib/features/posts/postSlice";
import { Skeleton } from "../ui/skeleton";
import PostImage from "../post_component/PostImage";
import PostsSkeleton from "../post_component/PostSkeleton";

const ProfilePost = ({ posts }: { posts: PostsProps[] }) => {
  const dispatch = useDispatch();
  const handleClick = (post: PostsProps) => {
    dispatch(setPost(post));
  };

  if (!posts) return <ProfilePostSkeleton />;
  if (!posts) return;

  const newPosts = posts.filter((post) => post.media.length > 0);

  // console.log(posts, "hi")
  return (
    <div className=" flex grid grid-cols-3  gap-1 mt-10 h-full w-full">
      {newPosts !== null &&
        newPosts.map((post) => (
          <div
            key={post.id}
            onClick={() => {
              handleClick(post);
            }}
            className="w-full h-52 "
          >
            <DialogBox post={post} imageUrl={post.media[0]} />
          </div>
        ))}
    </div>
  );
};

export default ProfilePost;

const ProfilePostSkeleton = () => {
  return (
    <div className=" flex grid grid-cols-3 border gap-1 h-[95dvh]">
      <Skeleton className="h-52 w-full animate-pulse" />
      <Skeleton className="h-52 w-full animate-pulse" />
      <Skeleton className="h-52 w-full animate-pulse" />
      <Skeleton className="h-52 w-full animate-pulse" />
      <Skeleton className="h-52 w-full animate-pulse" />
      <Skeleton className="h-52 w-full animate-pulse" />
      <Skeleton className="h-52 w-full animate-pulse" />
      <Skeleton className="h-52 w-full animate-pulse" />
      <Skeleton className="h-52 w-full animate-pulse" />
      {/* <Skeleton className="h-52 w-full animate-pulse" /> */}
    </div>
  );
};
