// MyComponent.jsx
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTrigger } from "../../ui/dialog";

import DiaglogComment from "./DiaglogComment";

import DialogImage from "./DialogImage";

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
      <DialogContent className="flex w-[71vw] max-w-none h-[70vh] max-h-none bg-white border-none sm:rounded-3xl p-1">
        <div className="flex relative items-center w-1/2 justify-center  rounded-3xl">
          <DialogImage />
        </div>
        <div className="p-3 w-1/2 rounded-3xl">
          <DiaglogComment />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MyComponent;
