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
    <div className="flex justify-between">
      {category.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={`${
            pathname === item.href
              ? "text-black transition-all transition-colors  bg-slate-400 rounded-md"
              : "text-gray-500"
          }`}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default MiddleNavbar;
