// import ClubChatAnnouncement from "@/components/ClubChatAnnouncement";
import ClubSideBar from "@/components/SideBar/ClubSideBar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full w-full">
      <div className="h-full w-1/4">
        <ClubSideBar />
      </div>
      <div className="h-full w-3/4">{children}</div>
    </div>
  );
};

export default Layout;
