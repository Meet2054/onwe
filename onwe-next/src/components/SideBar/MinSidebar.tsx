import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import Link from "next/link";
import React from "react";
import {
  Home,
  Users,
  Compass,
  Search,
  Newspaper,
  Calendar,
  Bell,
  Plus,
  User,
  Settings,
} from "lucide-react";
import { TooltipArrow } from "@radix-ui/react-tooltip";

const MinSideBar = () => {
  return (
    <TooltipProvider>
      <div className="w-full">
        <div
          className="h-screen w-full flex flex-col items-center p-4 border bg-white"
          
        >
          <div className="flex items-start justify-center">
            <Link href="/" className="text-gray-700 hover:text-gray-900">
              <h1 className="font-bold text-2xl mr-3 mb-1">O</h1>
            </Link>
          </div>
          {/* <hr className="border-t border-black my-4 w-full" /> */}
          <div className="flex flex-col items-start w-full mt-8 space-y-8">
            <Link
              href="/home"
              className="flex items-center text-black hover:text-gray-500 w-full"
            >
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Home size={20} strokeWidth={2} />
                </TooltipTrigger>
                <TooltipContent
                  className="text-black bg-white rounded-full "
                  align="center"
                  sideOffset={7}
                  side="left"
                >
                  <p>Home</p>
                  <TooltipArrow fill="white" />
                </TooltipContent>
              </Tooltip>
            </Link>
            <Link
              href="/clubs"
              className="flex items-center text-black hover:text-gray-500 w-full"
            >
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Users size={20} strokeWidth={2} />
                </TooltipTrigger>
                <TooltipContent
                  className="text-black bg-white rounded-full"
                  align="center"
                  sideOffset={7}
                  side="left"
                >
                  <p>Users</p>
                  <TooltipArrow fill="white" />
                </TooltipContent>
              </Tooltip>
            </Link>
            {/* <Link
              href="/explore"
              className="flex items-center text-black hover:text-gray-500 w-full"
            >
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Compass size={20} strokeWidth={2} />
                </TooltipTrigger>
                <TooltipContent
                  className="text-black rounded-full"
                  align="center"
                  sideOffset={7}
                  side="left"
                >
                  <p>Explore</p>
                  <TooltipArrow className="fill-white" />
                </TooltipContent>
              </Tooltip>
            </Link> */}
            <Link
              href="/search"
              className="flex items-center text-black hover:text-gray-500 w-full"
            >
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Search size={20} strokeWidth={2} />
                </TooltipTrigger>
                <TooltipContent
                  className="text-black rounded-full"
                  align="center"
                  sideOffset={7}
                  side="left"
                >
                  <p>Search</p>
                  <TooltipArrow className="fill-white" />
                </TooltipContent>
              </Tooltip>
            </Link>
            <Link
              href="/magazines"
              className="flex items-center text-black hover:text-gray-500 w-full"
            >
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Newspaper size={20} strokeWidth={2} />
                </TooltipTrigger>
                <TooltipContent
                  className="text-black rounded-full"
                  align="center"
                  sideOffset={7}
                  side="left"
                >
                  <p>Magazines</p>
                  <TooltipArrow className="fill-white" />
                </TooltipContent>
              </Tooltip>
            </Link>
            <Link
              href="/events"
              className="flex items-center text-black hover:text-gray-500 w-full"
            >
              {" "}
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Calendar size={20} strokeWidth={2} />
                </TooltipTrigger>
                <TooltipContent
                  className="text-black rounded-full"
                  align="center"
                  sideOffset={7}
                  side="left"
                >
                  <p>Events</p>
                  <TooltipArrow className="fill-white" />
                </TooltipContent>
              </Tooltip>
            </Link>
            <Link
              href="/notifications"
              className="flex items-center text-black hover:text-gray-500 w-full"
            >
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Bell size={20} strokeWidth={2} />
                </TooltipTrigger>
                <TooltipContent
                  className="text-black rounded-full"
                  align="center"
                  sideOffset={7}
                  side="left"
                >
                  <p>Notifications</p>
                  <TooltipArrow className="fill-white" />
                </TooltipContent>
              </Tooltip>
            </Link>
            <Link
              href="/create"
              className="flex items-center text-black hover:text-gray-500 w-full"
            >
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Plus size={20} strokeWidth={2} />
                </TooltipTrigger>
                <TooltipContent
                  className="text-black rounded-full"
                  align="center"
                  sideOffset={7}
                  side="left"
                >
                  <p>Create Post</p>
                  <TooltipArrow className="fill-white" />
                </TooltipContent>
              </Tooltip>
            </Link>
          </div>
          <div className="flex flex-col items-start w-full mt-auto">
            <Link
              href="/profile"
              className="text-black hover:text-gray-900 mb-2 flex items-center w-full"
            >
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <User size={20} strokeWidth={2} />
                </TooltipTrigger>
                <TooltipContent
                  className="text-black rounded-full"
                  align="center"
                  sideOffset={7}
                  side="left"
                >
                  <p>Profile</p>
                  <TooltipArrow className="fill-white" />
                </TooltipContent>
              </Tooltip>
            </Link>
            {/* <Link
              href="/settings"
              className="text-black hover:text-gray-900 flex items-center w-full"
            >
              {" "}
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Settings size={20} strokeWidth={1.4} />
                </TooltipTrigger>
                <TooltipContent
                  className="text-black rounded-full"
                  align="center"
                  sideOffset={7}
                  side="left"
                >
                  <p>Settings</p>
                  <TooltipArrow className="fill-white" />
                </TooltipContent>
              </Tooltip>
            </Link> */}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default MinSideBar;
