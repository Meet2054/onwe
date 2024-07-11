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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

interface DialogBoxProps {
  imageUrl?: string;
}

const DialogBox: React.FC<DialogBoxProps> = ({ imageUrl }) => {
  const [imageWidth, setImageWidth] = useState<number | undefined>(undefined);
  const [imageHeight, setImageHeight] = useState<number | undefined>(undefined);
  const post = useSelector((state: RootState) => state.post);

  useEffect(() => {
    console.log(post);
  }, [post]);

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
        className="flex max-w-[70dvw] max-h-[70dvh] bg-white  border-none sm:rounded-3xl p-1"
      >
        <div className="flex relative items-center w-full justify-center ">
          {/* <Carousel className="w-full h-full">
            <CarouselContent className="w-full h-full bg-red-300 ">
              <CarouselItem className="w-[100%] h-[100%]">
                <DialogImage imageUrl={imageUrl} />
              </CarouselItem>
            </CarouselContent>
            <CarouselNext />
            <CarouselPrevious />
          </Carousel> */}
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
