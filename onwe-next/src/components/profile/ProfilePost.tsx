import { PostsProps } from "@/types/type";
import React, { useEffect } from "react";
import DialogBox from "../post_component/Dialog_component/DialogBox";
import { useDispatch } from "react-redux";
import { setPost } from "@/lib/features/posts/postSlice";

const ProfilePost = ({ posts }: { posts: PostsProps[] }) => {
  const dispatch = useDispatch();
  const handleClick = (post: PostsProps) => {
    dispatch(setPost(post));
  };

  return (
    <div className=" flex grid grid-cols-3 border gap-1 mt-10 h-max">
      {posts &&
        posts.map((post) => (
          <div
            onClick={() => handleClick(post)}
            key={post.id}
            className="relative  rounded-xl"
          >
            <DialogBox
              imageUrl={post.media[0]}
              description={post.description}
            />
          </div>
        ))}
    </div>
  );
};

export default ProfilePost;
// max-w-[200px] max-h-[200px]  min-w-[200px] min-h-[200px]
