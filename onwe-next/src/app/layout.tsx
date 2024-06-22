"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { usePathname } from "next/navigation";
import SideBar from "@/components/SideBar/SideBar";
import { Provider } from "react-redux";
import store from "../lib/store";
import MinSideBar from "@/components/SideBar/MinSidebar";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const showLayout =
    pathname !== "/sign-in" && pathname !== "/" && pathname !== "/sign-up";

    return (
      <ClerkProvider>
      <Provider store={store}>
      <html lang="en" className="bg-[#f1f3f5]">
        <body className={`${inter.className} h-screen overflow-hidden`}>
         <div className="flex h-full">
           <div className="">{showLayout && <SideBar />}</div>
           <div className="flex-1 h-full overflow-y-auto">
             {children}
           </div>
         </div>
        </body>
      </html>
      </Provider>
      </ClerkProvider>
    );
  };

export default RootLayout;

// "use client";
// import { Inter } from "next/font/google";
// import "./globals.css";
// import { usePathname } from "next/navigation";
// import SideBar from "@/components/SideBar/SideBar";
// import { Provider } from "react-redux";
// import store from "../lib/store";
// import MinSideBar from "@/components/SideBar/MinSidebar";
// import { ClerkProvider } from "@clerk/nextjs";

// const inter = Inter({ subsets: ["latin"] });

// interface RootLayoutProps {
//   children: React.ReactNode;
// }

// const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
//   const pathname = usePathname();
//   const showLayout =
//     pathname !== "/sign-in" && pathname !== "/" && pathname !== "/sign-up";

//   return (
//     <ClerkProvider>
//       <Provider store={store}>
//         <html lang="en" className="">
//           <body className={`${inter.className} h-screen overflow-hidden`}>
//             <div className="flex h-full">
//               {showLayout && (
//                 <div className="w-2/12">
//                   <MinSideBar />
//                 </div>
//               )}
//               <div className={`h-full w-full overflow-y-auto bg-red-200`}>
//                 {/* {children} */}
//                 ddd
//               </div>
//             </div>
//           </body>
//         </html>
//       </Provider>
//     </ClerkProvider>
//   );
// };

// export default RootLayout;
