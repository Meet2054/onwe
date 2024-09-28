import React, { useEffect, useState } from "react";
import axios from "axios";
import CreatePost from "./CreatePost";
import { PostsProps } from "@/types/type";
import DialogBox from "../post_component/Dialog_component/DialogBox";
import { useDispatch } from "react-redux";
import { setPost } from "@/lib/features/posts/postSlice";
import { useSignIn } from "@/hooks/useSignIn";
import { NewPost } from "./NewPost";

// const Announcement = ({ posts, club }: { posts: PostsProps[], club: string, isAdmin: boolean }) => {
const Announcement = ({ club }: { club: string }) => {
  const { getToken } = useSignIn();
  const [createActive, setCreateActive] = useState(false);
  const [isAdmin, setisAdmin] = useState(false);
  const [posts, setPosts] = useState<PostsProps[]>([]);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token =getToken();
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/clubs/${club}/announcement`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "69420",
            },
          }
        );
        setPosts(response.data.posts);
        setisAdmin(response.data.isAdmin);
        console.log(isAdmin,"raaaa");
        
      } catch (err: any) {
        console.log(err);
        setPosts([]);
      }
    };

    fetchData();
  }, [club]);

  const dispatch = useDispatch();
  const handleClick = (post: PostsProps) => {
    dispatch(setPost(post));
  };

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
          onClick={() => handleClick(post)}
          key={post.id}
          className="relative size-96"
        >
          {/* <h2>{post.id}</h2> */}
          <DialogBox imageUrl={post.media[0]} post={post} />
          {/* <p>{post.content}</p> */}
        </div>
      ))}
      {isAdmin && (
        <div className="fixed sm:bottom-0 bottom-16 bg-white pb-4">
        <div className="bg-white">
          <NewPost tab="announcement" clubName={club} setDone={setCreateActive} />
        </div>
      </div>
      )}
      {/* {createActive && (
        <CreatePost
          category="announcement"
          clubName={club}
          onClose={handleCloseClick}
        />
      )} */}
      {/* need to keep check if isAdmin is true or not */}
      
    </div>
  );
};

export default Announcement;
