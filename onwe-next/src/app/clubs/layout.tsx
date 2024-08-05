// import ClubChatAnnouncement from "@/components/ClubChatAnnouncement";
import ClubSideBar from "@/components/SideBar/ClubSideBar";
import { Info } from "lucide-react";
import { Menu } from "lucide-react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full w-full relative ">
      <div className="h-full w-1/4 overflow-y-auto bg-white fixed hidden sm:block">
        <ClubSideBar />
      </div>
      <div className="h-full w-3/4 sticky left-3/4">{children}</div>
    </div>
  );
};

export default Layout;
