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
        <div className="w-full animate-slide-out bg-white">
          <div className="w-full flex flex-col items-center p-4 border">
            {/* <hr className="border-t border-black my-4 w-full" /> */}
            <div className="flex  items-center w-full">
              <Link
                scroll={false}
                href="/home"
                className="flex items-center text-black  hover:text-gray-500 w-full"
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
                    <TooltipArrow fill="white" />
                  </TooltipContent>
                </Tooltip>
              </Link>
              <Link
                scroll={false}
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
                    <TooltipArrow fill="white" />
                  </TooltipContent>
                </Tooltip>
              </Link>

              <Link
                scroll={false}
                href="/explore"
                className="flex items-center text-black hover:text-gray-500 w-full"
              >
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Compass size={20} strokeWidth={2} />
                  </TooltipTrigger>
                  <TooltipContent
                    className="text-black bg-white  rounded-full"
                    align="center"
                    sideOffset={7}
                    side="left"
                  >
                    <TooltipArrow className="fill-white" />
                  </TooltipContent>
                </Tooltip>
              </Link>
              <Link
                scroll={false}
                href="/magazines"
                className="flex items-center text-black hover:text-gray-500 w-full"
              >
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Newspaper size={20} strokeWidth={2} />
                  </TooltipTrigger>
                  <TooltipContent
                    className="text-black bg-white rounded-full"
                    align="center"
                    sideOffset={7}
                    side="left"
                  >
                    <TooltipArrow className="fill-white" />
                  </TooltipContent>
                </Tooltip>
              </Link>
              <Link
                scroll={false}
                href="/events"
                className="flex items-center text-black hover:text-gray-500 w-full"
              >
                {" "}
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Calendar size={20} strokeWidth={2} />
                  </TooltipTrigger>
                  <TooltipContent
                    className="text-black bg-white rounded-full"
                    align="center"
                    sideOffset={7}
                    side="left"
                  >
                    <TooltipArrow className="fill-white" />
                  </TooltipContent>
                </Tooltip>
              </Link>
              <Link
                scroll={false}
                href="/create"
                className="flex items-center text-black hover:text-gray-500 w-full"
              >
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Plus size={20} strokeWidth={2} />
                  </TooltipTrigger>
                  <TooltipContent
                    className="text-black bg-white rounded-full"
                    align="center"
                    sideOffset={7}
                    side="left"
                  >
                    <TooltipArrow className="fill-white" />
                  </TooltipContent>
                </Tooltip>
              </Link>
              <Link
                scroll={false}
                href="/profile"
                className="text-black hover:text-gray-900 flex items-center w-full"
              >
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <User size={20} strokeWidth={2} />
                  </TooltipTrigger>
                  <TooltipContent
                    className="text-black bg-white rounded-full"
                    align="center"
                    sideOffset={7}
                    side="left"
                  >
                    <TooltipArrow className="fill-white" />
                  </TooltipContent>
                </Tooltip>
              </Link>
            </div>
            {/* <div className="flex flex-col items-start w-full mt-auto">
              <Link
                scroll={false}
                href="/profile"
                className="text-black hover:text-gray-900 mb-2 flex items-center w-full"
              >
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <User size={20} strokeWidth={2} />
                  </TooltipTrigger>
                  <TooltipContent
                    className="text-black bg-white rounded-full"
                    align="center"
                    sideOffset={7}
                    side="left"
                  >
                    <p>Profile</p>
                    <TooltipArrow className="fill-white" />
                  </TooltipContent>
                </Tooltip>
              </Link>
            </div> */}
          </div>
        </div>
      </TooltipProvider>
    );
  };
  
  export default MinSideBar;
  