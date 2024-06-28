import PostAvatar from "@/components/post_component/PostAvatar";
import { Button } from "@/components/ui/button";
import React from "react";

const EditLeftFrom = () => {
  return (
    <div>
      <div className="text-3xl font-bold">Edit Profile</div>
      <div className="text-base">
        Keep your personal details private. Information you add here is visible
        to anyone who can view your profile.
      </div>

      <div className="mt-11 text-center">photo</div>
      <div className="flex justify-center mt-5">
        <PostAvatar className="border border-[16px]" size={52} />
      </div>
      <div className="flex justify-center mt-5 gap-3">
        <Button variant="ghost" className="border rounded-full ">
          new
        </Button>
        <Button variant="ghost" className="text-red-500 border rounded-full">
          remove
        </Button>
      </div>
    </div>
  );
};

export default EditLeftFrom;
