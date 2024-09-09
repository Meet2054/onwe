"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const MiddleNavbar = () => {
  const pathname = usePathname();

  const category = [
    { name: "General", href: "/home" },
    { name: "Academia", href: "/home/academia" },
    // { name: "Literature", href: "/home/literature" },
    // { name: "Discussions", href: "/home/discussions" },
    { name: "Sports", href: "/home/sports" },
    { name: "Art & Fashion", href: "/home/arts_fashion" },
    { name: "Polls", href: "/home/polls" },
  ];

  return (
    <>
      {/* <div className="md:flex justify-cetner px-7 py-4 w-full  bg-white   gap-x-2.5 grid grid-cols-3 gap-y-3">
      {category.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={`flex items-center  justify-center border border-[#F1F3F5] rounded border-black h-[34px] px-3 ${
            pathname === item.href
              ? "text-white transition-all bg-black transition-colors"
              : "text-black"
          }`}
        >
          <span className="flex whitespace-nowrap text-xs">{item.name}</span>
        </Link>
      ))}
    </div> */}
      <nav className="flex flex-col items-start w-full text-sm  pt-3 font-medium bg-white p-2 tracking-normal leading-5 text-center text-black min-h-[66px] max-md:max-w-full">
        <div className="flex overflow-hidden overflow-x-auto flex-wrap gap-2.5 justify-center items-center pr-2.5 min-h-[50px] max-md:max-w-full">
          {category.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`overflow-hidden text-center p-2 gap-2.5 self-stretch px-4 my-auto whitespace-nowrap rounded-xl min-h-[32px] ${
                pathname === item.href
                  ? "text-white bg-black bg-opacity-90 "
                  : "bg-white bg-opacity-90 border border-2 border-grey"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};

export default MiddleNavbar;
