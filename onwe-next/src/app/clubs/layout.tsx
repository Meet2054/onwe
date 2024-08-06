// // import ClubChatAnnouncement from "@/components/ClubChatAnnouncement";
// import ClubSideBar from "@/components/SideBar/ClubSideBar";
// import { Info } from "lucide-react";
// import { Menu } from "lucide-react";

// const Layout = ({ children }: { children: React.ReactNode }) => {
//   return (
//     <div className="flex h-full w-full relative ">
//       <div className="h-full w-1/4 overflow-y-auto bg-red-300 fixed hidden sm:block">
//         <ClubSideBar />
//       </div>
//       <div className="h-full sm:w-3/4 w-full sticky left-3/4 bg-gray-600">{children}</div>
//     </div>
//   );
// };

// export default Layout;
"use client"
import ClubSideBar from "@/components/SideBar/ClubSideBar";
import { useState } from "react";
import { Menu } from "lucide-react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-full w-full relative">
      <div
        className={`h-full w-3/4 sm:w-1/4 overflow-y-auto bg-red-300 fixed transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
      >
        <ClubSideBar closeSidebar={() => setSidebarOpen(false)} />
      </div>
      <div className="h-full w-full sm:w-3/4 sm:ml-[25%] bg-gray-600">
        <div className="sm:hidden">
          <button
            className="absolute top-4 left-4 z-50 p-2 bg-gray-700 text-white rounded-full"
            onClick={() => setSidebarOpen(!isSidebarOpen)}
          >
            <Menu />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Layout;

