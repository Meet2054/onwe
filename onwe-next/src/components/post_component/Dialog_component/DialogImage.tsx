import Image from "next/image";
import React, { FC } from "react";

import img from "@/../public/img.svg";

interface DialogImageProps {
  imageUrl?: string;
}

const DialogImage: FC<DialogImageProps> = ({ imageUrl }) => {
  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 bg-cover bg-center filter blur-3xl z-0">
        <Image
          src={imageUrl || img}
          layout="fill"
          alt="image"
          objectFit="cover"
        />
      </div>
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        <Image
          src={imageUrl || img}
          layout="fill"
          alt="image"
          objectFit="contain"
          className="rounded-3xl"
        />
      </div>
    </div>
  );
};

export default DialogImage;
