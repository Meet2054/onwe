import React, { useEffect, useState } from "react";
import { PostsProps } from "@/types/type";
import { useDispatch } from "react-redux";
import { setPost } from "@/lib/features/posts/postSlice";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { useSession } from "@clerk/clerk-react";
import {NewPost} from "./NewPost";
import PostImage from "../post_component/PostImage";

// const General = ({ posts, club }: { posts: PostsProps[], club: string }) => {
const  General = ({ club }: { club: string }) => {
  const [createActive, setCreateActive] = useState(false);
  const [posts, setPosts] = useState<PostsProps[]>([]);
  const dispatch = useDispatch();
  const { getToken } = useAuth();
  const { session } = useSession();
  const handleClick = (post: PostsProps) => {
    dispatch(setPost(post));
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = await getToken();
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/clubs/${club}/general`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "69420",
            },
          }
        );
        setPosts(response.data.posts);
        console.log(posts)
        // console.log(session?.user.username);
      } catch (err: any) {
        console.log(err);
        setPosts([]);
      }
    };

    fetchPosts();
  }, [club, getToken,createActive]);

  return (
<div className="flex gap-20 flex-col bg-[#F1F3F5] grow min-h-full pt-24 pl-10 pr-10 pb-36">
<div className=" flex flex-col-reverse gap-3">
        {posts.map((post) => {
          let cnm = "";
          if (post.username === session?.user.username) {
            cnm = "flex-row-reverse";
          }

          return (
            <div key={post.id} className="w-full h-full">
              <div className={`${cnm} flex`}>
                <div
                  onClick={() => handleClick(post)}
                  key={post.id}
                  className="grow max-w-60 sm:max-w-96 max-h-full bg-white rounded-xl"
                >
                  <h1 className="font-semibold m-2 text-base">
                    {post.username}
                  </h1>
                  <div className="m-2 rounded-xl">
                    
                    <PostImage
            images={post?.media}
            className="w-96 relative h-96 mt-4 overflow-hidden  bg-black"
          />
                  </div>
                  <p className="m-2 mt-[-10px] font-medium text-base">
                    {post.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="fixed sm:bottom-4 bottom-16">
        <NewPost clubName={club} setDone={setCreateActive}/>
      </div>
      {/* <button
        className="fixed sm:bottom-4 bottom-16 sm:right-14 right-10 bg-black font px-4 py-3 rounded-xl text-white font-semibold shadow-lg"
        onClick={handleCreateClick}
      >
        + New Post
      </button>
      {createActive && (
        <CreatePost
          clubName={club}
          category={"general"}
          onClose={handleCloseClick}
        />
      )} */}
    </div>
  );
};

export default General;