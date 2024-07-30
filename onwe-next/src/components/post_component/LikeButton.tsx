"use client";
import { setPost } from "@/lib/features/posts/postSlice";
import { RootState } from "@/lib/store";
import { getData } from "@/lib/utils";

import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { Heart, ThumbsUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const LikeButton = () => {
  const post = useSelector((state: RootState) => state.post.post);
  const [isClicked, setIsClicked] = useState(post?.liked || false);
  const [likeCount, setLikeCount] = useState(post?.likes || 0);
  const { getToken } = useAuth();
  const { timeline } = useSelector((state: RootState) => state.timeline);
  const dispatch = useDispatch();

  const handleLike = async () => {
    // console.log(post);
    // const res = await getData(`/posts/${post.id}`, {}, "GET");
    // console.log(res);

    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/posts/like`,
      { postId: post.id },
      {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
          "Content-Type": "application/json",
          Accept: "*/*",
          "ngrok-skip-browser-warning": "69420",
        },
      }
    );

    let newTimeline = timeline?.map((pst) => {
      if(pst.id==post.id){
        
      }
    });

    // const newPost = {
    //   ...post,
    //   likes: isClicked ? post.likes - 1 : post.likes + 1,
    //   liked: !isClicked,
    // };
    // dispatch(setPost(newPost));
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await getData(`/posts/${post.id}`, {}, "GET");
      const data = res[0];
      // dispatch(setPost(data));
      setIsClicked(data?.liked);
      setLikeCount(data?.likes);
    };
    fetchData();
  }, []);

  return (
    <div className="flex justify-center items-center gap-2">
      <div
        className={`w-8 h-8 rounded-2xl border border-gray-400 justify-center items-center gap-2.5 inline-flex cursor-pointer`}
      >
        <div
          className="flex justify-center"
          onClick={() => {
            setLikeCount((prev) => (isClicked ? prev - 1 : prev + 1));
            setIsClicked(!isClicked);
            handleLike();
          }}
        >
          <Heart
            strokeWidth={1.4}
            stroke="black"
            fillOpacity={0.5}
            fill={isClicked ? "red" : "white"}
            className={`w-6 h-5 relative flex-col justify-start items-start  inline-flex`}
          />
        </div>
      </div>
      {likeCount}
    </div>
  );
};

export default LikeButton;
