import React from "react";
import EditLeftFrom from "./EditLeftFrom";
import EditRightForm from "./EditRightForm";

const EditForm = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between">
      <div className="w-[41%]">
        <EditLeftFrom />
      </div>
      <div className="w-[53%]">
        <EditRightForm />
      </div>
    </div>
  );
};

export default EditForm;
