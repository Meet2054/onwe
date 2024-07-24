import React, { useEffect, useState } from "react";
import CreatePost from "@/components/clubs/CreatePost";
import DialogBox from "../post_component/Dialog_component/DialogBox";
import { PostsProps } from "@/types/type";
import { useDispatch } from "react-redux";
import { setPost } from "@/lib/features/posts/postSlice";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";

// const General = ({ posts, club }: { posts: PostsProps[], club: string }) => {
  const General = ({club }: { club: string }) => {
  const [createActive, setCreateActive] = useState(false);
  const [posts,setPosts] = useState<PostsProps[]>([]);
  const dispatch = useDispatch()
  const {getToken} = useAuth();
  const handleClick = (post:PostsProps)=>{
    dispatch(setPost(post))
  }

  const handleCreateClick = () => {
    setCreateActive(true);
  };

  const handleCloseClick = () => {
    setCreateActive(false);
  };
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = await getToken();
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/clubs/${club}/general`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "69420",
          },
        });
        setPosts(response.data.posts);
      } catch (err: any) {
        console.log(err);
        setPosts([]);
      }
    };

    fetchPosts();
  }, [club,getToken]);

  return (
    <div className="relative flex gap-5 flex-col">
      {posts.map((post) => (
        <div 
        onClick={()=>handleClick(post)}
        key={post.id} className="relative size-96 rounded-full">
          {/* <h2>{post.id}</h2> */}
          <DialogBox imageUrl={post.media[0]}/>
          {/* <p>{post.content}</p> */}
        </div>
      ))}
      <button
        className="fixed bottom-4 right-4 bg-gray-500 text-white px-4 py-2 rounded-xl"
        onClick={handleCreateClick}
      >
        + New Post
      </button>
      {createActive && <CreatePost clubName={club} category={"general"}  onClose={handleCloseClick} />}
    </div>
  );
};

export default General;

