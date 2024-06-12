// Navigation.tsx
import Link from "next/link";
import React from "react";

const SideBar = () => {
  return (
    <div className="left-0 top-0 h-screen w-40 bg-gray-200 flex flex-col justify-between items-center py-4">
      <div className="flex flex-col items-center">
        <Link href="/home" className="mb-6 text-gray-700 hover:text-gray-900">
          <h1 className="font-bold">Home</h1>
        </Link>
        <Link
          href="/profile"
          className="mb-6 text-gray-500 hover:text-gray-900"
        >
          <h1 className="font-bold">Profile</h1>
        </Link>
        <Link
          href="/explore"
          className="mb-6 text-gray-500 hover:text-gray-900"
        >
          <h1 className="font-bold">Explore</h1>
        </Link>
        <Link
          href="/notifications"
          className="mb-6 text-gray-500 hover:text-gray-900"
        >
          <h1 className="font-bold">Notifications</h1>
        </Link>
        <Link
          href="/messages"
          className="mb-6 text-gray-500 hover:text-gray-900"
        >
          <h1 className="font-bold">Messages</h1>
        </Link>
        <Link href="/saved" className="mb-6 text-gray-500 hover:text-gray-900">
          <h1 className="font-bold">Saved</h1>
        </Link>
      </div>
      <div className="mb-6">
        <Link href="#">LogOut</Link>
      </div>
    </div>
  );
};

export default SideBar;
