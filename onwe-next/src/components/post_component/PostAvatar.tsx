import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

const PostAvatar = ({ size = 9 }: { size?: number }) => {
  return (
    <Avatar className={`flex w-${size} h-${size}`}>
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};

export default PostAvatar;
