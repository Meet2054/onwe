import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

const PostAvatar = ({
  size = 9,
  className,
  imageUrl,
}: {
  size?: number;
  className?: string;
  imageUrl?: string;
}) => {
  const url = imageUrl || "https://github.com/shadcn.png";
  return (
    <Avatar
      className={className}
      style={{ width: `${size * 4}px`, height: `${size * 4}px` }}
    >
      <AvatarImage src={url} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};

export default PostAvatar;
