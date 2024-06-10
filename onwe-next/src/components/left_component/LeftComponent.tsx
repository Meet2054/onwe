import React from "react";
import Logo from "./Logo";
import Trending from "./Trending";
import Myclubs from "./MyClubs";
import Announce from "./Announce";
import Lprofile from "./Lprofile";

const Leftcomponent = () => {
  return (
    <div className="col-span-2 lg:col-span-2 p-2 w-[250px]">
      <Logo />
      <Trending />
      <Myclubs />
      <Announce />
      <Lprofile />
    </div>
  );
};

export default Leftcomponent;
