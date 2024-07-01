"use client";
// import { AnimatedLinks } from "@/components/AnimatedLinks";
import Top from "@/components/explore/Top";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full flex">
      <div>
        <Top />
      </div>
      <div>
        {children}
      </div>
    </div>
  );
};

export default Layout;
