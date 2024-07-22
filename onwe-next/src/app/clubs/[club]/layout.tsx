import React from "react";
import GeneralAnnounce from "@/components/clubs/GeneralAnnounce";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <GeneralAnnounce/>
      <div className="bg-[#F1F3F5] h-screen">{children}</div>
    </>
  );
};

export default Layout;
