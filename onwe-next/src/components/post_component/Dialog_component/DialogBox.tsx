import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "../../ui/dialog";

import DiaglogComment from "./DiaglogComment";

import DialogImage from "./DialogImage";

interface DialogBoxProps {
  imageUrl?: string;
}

const DialogBox: React.FC<DialogBoxProps> = ({ imageUrl }) => {
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
          <Image src={imageUrl} alt="image" layout="fill" objectFit="contain" />
        </DialogTrigger>
      ) : (
        <DialogTrigger>comment</DialogTrigger>
      )}
      <DialogContent className="flex w-[71vw] max-w-none h-[70vh] max-h-none bg-white border-none sm:rounded-3xl p-1">
        <div className="flex relative items-center w-full justify-center rounded-full">
          <DialogImage imageUrl={imageUrl} />
        </div>
        <div className="p-3 w-1/2 rounded-3xl">
          <DiaglogComment />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogBox;
