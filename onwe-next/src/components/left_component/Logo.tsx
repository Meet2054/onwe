import React from "react";
import Image from "next/image";
const Logo = () => {
  return (
    <div>
      <Image  src="/images/onwelogo.svg" alt="logo" width={200} height={100} />
    </div>
  );
};

export default Logo;
