import { Copy } from "lucide-react";
import React from "react";

const CopyButton = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 20.5V12.5652C3 9.80379 5.23858 7.56522 8 7.56522H21M21 7.56522L15.4138 3M21 7.56522L15.4138 12.1304"
        stroke="black"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default CopyButton;
