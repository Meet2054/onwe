import React from "react";
import PostAvatar from "../post_component/PostAvatar";
import {
  Github,
  InstagramIcon,
  Linkedin,
  LucidePencilLine,
  Twitter,
} from "lucide-react";
import Link from "next/link";

const Profile = () => {
  return (
    <div className="w-[77%] h-[calc(100dvh-4rem)] mt-16 mx-auto p-4 flex flex-col items-center">
      <div className="flex justify-center items-center">
        <PostAvatar size={32} />
      </div>
      <div className="text-2xl font-bold text-center mt-8">Rituraj Thakur</div>
      <div className="text-green-500 text-center">@rituisboy</div>
      <div className="flex gap-x-4">
        <div className="my-3 p-1 px-5 rounded-full border border-gray-300">
          follower
        </div>
        <div className="my-3 p-1 px-5 rounded-full border border-gray-300">
          following
        </div>
        <div className="my-3 p-2 group hover:border hover:rounded-full transition-all duration-100">
          <Link href="/profile/edit">
            <LucidePencilLine
              size={16}
              className="group-hover:scale-125 transition-all duration-100 ease-in-out"
            />
          </Link>
        </div>
      </div>
      <div>
        <p className="whitespace-pre-wrap break-words">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur,
          quia aliquid optio in totam a. Ea omnis accusamus sed quae cumque
          iure, aliquid saepe eaque atque, veritatis incidunt tempora quod.
        </p>
      </div>
      <div className="flex justify-around gap-8 space mt-4 w-full px-16">
        <Twitter
          size={24}
          className="hover:scale-125 transition-all ease-in-out duration-200"
        />
        <InstagramIcon
          size={24}
          className="hover:scale-125 transition-all ease-in-out duration-200"
        />
        <Linkedin
          size={24}
          className="hover:scale-125 transition-all ease-in-out duration-200"
        />
        <Github
          size={24}
          className="hover:scale-125 transition-all ease-in-out duration-200"
        />
      </div>
    </div>
  );
};

export default Profile;
