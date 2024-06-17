import Link from 'next/link';
import React from 'react';
import { Home, Users, Compass, Search, Newspaper, Calendar, Bell, Plus, User, Settings } from 'lucide-react';

const MinSideBar = () => {
  return (
    <div className="h-screen w-14 flex flex-col items-center p-4 border bg-green-400" style={{ backgroundColor: '#F1F3F5' }}>
      <div className="flex items-start justify-center">
        <Link href="/" className="text-gray-700 hover:text-gray-900">
          <h1 className="font-bold text-2xl">O</h1>
        </Link>
      </div>
      <hr className="border-t border-black my-4 w-full" />
      <div className="flex flex-col items-start w-full mt-10 space-y-8">
        <Link href="/home" className="flex items-center text-black hover:text-gray-500 w-full">
          <Home size={28} strokeWidth={1.4} />
        </Link>
        <Link href="/clubs" className="flex items-center text-black hover:text-gray-500 w-full">
          <Users size={28} strokeWidth={1.4} />
        </Link>
        <Link href="/explore" className="flex items-center text-black hover:text-gray-500 w-full">
          <Compass size={28} strokeWidth={1.4} />
        </Link>
        <Link href="/search" className="flex items-center text-black hover:text-gray-500 w-full">
          <Search size={28} strokeWidth={1.4} />
        </Link>
        <Link href="/magazines" className="flex items-center text-black hover:text-gray-500 w-full">
          <Newspaper size={28} strokeWidth={1.4} />
        </Link>
        <Link href="/events" className="flex items-center text-black hover:text-gray-500 w-full">
          <Calendar size={28} strokeWidth={1.4} />
        </Link>
        <Link href="/notifications" className="flex items-center text-black hover:text-gray-500 w-full">
          <Bell size={28} strokeWidth={1.4} />
        </Link>
        <Link href="/create" className="flex items-center text-black hover:text-gray-500 w-full">
          <Plus size={28} strokeWidth={1.4} />
        </Link>
      </div>
      <div className="flex flex-col items-start w-full mt-auto">
        <Link href="/profile" className="text-black hover:text-gray-900 mb-2 flex items-center w-full">
          <User size={28} strokeWidth={1.4} />
        </Link>
        <Link href="/settings" className="text-black hover:text-gray-900 flex items-center w-full">
          <Settings size={28} strokeWidth={1.4} />
        </Link>
      </div>
    </div>
  );
};

export default MinSideBar;
