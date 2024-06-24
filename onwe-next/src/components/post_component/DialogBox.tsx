import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import "./temp.css";
import img from "@/../public/img.svg";
import PostAvatar from "./PostAvatar";
import Comments from "./Comments";

const MyComponent = () => {
  const comments = [
    "loreum ipsum dolor sit amet",
    "consectetur adipisicing elit",
    "Quam temporibus",
    "dina sahoo sa ojom lihj",
  ];
  return (
    <Dialog>
      <DialogTrigger>comment</DialogTrigger>
      <DialogContent className="w-[70vw] max-w-none h-[70vh] max-h-none  bg-white border-none p-0">
        <div className="flex gap-2 h-full">
          <div className="w-1/2 flex items-center justify-center relative bg-white">
            <Image src={img} alt="Image" fill={true} />
          </div>
          <div className="w-1/2 flex flex-col justify-around">
            <div>
              <div className="w-full h-10 mt-4 flex space-x-2">
                <PostAvatar />
                <span>rituisboy</span>
              </div>
              <div className="bg-slate-300">
                {comments.map((comment, index) => (
                  <Comments key={index} comment={comment} />
                ))}
              </div>
            </div>
            <div className="bg-red-300">comment input</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MyComponent;
