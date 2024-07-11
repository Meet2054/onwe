import Image from "next/image";
import React, { FC } from "react";

import img from "@/../public/img.svg";

interface DialogImageProps {
  imageUrl?: string;
}

const DialogImage: FC<DialogImageProps> = ({ imageUrl }) => {
  const base64Prefix = 'data:image/png;base64,';

  return (
    <Image
    src={`${base64Prefix}${imageUrl}`}
      layout="fill"
      alt="image"
      objectFit="contain"
      className="rounded-3xl"
    />
  );
};

export default DialogImage;
