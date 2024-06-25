"use client";
import React from "react";
import { useParams } from "next/navigation";

const Page = () => {
  console.log(useParams());

  const { club } = useParams();
  console.log(club);

  return <div>{club}</div>;
};

export default Page;
