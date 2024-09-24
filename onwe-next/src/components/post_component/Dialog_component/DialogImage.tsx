import Image from "next/image";
import React, { FC } from "react";

import img from "@/../public/img.svg";

interface DialogImageProps {
  imageUrl?: string;
}

const DialogImage: FC<DialogImageProps> = ({ imageUrl }) => {

  return (
    <div className="relative w-full h-full p-0 bg-black">
      <Image
        src={`${imageUrl}` || img}
        // src={imageUrl || img}
        layout="fill"
        alt="image"
        objectFit="contain"
        className=" p-0 absolute"
      />
    </div>
  );
};

export default DialogImage;
