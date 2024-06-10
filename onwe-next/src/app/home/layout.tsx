import Leftcomponent from "@/components/left_component/LeftComponent";
import Middle from "@/components/middle_component/Middle";
import RightComponent from "@/components/right_component/RightComponent";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <Leftcomponent />
      <Middle children={children} />
      <RightComponent />
    </div>
  );
};

export default layout;
