"use client";
import { AnimatedLinks } from "@/components/AnimatedLinks";
import MiddleNavbar from "@/components/middle_component/MiddleNavbar";
import { Search } from "lucide-react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-full w-full bg-white">
      <div className="flex justify-center items-center top-0 p-3 bg-white z-10">
        <MiddleNavbar />
      </div>
      <div className="flex-1 overflow-y-auto  bg-base-color w-full scrollbar-hide">
        {children}
      </div>
    </div>
  );
};

export default Layout;
