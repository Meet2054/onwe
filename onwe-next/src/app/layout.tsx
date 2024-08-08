"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { usePathname } from "next/navigation";
import SideBar from "@/components/SideBar/SideBar";
import { Provider } from "react-redux";
import store from "../lib/store";
import MinSideBar from "@/components/SideBar/MinSidebar";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import BottomNavBar from "@/components/SideBar/BottomNavBar";

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const showSideBar = pathname.startsWith("/home");
  const showBottomNavBar = 
    pathname !== "/forgot-password" &&
    pathname !== "/sign-up" &&
    pathname !== "/sign-in";
  const showMinSideBar =
    pathname !== "/" &&
    pathname !== "/forgot-password" &&
    pathname !== "/sign-up" &&
    pathname !== "/sign-in" &&
    !pathname.startsWith("/home");
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <Provider store={store}>
        <html lang="en" className="bg-white">
          <body className={`${inter.className} h-screen overflow-hidden`}>
            <div className="flex ">
              {showSideBar && (
                <div className="w-3/12 hidden md:block">
                  <SideBar />
                </div>
              )}
              {showMinSideBar && (
                <div className="w-5/100 hidden sm:block">
                  <MinSideBar />
                </div>
              )}
              {showBottomNavBar && (
                <div className="w-full flex items-center justify-between sm:hidden fixed bottom-0 z-10">
                  <BottomNavBar/>
                </div>
              )}
              <div className="flex-1 h-full overflow-y-auto">{children}</div>
              <Toaster className="bg-white" />
            </div>
          </body>
        </html>
      </Provider>
    </ClerkProvider>
  );
};

export default RootLayout;
