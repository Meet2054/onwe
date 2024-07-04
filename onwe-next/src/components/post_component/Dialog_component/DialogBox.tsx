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

interface DialogBoxProps {
  imageUrl?: string;
}

const DialogBox: React.FC<DialogBoxProps> = ({ imageUrl }) => {
  const [imageWidth, setImageWidth] = useState<number | undefined>(undefined);
  const [imageHeight, setImageHeight] = useState<number | undefined>(undefined);

  const handleImageLoad = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const target = event.target as HTMLImageElement;
    setImageWidth(target.width);
    setImageHeight(target.height);
  };

  const comments = [
    "loreum ipsum dolor sit amet",
    "consectetur adipisicing elit",
    "Quam temporibus",
    "dina sahoo sa ojom lihj",
  ];

  return (
    <Dialog>
      {imageUrl ? (
        <DialogTrigger className="relative h-44 w-full">
          <Image
            src={imageUrl}
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
        style={{ height: imageHeight! * 3.5, width: imageWidth! * 3.5 }}
        className="flex max-w-none max-h-none bg-white  border-none sm:rounded-3xl p-1"
      >
        <div className="flex relative items-center w-full justify-center ">
          <DialogImage imageUrl={imageUrl} />
        </div>
        <div className="p-3 rounded-3xl">
          <DiaglogComment />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogBox;
