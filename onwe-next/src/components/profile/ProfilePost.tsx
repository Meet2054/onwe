import { PostsProps } from "@/types/type";
import React, { useEffect } from "react";
import DialogBox from "../post_component/Dialog_component/DialogBox";
import { useDispatch } from "react-redux";
import { setPost } from "@/lib/features/posts/postSlice";
import { Skeleton } from "../ui/skeleton";
import PostImage from "../post_component/PostImage";

const ProfilePost = ({ posts }: { posts: PostsProps[] }) => {
  const dispatch = useDispatch();
  const handleClick = (post: PostsProps) => {
    dispatch(setPost(post));
  };

  if (!posts) return <ProfilePostSkeleton />;

  const newPosts = posts.filter((post) => post.media.length > 0);
  console.log(posts, "hi")
  return (
    <div className=" flex grid grid-cols-3  gap-1 mt-10 h-max">
      {newPosts!==null &&
        newPosts.map((post) => (
          <div
            onClick={() => {
              console.log(post)
              handleClick(post)}}
            key={post.id}
          className="relative m-1 mb-2 border rounded-xl h-[300px]"
          >
            <DialogBox
              imageUrl={post?.media[0]}
              description={post.description}
              post={post}

            />
            {/* <div onClick={() => handleClick(post)}>

             <PostImage
            images={post?.media}
            className="w-full h-80 relative bg-black rounded-lg ml-0 mb-4"
            />
            </div> */}
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
      <Skeleton className="h-52 w-full animate-pulse" />
    </div>
  );
};
