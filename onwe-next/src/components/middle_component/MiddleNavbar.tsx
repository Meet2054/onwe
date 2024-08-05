"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const MiddleNavbar = () => {
  const pathname = usePathname();

  const category = [
    { name: "General", href: "/home/general" },
    { name: "Academia", href: "/home/academia" },
    { name: "Literature", href: "/home/literature" },
    { name: "Discussions", href: "/home/discussions" },
    { name: "Sports", href: "/home/sports" },
    { name: "Art & Fashion", href: "/home/arts_fashion" },
  ];

  return (
    <div className="md:flex justify-cetner px-7 py-4 w-full  bg-white  gap-x-2.5 grid grid-cols-3 gap-y-3">
      {category.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={`flex items-center  justify-center border border-[#F1F3F5] rounded-full h-[34px] px-3 ${
            pathname === item.href
              ? "text-white transition-all bg-black transition-colors"
              : "text-gray-500"
          }`}
        >
          <span className="flex whitespace-nowrap text-xs">{item.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default MiddleNavbar;
