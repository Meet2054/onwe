"use client";

import DialogBox from "@/components/post_component/Dialog_component/DialogBox";
import { PostsProps } from "@/types/type";
import { setPost as setReduxPost } from "@/lib/features/posts/postSlice";

import { useParams } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";
import { useDispatch } from "react-redux";
import Posts from "@/components/post_component/Posts";
import { LoaderCircle } from "lucide-react";

const Page = () => {
  const postid = useParams().id;
  const dispatch = useDispatch();
  const [post, setPost] = useState<PostsProps | null>(null);
  const { data, error, isLoading } = useSWR(`/posts/${postid}`, {
    onSuccess: (data) => {
      setPost(data);
      dispatch(setReduxPost(data));
    },
  });

  if (isLoading)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <LoaderCircle size={30} className="animate-spin" />
      </div>
    );

  return (
    <div className="w-full h-screen flex justify-center items-center">
      {post ? (
        <div className="w-1/2 shadow-lg rounded-md">
          {/* <DialogBox
            post={post}
            imageUrl={post.media[0]}
            description={post.description}
          /> */}
          <Posts post={post} />
        </div>
      ) : (
        "No post found"
      )}
    </div>
  );
};

export default Page;
