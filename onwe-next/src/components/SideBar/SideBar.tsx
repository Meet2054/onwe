import Link from 'next/link';
import React from 'react';
import { Home, Users, Compass, Search, Newspaper, Calendar, Bell, Plus, User, Settings } from 'lucide-react';

const SideBar = () => {
  return (
    <div className="h-screen w-40  flex flex-col items-center p-4" style={{ backgroundColor: '#F1F3F5' }}>
      <div className="flex items-start justify-center">
        <Link href="/" className="text-gray-700 hover:text-gray-900">
          <h1 className="font-bold text-2xl">ONWE</h1>
        </Link>
      </div>
      <hr className="border-t border-black my-4 w-full" />
      <div className="flex flex-col items-start w-full mt-10 space-y-8">
        <Link href="/home" className=" flex items-center text-black hover:text-gray-500 w-full">
          <Home size={20} strokeWidth={1.4} />
          <h1 className="ml-2 text-sm">Home</h1>
        </Link>
        <Link href="/clubs" className=" flex items-center text-black hover:text-gray-500 w-full">
          <Users strokeWidth={1.4} size={20} />
          <h1 className="ml-2 text-sm">Clubs</h1>
        </Link>
        <Link href="/explore" className=" flex items-center text-black hover:text-gray-500 w-full">
          <Compass size={20} strokeWidth={1.4} />
          <h1 className="ml-2 text-sm">Explore</h1>
        </Link>
        <Link href="/notifications" className=" flex items-center text-black hover:text-gray-500 w-full">
          <Search size={20} strokeWidth={1.4} />
          <h1 className="ml-2 text-sm">Search</h1>
        </Link>
        <Link href="/messages" className=" flex items-center text-black hover:text-gray-500 w-full">
          <Newspaper size={20} strokeWidth={1.4} />
          <h1 className="ml-2 text-sm">Magazines</h1>
        </Link>
        <Link href="/saved" className=" flex items-center text-black hover:text-gray-500 w-full">
          <Calendar size={20} strokeWidth={1.4} />
          <h1 className="ml-2 text-sm">Event</h1>
        </Link>
        <Link href="/saved" className=" flex items-center text-black hover:text-gray-500 w-full">
          <Bell size={20} strokeWidth={1.4} />
          <h1 className="ml-2 text-sm">Notifications</h1>
        </Link>
        <Link href="/saved" className=" flex items-center text-black hover:text-gray-500 w-full">
          <Plus size={20} strokeWidth={1.4} />
          <h1 className="ml-2 text-sm">Create</h1>
        </Link>
      </div>
      <div className="flex flex-col items-start w-full  mt-60">
        <Link href="/profile" className="text-black hover:text-gray-900 mb-2 flex items-center w-full">
          <User strokeWidth={1.4} />
          <h1 className="ml-2 text-sm">Profile</h1>
        </Link>
        <Link href="/settings" className="text-black hover:text-gray-900 flex items-center w-full">
          <Settings strokeWidth={1.4} />
          <h1 className="ml-2 text-sm">Settings</h1>
        </Link>
      </div>
    </div>
  );
}

export default SideBar;
