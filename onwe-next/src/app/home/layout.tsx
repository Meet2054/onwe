"use client";
import { AnimatedLinks } from "@/components/AnimatedLinks";
import MiddleNavbar from "@/components/middle_component/MiddleNavbar";
import { Search } from "lucide-react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-screen overflow-hidden flex flex-col">
      <div className="fixed top-0 w-full mt-[17px] bg-[#f1f3f5] px-5 py-2 z-10"> 
        <div className="flex">
          {/* <AnimatedLinks /> */}
          <MiddleNavbar />
          <div className="flex justify-left items-center fixed right-20 w-[347px]  border border-black rounded-full">
            <div className="ml-2 bg-transparent">
              <Search size={20} />
            </div>
            <input
              placeholder="search"
              type="search"
              className="bg-customGray w-full h-[34px] px-1 rounded-full focus:outline-none focus-visible:ring-0"
            />
          </div>
        </div>
        {/* <MiddleNavbar /> */}
      </div>
      <div className="flex-1 mt-[40px] overflow-y-auto">{children}</div>
    </div>
  );
};

export default Layout;
