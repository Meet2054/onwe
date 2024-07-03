import { Button } from "@/components/ui/button";
import React from "react";

const EditTopBar = () => {
  return (
    <div className="w-full h-10 flex justify-between">
      {/* <div className="flex gap-2 w-[20%] h-10">
        <Button className="border h-10 w-1/2 bg-black text-white rounded-full hover:ring-2 border hover:bg-black">
          Profile
        </Button>
        <Button
          variant="ghost"
          className="border h-10 w-1/2 text-black rounded-full"
        >
          Account
        </Button>
      </div> */}
      <div className="w-[20%] h-10 flex gap-3">
        <Button
          variant="ghost"
          className="border h-10  text-black rounded-full px-3"
        >
          Discard changes
        </Button>
        <Button
          variant="ghost"
          className="border h-10 w-1/2 text-black bg-blue-500
        transition-all ease-in-out
        text-white hover:ring-2 rounded-full"
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default EditTopBar;
