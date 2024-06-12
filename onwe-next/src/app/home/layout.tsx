import { AnimatedLinks } from "@/components/AnimatedLinks";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-[70%] bg-[#f1f3f5] h-full">
      <div className="fixed top-0 w-[62%] bg-gray-400 z-10">
        <AnimatedLinks />
      </div>
      <div className="mt-5 h-full overflow-y-auto">{children}</div>
    </div>
  );
};

export default Layout;
