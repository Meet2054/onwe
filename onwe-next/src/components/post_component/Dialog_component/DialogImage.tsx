import Image from "next/image";
import React, { FC } from "react";

import img from "@/../public/img.svg";

interface DialogImageProps {
  imageUrl?: string;
}

const DialogImage: FC<DialogImageProps> = ({ imageUrl }) => {
  return (
    <Image
      src={imageUrl || img}
      layout="fill"
      alt="image"
      objectFit="contain"
      className="rounded-3xl"
    />
  );
};

export default DialogImage;
