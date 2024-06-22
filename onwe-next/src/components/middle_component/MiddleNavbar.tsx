"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const MiddleNavbar = () => {
  const pathname = usePathname();

  const category = [
    { name: "Social Engagement", href: "/home/social" },
    { name: "Academia", href: "/home/academia" },
    { name: "Literature", href: "/home/literature" },
    { name: "Discussions", href: "/home/discussions" },
    { name: "Sports", href: "/home/sports" },
    { name: "Art & Fashion", href: "/home/artfashion" },
  ];

  return (
    <div className=" flex justify-between w-full bg-white  gap-x-2.5">
      {category.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={`flex items-center justify-center border border-black rounded-full text-sm h-[34px] px-3 ${
            pathname === item.href
              ? "text-white transition-all bg-black transition-colors"
              : "text-gray-500"
          }`}
        >
          <span className="flex whitespace-nowrap">{item.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default MiddleNavbar;
