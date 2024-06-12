import React from "react";
import MiddleNavbar from "./MiddleNavbar";
import { AnimatedLinks } from "../AnimatedLinks";

const Middle = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mt-3">
      <AnimatedLinks />
      {/* <MiddleNavbar />   */}
      <div className="w-[900px] border h-full  border-gray-300 rounded p-3 mt-7">
        {children}
      </div>
    </div>
  );
};

export default Middle;
