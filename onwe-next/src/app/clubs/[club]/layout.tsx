import React from "react";
import GeneralAnnounce from "@/components/clubs/GeneralAnnounce";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <GeneralAnnounce />
      <div className="h-screen grow">{children}</div>
    </>
  );
};

export default Layout;
