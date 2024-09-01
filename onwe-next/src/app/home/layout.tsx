"use client";

// import { AnimatedLinks } from "@/components/AnimatedLinks";
import MiddleNavbar from "@/components/middle_component/MiddleNavbar";
import RightCom from "@/components/right_component/right_component";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full flex">
      <div className="lg:w-[60%] h-full overflow-x-hidden">
        <div className="sticky">
          <MiddleNavbar />
        </div>
        <div className="w-full flex items-center justify-center">
          {children}
        </div>
      </div>
      <div className="lg:w-[40%] hidden lg:block bg-white"><RightCom /></div>
    </div>
  );
};

export default Layout;
