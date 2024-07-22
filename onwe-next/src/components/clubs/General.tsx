import React, { useState } from "react";
import CreatePost from "@/components/clubs/CreatePost";
import DialogBox from "../post_component/Dialog_component/DialogBox";
import { PostsProps } from "@/types/type";
import { useDispatch } from "react-redux";
import { setPost } from "@/lib/features/posts/postSlice";

const General = ({ posts, club }: { posts: PostsProps[], club: string }) => {
  const [createActive, setCreateActive] = useState(false);
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

