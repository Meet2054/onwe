import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import Link from "next/link";
import React, { useState } from "react";
import magazines from "./sideBarImages/book.svg";

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
  BookOpenText,
} from "lucide-react";
import { TooltipArrow } from "@radix-ui/react-tooltip";
import { Create } from "../Create";
import Image from "next/image";

const MinSideBar = () => {

  const [openCreate, setOpenCreate] = useState<boolean>(false)
  const handleCreatePost = () => {
    setOpenCreate(true)
  }

  return (
    <TooltipProvider>
      <div className="w-full ">
        <div className="h-screen w-full flex flex-col items-center justify-between  p-1 md:p-3  bg-white">
          <div className="flex items-start justify-center">
            <Link
              scroll={false}
              href="/"
              className="text-black hover:text-custom-brown"
            >
              <h1 className="font-bold text-lg p-2 pt-5 ">OnwE</h1>
            </Link>
          </div>
          {/* <hr className="border-t border-black my-4 w-full" /> */}
          <div className="flex flex-col items-start pl-3 pt-5 w-full space-y-8">
            <Link
              scroll={false}
              href="/home"
              className="flex items-center text-black hover:text-gray-500 w-full"
            >
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Home size={25} strokeWidth={2} />
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
              scroll={false}
              href="/explore"
              className="flex items-center text-black hover:text-gray-500 w-full"
            >
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Compass size={25} strokeWidth={2} />
                </TooltipTrigger>
                <TooltipContent
                  className="text-black bg-white  rounded-full"
                  align="center"
                  sideOffset={7}
                  side="left"
                >
                  <p>Explore</p>
                  <TooltipArrow className="fill-white" />
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
                  <Users size={25} strokeWidth={2} />
                </TooltipTrigger>
                <TooltipContent
                  className="text-black bg-white rounded-full"
                  align="center"
                  sideOffset={7}
                  side="left"
                >
                  <p>Clubs</p>
                  <TooltipArrow fill="white" />
                </TooltipContent>
              </Tooltip>
            </Link>
            {/* <Link
              scroll={false} href="/explore"
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
              scroll={false}
              href="/events"
              className="flex items-center text-black hover:text-gray-500 w-full"
            >
              {" "}
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Calendar size={25} strokeWidth={2} />
                </TooltipTrigger>
                <TooltipContent
                  className="text-black bg-white rounded-full"
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
              scroll={false}
              href="/magazines"
              className="flex items-center text-black hover:text-gray-500 w-full"
            >
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  {/* <Newspaper size={20} strokeWidth={2} /> */}
                  <BookOpenText size={25} strokeWidth={2} /> 
                </TooltipTrigger>
                <TooltipContent
                  className="text-black bg-white rounded-full"
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
              scroll={false}
              href="/articles"
              className="flex items-center text-black hover:text-gray-500 w-full"
            >
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Newspaper size={25} strokeWidth={2} />
                  {/* <Image src={magazines} alt="" height={20} width={20} /> */}

                </TooltipTrigger>
                <TooltipContent
                  className="text-black bg-white rounded-full"
                  align="center"
                  sideOffset={7}
                  side="left"
                >
                  <p>Articles</p>
                  <TooltipArrow className="fill-white" />
                </TooltipContent>
              </Tooltip>
            </Link>
            {/* <Link
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
                  <p>Create Post</p>
                  <TooltipArrow className="fill-white" />
                </TooltipContent>
              </Tooltip>
            </Link> */}
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
          <div className="flex flex-col justify-start mt-5 pt-5 mb-5 pr-2 w-full">
      {/* <Link scroll={false} href="/create">
          <div className="flex p-1 items-center">
            <div className="bg-white p-2 rounded-3xl">
              <Image src={create} alt="" width={30} height={30} />
              <Plus width={28} height={28} />
            </div>
            <h1 className="ml-2 text-lg ">Create</h1>
          </div>
        </Link> */}
        <button onClick={handleCreatePost}>
          <div className="flex p-1 items-center">
            <div className="bg-white p-2 rounded-3xl">
              <Plus size={25} strokeWidth={2} />
            </div>
            <h1 className=" text-lg "></h1>
          </div>
        </button>
        {openCreate &&
          <div className="fixed bottom inset-0 flex  justify-center bg-black bg-opacity-10 backdrop-blur-sm z-50">
            <div className=" p-6 h-4/5 w-1/4">
              <Create open={openCreate} setOpen={setOpenCreate} />
            </div>
          </div>
        }
        <Link scroll={false} href="/profile">
        <div className="flex p-1 items-center">
            <div className="bg-white p-2 rounded-3xl">
              {/* <Image src={create} alt="" width={30} height={30} /> */}
              <User size={25} strokeWidth={2}/>
            </div>
            <h1 className="text-lg "></h1>
          </div>
        </Link>
        {/* <Link href="/settings" className={`text-black hover:text-gray-900 flex items-center w-52 ml-10 ${isActive("/settings") ? 'bg-gray-300 rounded-full' : ''}`}>
          <div className='flex p-4'>
            <Settings size={20} strokeWidth={2} stroke='black' />
            <h1 className="ml-2 text-sm">Settings</h1>
          </div>
        </Link> */}
      </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default MinSideBar;
