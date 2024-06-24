"use client";
import { AnimatedLinks } from "@/components/AnimatedLinks";
import MiddleNavbar from "@/components/middle_component/MiddleNavbar";
import { Search } from "lucide-react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full flex">
      <div className="w-[60%] h-full">
        <div className="sticky">
          <MiddleNavbar />
        </div>
        <div className="h-full w-full flex items-center justify-center">
          {children}
        </div>
      </div>
      <div className="w-[40%]"></div>
    </div>
  );
};

export default Layout;
