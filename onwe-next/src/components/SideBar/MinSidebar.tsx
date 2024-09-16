import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  Compass,
  Search,
  Calendar,
  Plus,
  User,
  BookOpenText,
} from "lucide-react";
import { TooltipArrow } from "@radix-ui/react-tooltip";
import { Create } from "../Create";
import SearchC from "../SearchC";

const MinSideBar = () => {
  const pathname = usePathname();
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const handleCreatePost = () => {
    setOpenCreate(true);
  };
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const handleSearch = () => {
    setOpenSearch(true);
  };

  const isActive = (path: string) => pathname.includes(path);

  return (
    <TooltipProvider>
      <div className="w-full h-screen flex flex-col items-center justify-between p-2 bg-white">
        <div className="flex items-center justify-center w-full py-5">
          <Link href="/" className="text-black hover:text-custom-brown">
            <h1 className="font-bold text-lg">OnwE</h1>
          </Link>
        </div>
        <div className="flex flex-col items-center w-full space-y-4">
          <Link
            scroll={false}
            href="/home"
            className={`flex items-center justify-center w-full h-12 rounded-lg ${
              isActive("/home") ? "bg-gray-100" : "hover:bg-gray-50"
            }`}
          >
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Home size={25} strokeWidth={2} />
              </TooltipTrigger>
              <TooltipContent
                className="text-black bg-white rounded-full"
                align="center"
                sideOffset={7}
                side="left"
              >
                <p>Home</p>
                <TooltipArrow fill="white" />
              </TooltipContent>
            </Tooltip>
          </Link>
          <button
            className={`flex items-center justify-center w-full h-12 rounded-lg ${
              openSearch ? "bg-gray-100" : "hover:bg-gray-50"
            }`}
            onClick={handleSearch}
          >
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Search size={25} strokeWidth={2} />
              </TooltipTrigger>
              <TooltipContent
                className="text-black bg-white rounded-full"
                align="center"
                sideOffset={7}
                side="left"
              >
                <p>Search</p>
                <TooltipArrow fill="white" />
              </TooltipContent>
            </Tooltip>
          </button>
          {[
            { href: "/explore", label: "Explore", icon: Compass },
            { href: "/clubs", label: "Clubs", icon: Users },
            { href: "/events", label: "Events", icon: Calendar },
            { href: "/magazines", label: "Magazines", icon: BookOpenText },
          ].map((item, index) => (
            <Link
              key={index}
              scroll={false}
              href={item.href}
              className={`flex items-center justify-center w-full h-12 rounded-lg ${
                isActive(item.href) ? "bg-gray-100" : "hover:bg-gray-50"
              }`}
            >
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <item.icon size={25} strokeWidth={2} />
                </TooltipTrigger>
                <TooltipContent
                  className="text-black bg-white rounded-full"
                  align="center"
                  sideOffset={7}
                  side="left"
                >
                  <p>{item.label}</p>
                  <TooltipArrow fill="white" />
                </TooltipContent>
              </Tooltip>
            </Link>
          ))}
        </div>
        <div className="flex flex-col items-center w-full space-y-4 mt-5 mb-2">
          <button
            onClick={handleCreatePost}
            className="flex items-center justify-center w-full h-12 rounded-lg bg-white hover:bg-gray-50"
          >
            <Plus size={25} strokeWidth={2} />
          </button>
          <Link
            scroll={false}
            href="/profile"
            className={`flex items-center justify-center w-full h-12 rounded-lg ${
              isActive("/profile") ? "bg-gray-100" : "hover:bg-gray-50"
            }`}
          >
            <User size={25} strokeWidth={2} />
          </Link>
        </div>
        {openCreate && (
          <div className="fixed inset-0 flex justify-center bg-black bg-opacity-10 backdrop-blur-sm z-50">
            <div className="p-6 h-4/5 w-1/4">
              <Create open={openCreate} setOpen={setOpenCreate} />
            </div>
          </div>
        )}
        {openSearch && (
          <div
            className={`fixed inset-0 z-50 animate-slide-in`}
            onClick={() => setOpenSearch(false)} // Clicking outside the modal closes it
          >
            <div
              className="w-1/3 h-screen ml-[5%] z-50 bg-white"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
            >
              <SearchC setOpenSearch={setOpenSearch}/>
            </div>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
};

export default MinSideBar;
