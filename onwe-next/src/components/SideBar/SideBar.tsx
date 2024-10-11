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
  Bell,
} from "lucide-react";
import LogoAnimation from "../ui/Animations/LogoAnimation";
import { Create } from "../Create";
import SearchC from "../SearchC";
import { MdNotifications } from "react-icons/md";
import Noti from "../notifications/Noti";

const SideBar = () => {
  const pathname = usePathname();
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const [openNoti,setOpenNoti] = useState<boolean>(false);

  const handleCreatePost = () => {
    setOpenCreate(true);
  };

  const handleSearch = () => {
    setOpenSearch(true);
  };

  const handleNoti =()=>{
    setOpenNoti(true);
  }

  const isActive = (path: string) => pathname.includes(path);

  return (
    <div className="h-screen hidden  md:flex flex-col items-center justify-between p-5 bg-white animate-slide-in m-2  rounded-xl">
      <div className="flex items-center justify-center w-full pt-5">
        <Link scroll={false} href="/" className="text-black hover:text-custom-brown text-4xl font-bold  mr-5">
          {/* <LogoAnimation /> */}
          ONWE
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center w-full space-y-4">
        <Link
          scroll={false}
          href="/home"
          className={`flex items-center justify-start w-3/4 h-12 p-2 rounded-lg ${
            isActive("/home") ? "bg-gray-100" : "hover:bg-gray-50"
          }`}
        >
          <div className={`p-2 rounded-full ${isActive("/home") ? "bg-gray-100" : "bg-transparent"}`}>
            <Home size={30} strokeWidth={1.5} />
          </div>
          <h1 className="ml-2 text-lg">Home</h1>
        </Link>
        <button
          onClick={handleSearch}
          className={`flex items-center justify-start w-3/4 h-12 p-2 rounded-lg ${
            openSearch ? "bg-gray-100" : "hover:bg-gray-50"
          }`}
        >
          <div className={`p-2 rounded-full ${openSearch ? "bg-gray-100" : "bg-transparent"}`}>
            <Search size={30} strokeWidth={1.5} />
          </div>
          <h1 className="ml-2 text-lg">Search</h1>
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
            className={`flex items-center justify-start w-3/4 h-12 p-2 rounded-lg ${
              isActive(item.href) ? "bg-gray-100" : "hover:bg-gray-50"
            }`}
          >
            <div className={`p-2 rounded-full ${isActive(item.href) ? "bg-gray-100" : "bg-transparent"}`}>
              <item.icon size={30} strokeWidth={1.5} />
            </div>
            <h1 className="ml-2 text-lg">{item.label}</h1>
          </Link>
        ))}
        <button
        onClick={handleNoti}
        className={`flex items-center justify-start w-3/4 h-12 p-2 rounded-lg ${
          openNoti ? "bg-gray-100" : "hover:bg-gray-50"
        }`}>
        <div className={`p-2 rounded-full ${openNoti ? "bg-gray-100" : "bg-transparent"}`}>
            <Bell size={30} strokeWidth={1.5} />
          </div>
          <h1 className="ml-2 text-lg">Notifications</h1>
        </button>
      </div>

      <div className="flex flex-col items-center justify-center w-full space-y-4">
        <button
          onClick={handleCreatePost}
          className="flex items-center justify-start w-3/4 h-12 p-2 rounded-lg hover:bg-gray-50"
        >
          <div className="p-2 rounded-full bg-transparent">
            <Plus size={30} strokeWidth={1.5} />
          </div>
          <h1 className="ml-2 text-lg">Create</h1>
        </button>
        <Link
          scroll={false}
          href="/profile"
          className={`flex items-center justify-start w-3/4 h-12 p-2 rounded-lg ${
            isActive("/profile") ? "bg-gray-100" : "hover:bg-gray-50"
          }`}
        >
          <div className={`p-2 rounded-full ${isActive("/profile") ? "bg-gray-100" : "bg-transparent"}`}>
            <User size={30} strokeWidth={1.5} />
          </div>
          <h1 className="ml-2 text-lg">Profile</h1>
        </Link>
      </div>
      {openCreate && (
        <div className="fixed inset-0 flex justify-center bg-black bg-opacity-10 backdrop-blur-sm z-50">
          <div className="p-6 max-h-[80vh] w-1/4">
            <Create open={openCreate} setOpen={setOpenCreate} />
          </div>
        </div>
      )}
      {openSearch && (
        <div
          className="fixed inset-0 z-50"
          onClick={() => setOpenSearch(false)}
        >
          <div
            className="w-1/3 h-screen ml-[20%] z-50 mt-2 bg-white animate-slide-in"
            onClick={(e) => e.stopPropagation()}
          >
            <SearchC setOpenSearch={setOpenSearch}/>
          </div>
        </div>
      )}
       {openNoti && (
        <div
          className="fixed inset-0 z-50"
          onClick={() => setOpenNoti(false)}
        >
          <div
            className="w-1/3 h-screen ml-[20%] z-50 mt-2 bg-white animate-slide-in"
            onClick={(e) => e.stopPropagation()}
          >
            <Noti setOpenNoti={setOpenNoti}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;
