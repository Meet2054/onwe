import { Copy } from "lucide-react";
import React from "react";

const CopyButton = () => {
  return (
    <div className=" w-11 h-8 px-3 py-2 rounded-2xl border border-black/opacity-30 justify-center items-center gap-2.5 inline-flex">
      <Copy strokeWidth={1} className="w-5 h-5 " />
    </div>
  );
};

export default CopyButton;
