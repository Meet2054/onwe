import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import CreatePost from "./CreatePost";
import { PostsProps } from "@/types/type";
import DialogBox from "../post_component/Dialog_component/DialogBox";
import { useDispatch } from "react-redux";
import { setPost } from "@/lib/features/posts/postSlice";

const Announcement = ({ posts, club }: { posts: PostsProps[], club: string, isAdmin: boolean }) => {
  const { getToken } = useAuth();
  const [createActive, setCreateActive] = useState(false);
  const [isAdmin, setisAdmin] = useState(false);

  // useEffect(() => {
  //   const fetchPermission = async () => {
  //     try {
  //       const token = await getToken();
  //       const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/myclubs/${club}`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "ngrok-skip-browser-warning": "69420",
  //         },
  //       });
  //       setisAdmin(response.data);
  //     } catch (err) {
  //       console.error("Failed to fetch permission:", err);
  //     }
  //   };

  //   fetchPermission();
  // }, [club, getToken]);

  const dispatch = useDispatch()
  const handleClick = (post:PostsProps)=>{
    dispatch(setPost(post))
  }

  const handleCreateClick = () => {
    setCreateActive(true);
  };

  const handleCloseClick = () => {
    setCreateActive(false);
  };

  return (
    <div className="relative">
      {posts.map((post) => (
        <div 
        onClick={()=>handleClick(post)}
        key={post.id} className="relative size-96">
          {/* <h2>{post.id}</h2> */}
          <DialogBox imageUrl={post.media[0]}/>
          {/* <p>{post.content}</p> */}
        </div>
      ))}
      {isAdmin && (
        <button
          className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleCreateClick}
        >
          Create
        </button>
      )}
      {createActive && <CreatePost category="announcement" clubName={club} onClose={handleCloseClick} />}
    </div>
  );
};

export default Announcement;
