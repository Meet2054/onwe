"use client";
// import { AnimatedLinks } from "@/components/AnimatedLinks";
import Top from "@/components/explore/Top";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full flex flex-col">
      <div className="sticky">
        <Top />
      </div>
      <div className="">
        {children}
      </div>
    </div>
  );
};

export default Layout;
