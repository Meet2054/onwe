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
              {showLayout && (
                <div className="w-3/12">
                  <MinSideBar />
                </div>
              )}
              <div
                className={`h-full border border-black overflow-y-auto ${
                  showLayout ? "w-7/12" : "w-full"
                }`}
              >
                {children}
              </div>
              {showLayout && (
                <div className="h-full w-5/12">
                  <div className=""></div>
                </div>
              )}
            </div>
          </body>
        </html>
      </Provider>
    </ClerkProvider>
  );
};

export default RootLayout;
