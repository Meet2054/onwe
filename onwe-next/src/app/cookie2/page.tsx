"use client";
import axios from "axios";
import React, { useEffect } from "react";

const Page = () => {
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/test`,
        {
          withCredentials: true,
        }
      );
      if (data) {
        console.log(data);
      }
    };
    fetchData();
  }, []);
  return <div>Page</div>;
};

export default Page;
