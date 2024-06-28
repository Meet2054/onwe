import React from "react";
import EditTopBar from "./EditTopBar";
import EditForm from "./EditForm";

const Edit = () => {
  return (
    <div className="w-[78%]">
      <div>
        <EditTopBar />
      </div>
      <div className="mt-12 w-full h-[100dvh]">
        <EditForm />
      </div>
    </div>
  );
};

export default Edit;
