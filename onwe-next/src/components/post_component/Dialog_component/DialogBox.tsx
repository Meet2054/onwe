"use client";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";

import DiaglogComment from "./DiaglogComment";

import DialogImage from "./DialogImage";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { PostsProps } from "@/types/type";
import { MessageSquare } from "lucide-react";
import PostImage from "../PostImage";

interface DialogBoxProps {
  imageUrl?: string;
  description?: string;
  post: PostsProps;
  className?: string;
}

const DialogBox: React.FC<DialogBoxProps> = ({
  imageUrl,
  description,
  post,
  className,
}) => {
  const [imageWidth, setImageWidth] = useState<number | undefined>(undefined);
  const [imageHeight, setImageHeight] = useState<number | undefined>(undefined);

  const handleImageLoad = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const target = event.target as HTMLImageElement;
    setImageWidth(target.width);
    setImageHeight(target.height);
  };

  const base64Prefix = "data:image/png;base64,";

  return (
    <Dialog >
      {imageUrl ? (
        <DialogTrigger className={cn("relative  w-full ", className)}>
          <Image
            src={`${base64Prefix}${imageUrl}`}
            alt="image"
            layout="fill"
            objectFit="cover"
            onLoad={handleImageLoad}
            className="rounded-lg object-scale-down"
          />
        </DialogTrigger>
      ) : (
        <DialogTrigger
          className={cn(
            "flex  justify-center items-center z-50 ",
            description ? "bg-[#b5e2fa]" : ""
          )}
        >
          {description ? (
            <div className="text-xl">{description}</div>
          ) : (
            <MessageSquare strokeWidth={1.4} size={24} />
          )}
        </DialogTrigger>
      )}
      <DialogTitle className="hidden">Are you absolutely sure?</DialogTitle>
      <DialogContent
        className={`flex  h-[95vh] min-w-[28rem]   flex-col sm:flex-row justify-center items-center  
                   border-none sm:rounded-3xl  bg-transparent sm:p-0 ${
                     post?.media?.length > 0 ? "sm:min-w-[70vw]" : ""
                   }`}
      >
        {post?.media?.length > 0 && (
          <div className="hidden sm:flex w-[70%] h-full justify-center items-end p-0 relative bg-transparent bg-red-100 ">
            <DialogImage imageUrl={post?.media[0]} />
          </div>
        )}

        <div className="p-3 flex-grow  rounded-3xl sm:w-[30rem]  h-full  overflow-y-auto bg-white">
          <DiaglogComment />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogBox;
