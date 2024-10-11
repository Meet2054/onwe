"use client";

// import { AnimatedLinks } from "@/components/AnimatedLinks";
import MiddleNavbar from "@/components/middle_component/MiddleNavbar";
import RightSide from "./Rightside";
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full flex justify-between">
      <div className="lg:w-[60%] h-full overflow-y-hidden">
        <div className="sticky">
          <MiddleNavbar/>
        </div>
        <div className="w-full h-screen bg-white flex items-center justify-start overflow-y-hidden">
          {children}
        </div>
      </div>
      <div className="lg:w-[40%] hidden lg:block bg-white overflow-y-auto ">
        <RightSide />
      </div>
    </div>
  );
};

export default Layout;
