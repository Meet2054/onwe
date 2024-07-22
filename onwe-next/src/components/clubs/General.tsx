import React, { useState } from "react";
import CreatePost from "@/components/clubs/CreatePost";

const General = ({ posts, club }: { posts: any[], club: string }) => {
  const [createActive, setCreateActive] = useState(false);

  const handleCreateClick = () => {
    setCreateActive(true);
  };

  const handleCloseClick = () => {
    setCreateActive(false);
  };

  return (
    <div className="relative posts">
      {posts.map((post) => (
        <div key={post.id} className="post">
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
      <button
        className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleCreateClick}
      >
        Create
      </button>
      {createActive && <CreatePost onClose={handleCloseClick} />}
    </div>
  );
};

export default General;

