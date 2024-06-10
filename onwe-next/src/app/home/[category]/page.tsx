"use client";
import { useParams } from "next/navigation";
import React from "react";

const page = () => {
  const { category } = useParams();

  return <div>{category}</div>;
};

export default page;
