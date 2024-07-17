"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RootState } from "@/lib/store";
import { UserProfile } from "@/types/type";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSelector } from "react-redux";
import { z } from "zod";

// interface EditFormProps {
//   fullname: string;
//   surName: string;
//   username: string;
//   bio: string;
//   links: string;
// }

const EditFormSchema = z.object({
  fullname: z.string(),
  username: z.string(),
  bio: z.string(),
  links: z.string(),
});

type EditFormProps = z.infer<typeof EditFormSchema>;

const EditRightForm = () => {
  const { getToken } = useAuth();
  const { user } = useSelector((state: RootState) => state.user);
  const [userInfo, setUserInfo] = useState<UserProfile | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditFormProps>();

  const onSubmit: SubmitHandler<EditFormProps> = async (data) => {
    console.log(data);
    try {
      console.log("starting axios");

      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/edit`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const addNewLink = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (user) {
      setUserInfo(user);
    }
  }, [user]);

  return (
    <div className="h-screen">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="h-10 flex gap-3 justify-end mb-10">
          <Button
            variant="ghost"
            className="border h-10  text-black rounded-full px-3"
          >
            Discard changes
          </Button>
          <Button
            type="submit"
            variant="ghost"
            className="border h-10 text-black bg-blue-500
        transition-all ease-in-out
        text-white hover:ring-2 rounded-full"
          >
            Save
          </Button>
        </div>
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-2">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="fullname">First name</Label>
              <Input
                {...register("fullname", {
                  required: "please enter first name",
                })}
                type="text"
                id="fullname"
                placeholder="full name"
                className="border-opacity-60 rounded-md"
              />
              {errors.fullname && (
                <span className="text-red-400">{errors.fullname.message}</span>
              )}
            </div>
            {/* <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="surName">Surname</Label>
              <Input
                {...register("surName")}
                type="text"
                id="surName"
                placeholder="surname"
                className="border-opacity-60 rounded-md"
              />
            </div> */}
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="username">username</Label>
            <Input
              {...register("username")}
              type="text"
              id="username"
              placeholder="username"
              className="border-opacity-60 rounded-md"
            />
          </div>
          <div className="grid items-center gap-1.5">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              {...register("bio")}
              id="bio"
              className="resize-none w-full"
              placeholder="Tell use about yourself"
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="links">links</Label>
            <Input
              {...register("links")}
              type="text"
              id="links"
              placeholder="add links"
              className="border-opacity-60 rounded-md"
            />
            <div className="flex grow">
              <Button
                onClick={addNewLink}
                className="hover:text-sky-300"
                variant="ghost"
              >
                + Add link
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditRightForm;
