import React, { useEffect, useState } from "react";
import CreatePost from "@/components/clubs/CreatePost";
import DialogBox from "../post_component/Dialog_component/DialogBox";
import { PostsProps } from "@/types/type";
import { useDispatch } from "react-redux";
import { setPost } from "@/lib/features/posts/postSlice";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { useSession } from "@clerk/clerk-react";

// const General = ({ posts, club }: { posts: PostsProps[], club: string }) => {
const General = ({ club }: { club: string }) => {
  const [createActive, setCreateActive] = useState(false);
  const [posts, setPosts] = useState<PostsProps[]>([]);
  const dispatch = useDispatch();
  const { getToken } = useAuth();
  const { session } = useSession();
  const handleClick = (post: PostsProps) => {
    dispatch(setPost(post));
  };

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
        console.log(session?.user.username);
      } catch (err: any) {
        console.log(err);
        setPosts([]);
      }
    };

    fetchPosts();
  }, [club, getToken]);

  return (
    <div className="flex gap-20 flex-col bg-[#F1F3F5] grow">
      <div className=" flex flex-col gap-3">
        {posts.map((post) => {
          let cnm = ""
          if(post.username === session?.user.username){
            cnm = "flex-row-reverse"
          }

          return (
            <div key={post.id} className="w-full h-full">
              <div className={`${cnm} flex`}>
                <div
                  onClick={() => handleClick(post)}
                  key={post.id}
                  className="grow max-w-96 max-h-72 bg-white rounded-xl"
                >
                  <h1 className="font-semibold m-2 text-base">
                    {post.username}
                  </h1>
                  <div className="m-2 border rounded-xl">
                    <DialogBox imageUrl={post.media[0]} post={post} />
                  </div>
                  <p className="m-2 font-medium text-base">
                    {post.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <button
        className="fixed bottom-4 right-4 bg-gray-500 text-white px-4 py-2 rounded-xl"
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
      )}
    </div>
  );
};

export default General;

{
  /* <div className="bg-red-100 flex flex-col">
    
<div className="w-full flex flex-row-reverse">
  <div className="size-56 bg-gray-300">
  {posts.map((post) => (
<div 
onClick={()=>handleClick(post)}
key={post.id} className="grow max-w-96 max-h-72 bg-white rounded-xl" >
  <h1 className="font-semibold m-2 text-base">{post.username}</h1>
  <div className="m-2 border rounded-xl">
  <DialogBox imageUrl={post.media[0]} post={post}/>
  </div>
  <p className="m-2 font-medium text-base">{post.description}</p>
</div>
))}
  </div>
</div> */
}
