"use client";
import axios from "axios";
import React, { useEffect } from "react";
import useSWR from "swr";

const fetcher = async (url) => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    withCredentials: true,
  });
  return data;
};

const Page = () => {
  const { data } = useSWR("/cookie", fetcher, {
    onSuccess: (data) => {
      console.log(data);
    },
  });
  return <div>{JSON.stringify(data)}</div>;
};

export default Page;
