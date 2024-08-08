import React from "react";
import EditLeftFrom from "./EditLeftFrom";
import EditRightForm from "./EditRightForm";

const EditForm = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start h-screen overflow-auto sm:overflow-hidden p-3">
      <div className="w-full sm:w-[41%] h-max">
        <EditLeftFrom />
      </div>
      <div className="w-full sm:w-[53%]">
        <EditRightForm />
      </div>
    </div>
  );
};

export default EditForm;
