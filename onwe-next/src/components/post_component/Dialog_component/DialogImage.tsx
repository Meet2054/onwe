import Image from "next/image";
import React, { FC } from "react";

import img from "@/../public/img.svg";

interface DialogImageProps {
  imageUrl?: string;
}

const DialogImage: FC<DialogImageProps> = ({ imageUrl }) => {
  const base64Prefix = "data:image/png;base64,";

  return (
    <div className="relative w-full h-full p-0">
      <Image
        src={`${base64Prefix}${imageUrl}` || img}
        // src={imageUrl || img}
        layout="fill"
        alt="image"
        objectFit="contain"
        className=" p-0 absolute rounded-s-[2rem]"
      />
    </div>
  );
};

export default DialogImage;
