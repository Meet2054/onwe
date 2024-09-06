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
  BookOpenText,
} from "lucide-react";
import LogoAnimation from "../ui/Animations/LogoAnimation";
import SearchC from "../SearchC";

const SideBar = () => {
  const pathname = usePathname();
  const [openCreate, setOpenCreate] = useState<boolean>(false)
  const [openSearch,setOpenSearch] = useState<boolean>(false)
  const handleCreatePost = () => {
    setOpenCreate(true)
  }
  const handleSearch = ()=>{
    setOpenSearch(true)
  }

  const isActive = (path: string) => pathname.includes(path);

  return (
    <div className="h-screen md:flex flex-col items-center justify-evenly p-5  bg-white animate-slide-in hidden">
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
              <Home  size={30} strokeWidth={1.5} />
            </div>
            <h1 className="ml-2 text-lg ">Home</h1>
          </div>
        </Link>
        <button onClick={handleSearch}>
          <div className="flex p-1 items-center">
            <div className="bg-white p-2 rounded-3xl">
              {/* <Image src={explore} alt="" width={30} height={30} /> */}
              <Search size={30} strokeWidth={1.5} />
            </div>
            <h1 className="ml-2 text-lg ">Search</h1>
          </div>
        </button>
        <Link scroll={false} href="/explore">
          <div className="flex p-1 items-center">
            <div className="bg-white p-2 rounded-3xl">
              {/* <Image src={explore} alt="" width={30} height={30} /> */}
              <Compass size={30} strokeWidth={1.5} />
            </div>
            <h1 className="ml-2 text-lg ">Explore</h1>
          </div>
        </Link>

        <Link scroll={false} href="/clubs">
          <div className="flex p-1 items-center">
            <div className="bg-white p-2 rounded-3xl">
              {/* <Image src={clubs} alt="" width={30} height={30} /> */}
              <Users width={30} height={30} strokeWidth={1.5} />
            </div>
            <h1 className="ml-2 text-lg">Clubs</h1>
          </div>
        </Link>

        <Link prefetch={true} scroll={false} href="/events">
          <div className="flex p-1 items-center">
            <div className="bg-white p-2 rounded-3xl">
              {/* <Image src={events} alt="" width={30} height={30} /> */}
              <Calendar width={30} height={30} strokeWidth={1.5}/>
            </div>
            <h1 className="ml-2 text-lg ">Events</h1>
          </div>
        </Link>

        <Link scroll={false} href="/magazines">
          <div className="flex p-1 items-center">
            <div className="bg-white p-2 rounded-3xl">
              {/* <Image src={magazines} alt="" width={30} height={30} /> */}
              <BookOpenText size={30} strokeWidth={1.5} />
            </div>
            <h1 className="ml-2 text-lg ">Magazines</h1>
          </div>
        </Link>
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
              <Plus width={28} height={28} strokeWidth={1.5} />
            </div>
            <h1 className="ml-2 text-lg ">Create</h1>
          </div>
        </button>
        {
  openSearch && (
    <div
      className="fixed inset-0 z-50 animate-slide-in"
      onClick={() => setOpenSearch(false)} // Clicking outside the modal closes it
    >
      <div
        className="w-1/3 h-screen ml-[25%] z-50 bg-white"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <SearchC />
      </div>
    </div>
  )
}

        <Link scroll={false} href="/profile">
        <div className="flex p-1 items-center">
            <div className="bg-white p-2 rounded-3xl">
              {/* <Image src={create} alt="" width={30} height={30} /> */}
              <User width={28} height={28} strokeWidth={1.5} />
            </div>
            <h1 className="ml-2 text-lg ">Profile</h1>
          </div>
        </Link>
      </div>
    </div>
  );
};
export default SideBar;
