import ClubChatAnnouncement from "@/components/ClubChatAnnouncement";
import ClubSideBar from "@/components/SideBar/ClubSideBar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full ">
      <div className="fixed">
        <ClubSideBar />
      </div>
      <div className="mt-5 ml-40 h-full overflow-y-auto">{children}</div>
    </div>
  );
};

export default Layout;
