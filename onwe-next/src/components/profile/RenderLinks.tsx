import React, { useEffect } from "react";
import { Github, Instagram, Linkedin, Twitter, Globe } from "lucide-react";
import Link from "next/link";

const RenderLinks = ({ link }: { link: string }) => {
  const newLink = `https://${link}`;

  if (newLink.includes("github")) {
    return (
      <Link href={newLink} target="_blank">
        <Github
          size={24}
          className="hover:scale-125 transition-all ease-in-out duration-200 cursor-pointer"
        />
      </Link>
    );
  }
  if (newLink.includes("instagram")) {
    return (
      <Link href={newLink} rel="noopener noreferrer" target="_blank">
        <Instagram
          size={24}
          className="hover:scale-125 transition-all ease-in-out duration-200 cursor-pointer"
        />
      </Link>
    );
  }
  if (newLink.includes("newLinkedin")) {
    return (
      <Link href={newLink} rel="noopener noreferrer" target="_blank">
        <Linkedin
          size={24}
          className="hover:scale-125 transition-all ease-in-out duration-200 cursor-pointer"
        />
      </Link>
    );
  }
  if (newLink.includes("twitter")) {
    return (
      <Link href={newLink} rel="noopener noreferrer" target="_blank">
        <Twitter
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
