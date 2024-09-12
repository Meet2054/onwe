import React, { useEffect, useRef, useState } from "react";
import PostAvatar from "./PostAvatar";
import { Button } from "../ui/button";
import axios from "axios";
import { useAuth, useUser } from "@clerk/nextjs";
import { getData } from "@/lib/utils";
import { Comment } from "@/types/type";
import { formatDistanceToNowStrict, parseISO } from "date-fns";
import { Link } from "next-view-transitions";

const SingleComment = ({ data }: { data: Comment }) => {
  const [replyInputOpen, setReplyInputOpen] = useState(false);
  const [reply, setReply] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [replies, setReplies] = useState<Comment[]>([]);
  const [showReplies, setShowReplies] = useState(false);
  const [repliesHeight, setRepliesHeight] = useState(0);
  const { user } = useUser();

  const repliesRef = useRef<HTMLDivElement>(null);
  const { getToken } = useAuth();
  const [timeAgo, setTimeAgo] = useState("");

  const handleReplyClick = () => {
    setReplyInputOpen(!replyInputOpen);
  };

  useEffect(() => {
    const time = data.createdAt;
    if (time) {
      const date = new Date(parseISO(time));
      const timeago = formatDistanceToNowStrict(date, { addSuffix: true });
      setTimeAgo(timeago);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setReply("");
    e.preventDefault();
    if (!reply) return;
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/comments`,
        {
          postId: data.postId,
          userId: data.userId,
          content: reply,
          parentId: data.id,
        },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
            "Content-Type": "application/json",
            Accept: "*/*",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );
      const newUser = {
        username: user?.username,
        avatar: user?.imageUrl,
      };
      res.data.user = newUser;

      setReplies((prev) => (prev ? [...prev, res.data] : [res.data]));
      setReply("");
      setShowReplies(true);
      setReplyInputOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const showReply = async () => {
    const response = await getData(
      "/subcomments",
      {
        postId: data.postId,
        parentId: data.id,
      },
      "POST"
    );

    setReplies(response);
  };

  useEffect(() => {
    showReply();
  }, []);

  useEffect(() => {
    if (replyInputOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [replyInputOpen]);

  useEffect(() => {
    if (repliesRef.current) {
      setRepliesHeight(repliesRef.current.scrollHeight);
    }
  }, [replies]);

  return (
    <div className="relative flex gap-1 overflow-hidden ">
      {showReplies && (
        <div className="absolute text-xl top-0 left-3 bottom-2   border-l w-10   border-rose-400 rounded-full" />
      )}
      <div>
        <PostAvatar size={7} imageUrl={data.user.avatar} />
      </div>
      <div>
        <div className="break-all">
          <Link
            href={`/profile/${data.user.username}`}
            className="p-2 font-semibold hover:underline"
          >
            {data.user.username}
          </Link>
          <span>{data.content}</span>
        </div>
        <div>
          <span className="text-sm">{timeAgo}</span>
          <Button variant="ghost" onClick={handleReplyClick}>
            reply
          </Button>
          <form onSubmit={handleSubmit}>
            {replyInputOpen && (
              <div className="flex">
                <input
                  ref={inputRef}
                  onChange={(e) => setReply(e.target.value)}
                  value={reply}
                  className="bg-white border-b outline-none"
                />
                <Button type="submit" className="px-3 py-0" variant="ghost">
                  send
                </Button>
              </div>
            )}
          </form>
          <div
            ref={repliesRef}
            className={`overflow-y-auto transition-all duration-500 ease-in-out   ${
              showReplies ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
            }`}
            // style={{ maxHeight: showReplies ? repliesHeight : 0 }}
          >
            {replies &&
              replies.map((reply) => (
                <SingleComment key={reply.id} data={reply} />
              ))}
          </div>
          {replies && replies.length > 0 && (
            <div
              onClick={() => setShowReplies((prev) => !prev)}
              className="p-0 w-max hover:underline text-sm text-gray-500 cursor-pointer"
            >
              <span>
                {showReplies ? (
                  "hide replies"
                ) : (
                  <span>
                    show <span className="text-red-600">{replies.length}</span>{" "}
                    replies
                  </span>
                )}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleComment;

// import React, { useEffect, useRef, useState } from "react";
// import PostAvatar from "./PostAvatar";
// import { Button } from "../ui/button";
// import axios from "axios";
// import { useAuth } from "@clerk/nextjs";
// import { getData } from "@/lib/utils";
// import { Comment } from "@/types/type";
// import { formatDistanceToNowStrict, parseISO } from "date-fns";
// import { Link } from "next-view-transitions";

// const SingleComment = ({ data }: { data: Comment }) => {
//   const [replyInputOpen, setReplyInputOpen] = useState(false);
//   const [reply, setReply] = useState("");
//   const inputRef = useRef<HTMLInputElement>(null);
//   const [replies, setReplies] = useState<Comment[]>([]);
//   const [showReplies, setShowReplies] = useState(false);

//   const [timeAgo, setTimeAgo] = useState("");
//   const { getToken } = useAuth();

//   const handleReplyClick = () => {
//     setReplyInputOpen(!replyInputOpen);
//   };

//   useEffect(() => {
//     const time = data.createdAt;
//     if (time) {
//       const date = new Date(parseISO(time));
//       const timeago = formatDistanceToNowStrict(date, { addSuffix: true });
//       setTimeAgo(timeago);
//     }
//   }, []);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!reply) return;
//     try {
//       const res = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_URL}/comments`,
//         {
//           postId: data.postId,
//           userId: data.userId,
//           content: reply,
//           parentId: data.id,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${await getToken()}`,
//             "Content-Type": "application/json",
//             Accept: "*/*",
//             "ngrok-skip-browser-warning": "69420",
//           },
//         }
//       );
//       setReply("");
//       console.log(res);
//       // setReplies((prev) => [...prev, res.data]);
//       setShowReplies(true);
//       setReplyInputOpen(false);
//       // console.log(res);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const showReply = async () => {
//     const response = await getData(
//       "/subcomments",
//       {
//         postId: data.postId,
//         parentId: data.id,
//       },
//       "POST"
//     );

//     setReplies(response);
//   };

//   useEffect(() => {
//     console.log("data", data);
//     showReply();
//   }, []);
//   useEffect(() => {
//     // console.log("data", data);

//     if (replyInputOpen && inputRef.current) {
//       inputRef.current.focus();
//     }
//   }, [replyInputOpen]);

//   return (
//     <div className="relative flex gap-1 overflow-hidden ">
//       {showReplies && (
//         <div className="absolute text-xl top-6 left-3 bottom-1 border-l-2 border-gray-400  rounded-full" />
//       )}
//       <div>
//         <PostAvatar size={7} imageUrl={data.user.avatar} />
//       </div>
//       <div>
//         <div className="break-all">
//           <Link
//             href={`/profile/${data.user.username}`}
//             className="p-2 font-semibold hover:underline"
//           >
//             {data.user.username}
//           </Link>
//           <span>{data.content}</span>
//         </div>
//         <div>
//           <span className="text-sm">{timeAgo}</span>
//           <Button variant="ghost" onClick={handleReplyClick}>
//             reply
//           </Button>
//           {/* <Button onClick={showReply} variant="link" cla>
//             hide replies
//           </Button> */}

//           {replies &&
//             showReplies &&
//             replies.map((reply) => (
//               <SingleComment key={reply.id} data={reply} />
//             ))}
//           <form onSubmit={handleSubmit}>
//             {replyInputOpen && (
//               <div className="flex ">
//                 <input
//                   ref={inputRef}
//                   onChange={(e) => setReply(e.target.value)}
//                   value={reply}
//                   className="bg-white border-b outline-none"
//                 />

//                 <Button type="submit" className="px-3 py-0" variant="ghost">
//                   send
//                 </Button>
//               </div>
//             )}
//           </form>
//         </div>
//         {replies.length > 0 && (
//           <div>
//             {showReplies ? (
//               <div
//                 onClick={() => setShowReplies((prev) => !prev)}
//                 // variant="link"
//                 className="p-0  w-max hover:underline text-sm text-gray-500 "
//               >
//                 <span className="">hide replies</span>
//               </div>
//             ) : (
//               <div
//                 onClick={() => setShowReplies((prev) => !prev)}
//                 className="p-0 w-max  "
//               >
//                 <span className="text-gray-500 text-sm hover:underline ">
//                   show <span className="text-red-700">{replies.length}</span>{" "}
//                   replies
//                 </span>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SingleComment;
