import { PostsProps } from "@/types/type";
import React from "react";

const ProfilePost = ({ posts }: { posts: PostsProps[] }) => {
  return (
    <div className="border bg-neutral-500 flex grid grid-cols-3 border gap-1 mt-10 h-max">
      <div className="max-w-[250px] max-h-[250px]  min-w-[250px] min-h-[250px]   bg-red-400 rounded-xl  ">
        d
      </div>
      <div className="max-w-[250px] max-h-[250px]  min-w-[250px] min-h-[250px]  bg-red-400 rounded-xl  ">
        d
      </div>
      <div className="max-w-[250px] max-h-[250px]  min-w-[250px] min-h-[250px]  bg-red-400 rounded-xl  ">
        d
      </div>
      <div className="max-w-[250px] max-h-[250px]  min-w-[250px] min-h-[250px]  bg-red-400 rounded-xl  ">
        d
      </div>
      <div className="max-w-[250px] max-h-[250px]  min-w-[250px] min-h-[250px]  bg-red-400 rounded-xl  ">
        d
      </div>
      <div className="max-w-[250px] max-h-[250px]  min-w-[250px] min-h-[250px]  bg-red-400 rounded-xl  ">
        d
      </div>
      <div className="max-w-[250px] max-h-[250px]  min-w-[250px] min-h-[250px]  bg-red-400 rounded-xl  ">
        d
      </div>
      <div className="max-w-[250px] max-h-[250px]  min-w-[250px] min-h-[250px]  bg-red-400 rounded-xl  ">
        d
      </div>
      <div className="max-w-[250px] max-h-[250px]  min-w-[250px] min-h-[250px]  bg-red-400 rounded-xl  ">
        d
      </div>
      <div className="max-w-[250px] max-h-[250px]  min-w-[250px] min-h-[250px]  bg-red-400 rounded-xl  ">
        d
      </div>

      {/* {posts && posts.map((post) => <Posts key={post.id} post={post} />)} */}
    </div>
  );
};

export default ProfilePost;
