import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import home from "./sideBarImages/Home.svg";
import clubs from "./sideBarImages/category-2.svg";
import explore from "./sideBarImages/Explore.svg";
import magazines from "./sideBarImages/book.svg";
import events from "./sideBarImages/calendar.svg";
import create from "./sideBarImages/create.svg";
import Image from "next/image";
import { Create } from "../Create"
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
  HomeIcon,
} from "lucide-react";
import LogoAnimation from "../ui/Animations/LogoAnimation";

const SideBar = () => {
  const pathname = usePathname();
  const [openCreate, setOpenCreate] = useState<boolean>(false)
  const handleCreatePost = () => {
    setOpenCreate(true)
  }

  const isActive = (path: string) => pathname.includes(path);

  return (
    <div className="h-screen md:flex flex-col items-center justify-evenly  bg-white animate-slide-in hidden">
      <div className="flex ml-[-80px]">
        <Link
          scroll={false}
          href="/"
          className="text-gray-700 hover:text-gray-900"
        >
          {/* <h1 className="font-bold text-3xl border border-4 border-[#f1f1f1] p-1  ">ONWE</h1> */}
          <LogoAnimation />
        </Link>
      </div>
      {/* <hr className="border-t border-black my-4 w-full" /> */}
      <div className="flex flex-col items-centre w-4/6 justify-center gap-1 ">
        <Link prefetch={true} scroll={false} href="/home">
          <div className="flex p-1 items-center">
            <div className="bg-white rounded-3xl p-2">
              {/* <Image src={home} alt="" width={30} height={30} /> */}
              <Home  width={30} height={30} />
            </div>
            <h1 className="ml-2 text-lg ">Home</h1>
          </div>
        </Link>

        <Link scroll={false} href="/explore">
          <div className="flex p-1 items-center">
            <div className="bg-white p-2 rounded-3xl">
              <Image src={explore} alt="" width={30} height={30} />
            </div>
            <h1 className="ml-2 text-lg ">Explore</h1>
          </div>
        </Link>

        <Link scroll={false} href="/clubs">
          <div className="flex p-1 items-center">
            <div className="bg-white p-2 rounded-3xl">
              {/* <Image src={clubs} alt="" width={30} height={30} /> */}
              <Users width={30} height={30} />
            </div>
            <h1 className="ml-2 text-lg">Clubs</h1>
          </div>
        </Link>
        {/* <Link scroll={false} href="/explore" className={`flex items-center text-black hover:text-gray-500 w-52 ml-10 ${isActive("/explore") ? 'bg-gray-300 rounded-full' : ''}`}>
          <div className='flex p-4'>
            <Compass size={20} strokeWidth={1.4} stroke='black' />
            <h1 className="ml-2 text-sm">Explore</h1>
          </div>
        </Link> */}

        <Link prefetch={true} scroll={false} href="/events">
          <div className="flex p-1 items-center">
            <div className="bg-white p-2 rounded-3xl">
              <Image src={events} alt="" width={30} height={30} />
            </div>
            <h1 className="ml-2 text-lg ">Events</h1>
          </div>
        </Link>

        <Link scroll={false} href="/magazines">
          <div className="flex p-1 items-center">
            <div className="bg-white p-2 rounded-3xl">
              <Image src={magazines} alt="" width={30} height={30} />
            </div>
            <h1 className="ml-2 text-lg ">Magazines</h1>
          </div>
        </Link>
      
        <Link scroll={false} href="/articles">
          <div className="flex p-1 items-center">
            <div className="bg-white p-2 rounded-3xl">
              {/* <Image src={magazines} alt="" width={30} height={30} /> */}
              <Newspaper width={30} height={30} />
            </div>
            <h1 className="ml-2 text-lg ">Articles</h1>
          </div>
        </Link>
        {/* <Link
          scroll={false} href="/notifications"
          className={`flex items-center text-black hover:text-gray-500 w-52 ml-10 ${
            isActive("/notifications") ? "bg-gray-300 rounded-full" : ""
          }`}
        >
          <div className="flex p-4">
            <Bell size={20} strokeWidth={2} stroke="black" />
            <h1 className="ml-2 text-sm ">Notifications</h1>
          </div>
        </Link> */}
        
      </div>
      <div className="flex flex-col items-start w-4/6">
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
              <Plus width={28} height={28} />
            </div>
            <h1 className="ml-2 text-lg ">Create</h1>
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
              <User width={28} height={28} />
            </div>
            <h1 className="ml-2 text-lg ">Profile</h1>
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
  );
};
export default SideBar;
