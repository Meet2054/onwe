"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import useSWR from "swr";
import { useDispatch } from "react-redux";
import { setPost } from "@/lib/features/posts/postSlice";
import DialogBox from "@/components/post_component/Dialog_component/DialogBox";

interface Post {
  id: string;
  media: string[];
}

const Page = () => {
  const path = usePathname();
  const [result, setResults] = useState<Post[]>();
  const query = path.split("/").pop();
  const dispatch = useDispatch();

  useSWR("/top-posts", {
    onSuccess: (data) => {
      setResults(data);
    },
  });

  const handleClick = (post: any) => {
    dispatch(setPost(post));
  };

  return (
    <div className="w-full h-screen sm:p-4 bg-white">
      <div className="px-5 flex flex-col">
        <div className="h-20 w-full flex justify-between">
          <div className="h-[70%] ml-[5%] p-2 mt-2">
            <p className="text-2xl">#together</p>
          </div>
          <div className="h-[60%]  mr-[5%] p-2 mt-2">
            <p>2504 Posts</p>
          </div>
        </div>
        <div className="gap-1 grid grid-cols-3 sm:grid-cols-4">
          {result?.map((post) => (
            <div
              onClick={() => handleClick(post)}
              key={post.id}
              className="h-80"
            >
              <DialogBox className={""} imageUrl={post.media[0]} post={post} />
            </div>
            // <Post key={inex} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
