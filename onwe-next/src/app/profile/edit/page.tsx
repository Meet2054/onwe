import Edit from "@/components/profile/edit/Edit";
import React from "react";

const page = () => {
  return (
    <>
      <div className="h-[100vh] w-full hidden  sm:flex items-center  bg-[#F1F1F1] ">
        <div className="w-full mr-3 rounded-xl h-[96vh] overflow-hidden bg-white flex justify-center py-10">
          <Edit />
        </div>
      </div>
      <div className="w-full mr-3 flex sm:hidden  rounded-xl h-[96vh] overflow-hidden bg-white flex justify-center py-10">
        <Edit />
      </div>
    </>
  );
};

export default page;
