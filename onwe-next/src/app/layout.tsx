"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { usePathname } from "next/navigation";
import SideBar from "@/components/SideBar/SideBar";
import { Provider } from "react-redux";
import store from "../lib/store";
import MinSideBar from "@/components/SideBar/MinSidebar";

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const showLayout = pathname !== "/login-signup" && pathname !== "/";

  return (
    <Provider store={store}>
      <html lang="en" className="bg-[#f1f3f5]">
        <body className={`${inter.className} h-screen`}>
          <div className="flex h-full">
            <div className="bg-green-300 w-3/12">
              {showLayout && <MinSideBar />}
            </div>
            <div className="h-full w-7/12 border border-black overflow-y-auto">
              {children}
            </div>
            <div className="h-full w-5/12">
              <div className="bg-green-300"></div>
            </div>
          </div>
        </body>
      </html>
    </Provider>
  );
};

export default RootLayout;
