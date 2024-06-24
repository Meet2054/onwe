import Image from "next/image";
import React from "react";

import img from "@/../public/img.svg";

const DialogImage = () => {
  return <Image src={img} layout="fill" alt="image" />;
};

export default DialogImage;
