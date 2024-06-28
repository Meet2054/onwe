"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { GetTokenOptions } from "@clerk/types";

const getData = async (
  getToken: (options?: GetTokenOptions) => Promise<string | null>
) => {
  const token = await getToken({ template: "test" });
  const res = await axios.get("http://localhost:3000", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

const Page = () => {
  const { getToken } = useAuth();

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData(getToken);
      setData(data);
    };

    fetchData();
  }, [getToken]);

  return (
    <div>
      Page
      {data && <div></div>}
    </div>
  );
};

export default Page;
