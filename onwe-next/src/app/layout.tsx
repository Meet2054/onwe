// RootLayout.tsx
"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { usePathname } from "next/navigation";
import SideBar from "@/components/SideBar/SideBar";

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const showLayout = pathname !== "/login-signup" && pathname !== "/";

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex">
          {showLayout && <SideBar />}
          {children}
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
