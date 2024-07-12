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

import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

interface DialogBoxProps {
  imageUrl?: string;
}

const DialogBox: React.FC<DialogBoxProps> = ({ imageUrl }) => {
  const [imageWidth, setImageWidth] = useState<number | undefined>(undefined);
  const [imageHeight, setImageHeight] = useState<number | undefined>(undefined);
  const { post } = useSelector((state: RootState) => state.post);

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
        <DialogTrigger className="relative h-44 w-full">
          <Image
            src={`${base64Prefix}${imageUrl}`}
            alt="image"
            layout="fill"
            objectFit="cover"
            onLoad={handleImageLoad}
          />
        </DialogTrigger>
      ) : (
        <DialogTrigger>comment</DialogTrigger>
      )}
      <DialogTitle className="hidden">Are you absolutely sure?</DialogTitle>
      <DialogContent
        // style={{ height: imageHeight! * 3.5, width: imageWidth! * 3.5 }}
        className="flex max-w-[70dvw] max-h-[70dvh] bg-white  border-none sm:rounded-3xl p-1"
      >
        <div className="flex relative items-center w-full min-h-[70dvh] justify-center ">
          <DialogImage imageUrl={post.media[0]} />
        </div>
        <div className="p-3 rounded-3xl  overflow-y-auto">
          <DiaglogComment />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogBox;
