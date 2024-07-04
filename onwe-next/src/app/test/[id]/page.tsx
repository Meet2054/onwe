"use client";
import React, { useEffect } from "react";

const Page = ({ params }: { params: { id: string } }) => {
  useEffect(() => {
    throw new Error("This is an error");
  }, []);
  return <div>{params.id}</div>;
};

export default Page;
