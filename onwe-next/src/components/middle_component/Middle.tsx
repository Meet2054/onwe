import React from "react";
import MiddleNavbar from "./MiddleNavbar";
import { AnimatedLinks } from "../AnimatedLinks";

const Middle = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-[900px] border border-gray-200 rounded p-3 mt-7 ">
      <MiddleNavbar />
      <AnimatedLinks />
      {children}
    </div>
  );
};

export default Middle;
