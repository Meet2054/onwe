import Edit from "@/components/profile/edit/Edit";
import React from "react";

const page = () => {
  return (
    <>
      <div className="h-screen w-full hidden  sm:flex items-center justify-center  bg-gray-200 p-3 ">
        <div className="w-full h-full overflow-hidden bg-white flex justify-center items-center py-10 rounded-md">
          <Edit />
        </div>
      </div>
      <div className="w-full  flex sm:hidden  h-full overflow-hidden bg-white flex justify-center py-10">
        <Edit />
      </div>
    </>
  );
};

export default page;
