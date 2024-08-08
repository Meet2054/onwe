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

interface DialogBoxProps {
  imageUrl?: string;
  description?: string;
  post: any;
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
    <Dialog>
      {imageUrl ? (
        <DialogTrigger className={cn("relative h-60 w-full", className)}>
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
          className={`${
            description
              ? "bg-[#b5e2fa] flex h-52 justify-center items-center rounded-3xl  w-full"
              : ""
          }`}
        >
          {description ? (
            <div className="text-xl">{description}</div>
          ) : (
            "comment"
          )}
        </DialogTrigger>
      )}
      <DialogTitle className="hidden">Are you absolutely sure?</DialogTitle>
      <DialogContent
        // style={{ height: imageHeight! * 3.5, width: imageWidth! * 3.5 }}
        className="flex  h-[80vh] w-[70vw] sm:min-w-[70vw] flex-col sm:flex-row justify-center items-center  border-none sm:rounded-3xl  bg-transparent sm:p-0"
      >
        <div className="hidden sm:flex w-[70%] h-full justify-center items-end p-0  relative bg-transparent ">
          <DialogImage imageUrl={post?.media[0]} />
        </div>
        <div className="p-3 flex-grow rounded-3xl sm:w-[30rem] w-[95vw] h-full  overflow-y-auto bg-white">
          <DiaglogComment />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogBox;
