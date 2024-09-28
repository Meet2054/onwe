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
    <div className="grid grid-cols-4 h-full">
        <div className={`col-span-3 sm:col-span-1 h-full overflow-y-auto fixed sm:relative transition-transform duration-300 z-20 sm:z-0 bg-white  ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } sm:translate-x-0`}>
            <ClubSideBar closeSidebar={() => setSidebarOpen(false)} />
        </div>
        <div className="col-span-4 sm:col-span-3 h-full overflow-hidden">
            <div className="sm:hidden fixed top-2 left-1 h-[7.9vh] py-1 px-2 z-50">
                <button onClick={()=>setSidebarOpen(!isSidebarOpen)} className="p-2 bg-gray-700 text-white rounded-full">
                  <Menu className=""/>
                </button>
            </div>
            <div className="h-full w-full overflow-auto">
               <div className="w-full">
               {children}
               </div>
            </div>
        </div>
    </div>
  );
};

export default Layout;

// return (
//   <div className="flex h-full w-full relative ">
//     <div
//       className={`h-full w-3/4 sm:w-1/4 overflow-y-auto bg-white fixed transition-transform duration-300 z-20 ${
//         isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//       } sm:translate-x-0`}
//     >
//       <ClubSideBar closeSidebar={() => setSidebarOpen(false)} />
//     </div>
//     <div className="h-full w-full sm:w-3/4 sm:ml-[25%] ">
//       <div className="sm:hidden fixed bg-white h-[7.9vh] py-1 w-20 z-50">
//         <button
//           className="absolute top-2 left-4 z-50 p-2 bg-gray-700 text-white rounded-full"
//           onClick={() => setSidebarOpen(!isSidebarOpen)}
//         >
//           <Menu />
//         </button>
//       </div>
//       {children}
//     </div>
//   </div>
// );