import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

const PostAvatar = ({ size = 9 }: { size?: number }) => {
  return (
    <Avatar style={{ width: `${size * 4}px`, height: `${size * 4}px` }}>
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};

export default PostAvatar;
