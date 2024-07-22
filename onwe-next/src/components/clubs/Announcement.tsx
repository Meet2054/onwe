import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import CreatePost from "./CreatePost";

const Announcement = ({ posts, club }: { posts: any[], club: string }) => {
  const { getToken } = useAuth();
  const [canCreate, setCanCreate] = useState(false);
  const [createActive, setCreateActive] = useState(false);

  useEffect(() => {
    const fetchPermission = async () => {
      try {
        const token = await getToken();
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/${club}/can-create`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "69420",
          },
        });
        setCanCreate(response.data.canCreate);
      } catch (err) {
        console.error("Failed to fetch permission:", err);
      }
    };

    fetchPermission();
  }, [club, getToken]);

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
      {canCreate && (
        <button
          className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleCreateClick}
        >
          Create
        </button>
      )}
      {createActive && <CreatePost onClose={handleCloseClick} />}
    </div>
  );
};

export default Announcement;
