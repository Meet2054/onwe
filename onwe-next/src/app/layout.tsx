"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { usePathname } from "next/navigation";
import SideBar from "@/components/SideBar/SideBar";
import { Provider } from 'react-redux';
import store from '../lib/store'
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
      <body className={`${inter.className} h-screen overflow-hidden`}>
        <div className="flex h-full">
          <div className="">{showLayout && <MinSideBar />}</div>
          <div className="flex-1 h-full overflow-y-auto">
            {children}
          </div>
        </div>
      </body>
    </html>
    </Provider>
  );
};

export default RootLayout;
