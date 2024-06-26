"use client";
import React from "react";
import { useParams } from "next/navigation";

const Page = () => {
  const { club } = useParams();

  return <div className="">{club}</div>;
};

export default Page;
