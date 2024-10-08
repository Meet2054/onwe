import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { base64Prefix } from "@/lib/utils";
import React from "react";

const PostAvatar = ({
  size = 10,
  className,
  imageUrl,
}: {
  size?: number;
  className?: string;
  imageUrl?: string | null | File;
}) => {
  let url = imageUrl;

  let publicUrl = "";

  if (imageUrl instanceof File) {
    url = URL.createObjectURL(imageUrl);
  } else if (imageUrl?.startsWith("https")) {
    publicUrl = imageUrl;
  }
  return (
    <Avatar
      className={className}
      style={{ width: `${size * 4}px`, height: `${size * 4}px` }}
    >
      {publicUrl ? (
        <AvatarImage src={publicUrl} />
      ) : (
        <AvatarImage src={`${base64Prefix}${url}`} />
      )}
      <AvatarFallback className="bg-zinc-200">OnwE</AvatarFallback>
    </Avatar>
  );
};

export default PostAvatar;
