"use client";

// import { AnimatedLinks } from "@/components/AnimatedLinks";
import MiddleNavbar from "@/components/middle_component/MiddleNavbar";
import RightSide from "./Rightside";
import CategoryTabs from "@/components/c/components/c/CategoryTabs";
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full flex">
      <div className="lg:w-[60%] h-full overflow-x-hidden">
        <div className="sticky">
          <MiddleNavbar/>
        </div>
        <div className="w-full bg-white flex items-center justify-start">
          {children}
        </div>
      </div>
      <div className="lg:w-[40%] hidden lg:block bg-white">
        <RightSide />
      </div>
    </div>
  );
};

export default Layout;
