import React, { useEffect } from "react";
import {
  Github,
  Instagram,
  Linkedin,
  Twitter,
  Globe,
  X,
  Youtube,
} from "lucide-react";
import Link from "next/link";

const RenderLinks = ({ link }: { link: string }) => {
  const newLink = `https://${link.toLowerCase()}`;

  if (newLink.includes("github.com")) {
    return (
      <Link href={newLink} target="_blank">
        <Github
          size={24}
          className="hover:scale-125 transition-all ease-in-out duration-200 cursor-pointer"
        />
      </Link>
    );
  }
  if (newLink.includes("instagram.com")) {
    return (
      <Link href={newLink} rel="noopener noreferrer" target="_blank">
        <Instagram
          size={24}
          className="hover:scale-125 transition-all ease-in-out duration-200 cursor-pointer"
        />
      </Link>
    );
  }
  if (newLink.includes("linkedin.com")) {
    return (
      <Link href={newLink} rel="noopener noreferrer" target="_blank">
        <Linkedin
          size={24}
          className="hover:scale-125 transition-all ease-in-out duration-200 cursor-pointer"
        />
      </Link>
    );
  }
  if (newLink.includes("twitter.com") || newLink.includes("x.com")) {
    return (
      <Link href={newLink} rel="noopener noreferrer" target="_blank">
        {/* <X
          size={24}
          className="hover:scale-125 transition-all ease-in-out duration-200 cursor-pointer"
        /> */}
        <XIcon />
      </Link>
    );
  }
  if (newLink.includes("youtube.com")) {
    return (
      <Link href={newLink} rel="noopener noreferrer" target="_blank">
        <Youtube
          size={24}
          className="hover:scale-125 transition-all ease-in-out duration-200 cursor-pointer"
        />
      </Link>
    );
  }
  return (
    <Link href={newLink} rel="noopener noreferrer" target="_blank">
      <Globe
        size={24}
        className="hover:scale-125 transition-all ease-in-out duration-200 cursor-pointer"
      />
    </Link>
  );
};

export default RenderLinks;

const XIcon = () => {
  return (
    <div className="flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        className="size-6  hover:scale-125 transition-all ease-in-out duration-200 cursor-pointer"
        // fill="currentColor"
      >
        <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
      </svg>
    </div>
  );
};
