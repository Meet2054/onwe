"use client";
import React from "react";
import EditLeftFrom from "./EditLeftFrom";
import EditRightForm from "./EditRightForm";
import useSWR from "swr";
import { useDispatch } from "react-redux";
import { setUser } from "@/lib/features/user/userSlice";
import axios from "axios";

const fetcher = async (url: string) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}${url}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("onwetoken")}`,
      },
    }
  );
  return data;
};
const EditForm = () => {
  const dispatch = useDispatch();
  const { data } = useSWR("/user/info", fetcher, {
    onSuccess: (data) => {
      dispatch(setUser(data));
    },
  });

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start h-screen overflow-auto sm:overflow-hidden p-3">
      <div className="w-full sm:w-[41%] h-max">
        <EditLeftFrom />
      </div>
      <div className="w-full sm:w-[53%]">
        <EditRightForm />
      </div>
    </div>
  );
};

export default EditForm;
