"use client";
// import { AnimatedLinks } from "@/components/AnimatedLinks";
import Top from "@/components/explore/Top";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full flex flex-col h-full">
      <div className="sticky top-0">
        <Top />
      </div>
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
};

export default Layout;
