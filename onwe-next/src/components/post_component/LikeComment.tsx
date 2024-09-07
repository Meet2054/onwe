// import React from "react";
// import DialogBox from "./Dialog_component/DialogBox";
// import LikeButton from "./LikeButton";
// import CopyButton from "./CopyButton";
// import { PostsProps } from "@/types/type";

// const LikeComment = ({ post }: { post: PostsProps }) => {
//   return (
//     <div className="w-full pt-2 pb-1 pl-0 flex justify-start items-start gap-5 relative   ">
//       <LikeButton post={post} />
//       <div>
//         <DialogBox post={post} />
//       </div>
//       <CopyButton />
//     </div>
//   );
// };

// export default LikeComment;


import React, { useState } from "react";
import DialogBox from "./Dialog_component/DialogBox";
import LikeButton from "./LikeButton";
import CopyButton from "./CopyButton";
import ShareModal from "./ShareModal";
import { PostsProps } from "@/types/type";

const LikeComment = ({ post }: { post: PostsProps }) => {
  const [share, setShare] = useState<boolean>(false);

  const handleOnClickShare = () => {
    setShare(!share);
    setTimeout(() => {
      setShare(false)
    }, 5000);
  };

  return (
    <div className="relative flex items-center">
      {/* Content wrapper */}
      <div className="w-full h-[34px]  pl-0 flex justify-start items-start gap-5 relative">
        <LikeButton post={post} />
          <div>
            <DialogBox post={post} />
          </div>
        <button onClick={handleOnClickShare} className="relative">
          <CopyButton />
        </button>
        <div>
          {share && <ShareModal onClose={() => setShare(false)} />}
        </div>
      </div>
      
 
    </div>
  );
};

export default LikeComment;
