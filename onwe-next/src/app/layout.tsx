"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { usePathname } from "next/navigation";
import SideBar from "@/components/SideBar/SideBar";
import { Provider } from "react-redux";
import store from "../lib/store";
import MinSideBar from "@/components/SideBar/MinSidebar";
import { Toaster } from "@/components/ui/sonner";
import BottomNavBar from "@/components/SideBar/BottomNavBar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SWRConfig } from "swr";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    // Check for the token in local storage
    const token = localStorage.getItem("onwetoken");
    setHasToken(!!token);

    // Redirect to sign-in page if token is not present and current path is restricted
    if (
      !token &&
      ![
        "/sign-in",
        "/sign-up",
        "/forgot-password",
        "/",
        "/landingpage",
        "/welcome",
      ].includes(pathname)
    ) {
      router.push("/sign-in");
    }
  }, [pathname, router]);

  const showSideBar =
    pathname.startsWith("/home") || pathname.startsWith("/profile");
  const showBottomNavBar =
    pathname !== "/forgot-password" &&
    pathname !== "/sign-up" &&
    pathname !== "/sign-in";
  const showMinSideBar =
    pathname !== "/" &&
    pathname !== "/forgot-password" &&
    pathname !== "/sign-up" &&
    pathname !== "/sign-in" &&
    !pathname.startsWith("/home") &&
    !pathname.startsWith("/profile") &&
    !pathname.startsWith("/landingpage") &&
    !pathname.startsWith("/welcome");

  const fetcher = async (url: string) => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}${url}`,
      {
        withCredentials: true,
      }
    );
    return data;
  };
  return (
    <SWRConfig
      value={{
        fetcher,
      }}
    >
      <Provider store={store}>
        <html lang="en" className="bg-white">
          <body
            className={`${inter.className} h-screen overflow-hidden bg-white`}
          >
            <div className="flex">
              {showSideBar && (
                <div className="w-[20%] hidden md:block">
                  <SideBar />
                </div>
              )}
              {showMinSideBar && (
                <div className="w-5/100 hidden sm:block animate-slide-out">
                  <MinSideBar />
                </div>
              )}
              {showBottomNavBar && (
                <div className="w-full flex items-center justify-between sm:hidden fixed bottom-0 z-10">
                  <BottomNavBar />
                </div>
              )}
              <div className="flex-1 h-full overflow-y-auto">{children}</div>
              <Toaster className="bg-white" />
            </div>
          </body>
        </html>
      </Provider>
    </SWRConfig>
  );
};

export default RootLayout;
