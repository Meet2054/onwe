"use client";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";

import DiaglogComment from "./DiaglogComment";

import { checkVidImg, cn } from "@/lib/utils";
import { PostsProps } from "@/types/type";
import { MessageSquare } from "lucide-react";
import PostImage from "../PostImage";

interface DialogBoxProps {
  imageUrl?: string;
  description?: string;
  post: PostsProps;
  className?: string;
  open?: boolean;
}

const DialogBox: React.FC<DialogBoxProps> = ({
  imageUrl,
  description,
  post,
  className,
  open,
}) => {
  if (open) {
    <Dialog open={true} defaultOpen={true}>
      {imageUrl ? (
        <DialogTrigger className={cn("relative w-full h-full", className)}>
          {checkVidImg(imageUrl) === 0 ? (
            <Image
              src={imageUrl}
              alt="image"
              layout="fill"
              objectFit="cover"
              className="rounded-lg object-scale-down"
              loading="lazy"
              unoptimized={true}
              blurDataURL={imageUrl}
            />
          ) : (
            <video
              src={imageUrl}
              muted
              autoPlay
              loop
              className="object-cover w-full h-full"
            />
          )}
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
        className={`  gap-0   sm:flex-row justify-center items-center border-none
                      bg-white sm:p-0 rounded-none ${
                        post?.media?.length > 0
                          ? "sm:min-w-[70vw] grid grid-cols-5 h-[95vh]"
                          : "w-full"
                      }`}
      >
        {post && post.media && (
          <div className="col-span-3">
            <PostImage
              images={post?.media}
              fill="contain"
              className="flex flex-grow h-[95vh] relative bg-black"
            />
          </div>
        )}

        <div
          className={`col-span-2 bg-white overflow-y-auto ${
            post?.media?.length > 0 ? "min-w-96 h-[95vh]" : "h-[75vh] w-[25vw] "
          } `}
        >
          <DiaglogComment post={post} />
        </div>
      </DialogContent>
    </Dialog>;
  }

  return (
    <Dialog>
      {imageUrl ? (
        <DialogTrigger className={cn("relative w-full h-full", className)}>
          {checkVidImg(imageUrl) === 0 ? (
            <Image
              src={imageUrl}
              alt="image"
              layout="fill"
              objectFit="cover"
              className="rounded-lg object-scale-down"
              loading="lazy"
              unoptimized={true}
              blurDataURL={imageUrl}
            />
          ) : (
            <video
              src={imageUrl}
              muted
              autoPlay
              loop
              className="object-cover w-full h-full"
            />
          )}
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
        className={`  gap-0   sm:flex-row justify-center items-center border-none
                      bg-white sm:p-0 rounded-none ${
                        post?.media?.length > 0
                          ? "sm:min-w-[70vw] grid grid-cols-5 h-[95vh]"
                          : "w-full"
                      }`}
      >
        {post && post.media && (
          <div className="col-span-3">
            <PostImage
              images={post?.media}
              fill="contain"
              className="flex flex-grow h-[95vh] relative bg-black"
            />
          </div>
        )}

        <div
          className={`col-span-2 bg-white overflow-y-auto ${
            post?.media?.length > 0 ? "min-w-96 h-[95vh]" : "h-[75vh] w-[25vw] "
          } `}
        >
          <DiaglogComment post={post} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogBox;
