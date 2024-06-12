import { AnimatedLinks } from "@/components/AnimatedLinks";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-[70%] bg-red-200">
      <AnimatedLinks />
      {children}
    </div>
  );
};

export default layout;
