import { PostsProps } from "@/types/type";
import React from "react";
import Posts from "../post_component/Posts";

const ProfilePost = ({ posts }: { posts: PostsProps[] }) => {
  return (
    <div>
      {posts && posts.map((post) => <Posts key={post.id} post={post} />)}
    </div>
  );
};

export default ProfilePost;
