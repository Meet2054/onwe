import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { base64Prefix } from "@/lib/utils";
import React from "react";

const PostAvatar = ({
  size = 9,
  className,
  imageUrl,
}: {
  size?: number;
  className?: string;
  imageUrl?: string | null | File;
}) => {
  let url = imageUrl;

  if (imageUrl instanceof File) {
    url = URL.createObjectURL(imageUrl);
  }
  return (
    <Avatar
      className={className}
      style={{ width: `${size * 4}px`, height: `${size * 4}px` }}
    >
      <AvatarImage src={`${base64Prefix}${url}`} />
      <AvatarFallback className="bg-red-300">CN</AvatarFallback>
    </Avatar>
  );
};

export default PostAvatar;
