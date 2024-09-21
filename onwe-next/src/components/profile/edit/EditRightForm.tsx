"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSignIn } from "@/hooks/useSignIn";
import { RootState } from "@/lib/store";
import { UserProfile } from "@/types/type";
import axios from "axios";
import { Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "sonner";
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
  const { getToken } = useSignIn();
  const { user } = useSelector((state: RootState) => state.user);
  const [userInfo, setUserInfo] = useState<UserProfile | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [linksArr, setLinksArr] = useState<string[] | []>([]);
  const [linkInput, setLinkInput] = useState<string>("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditFormProps>({
    defaultValues: {
      fullname: user?.user.fullname,
      bio: user?.user.bio,
    },
  });

  const onSubmit: SubmitHandler<EditFormProps> = async (data) => {
    setIsSaving(true);
    const newData = { ...data, links: linksArr };

    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/edit?isavatar=false`,
        newData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${ getToken()}`,
          },
        }
      );
      toast.success("saved successfully");
    } catch (error) {
      console.log(error);
    }
    setIsSaving(false);
  };

  const addNewLink = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (linkInput === "") return;
    setLinksArr((prev) => [...prev, linkInput]);
    setLinkInput("");
  };

  useEffect(() => {
    if (user) {
      // console.log(user);
      setLinksArr(user.user.links);

      setUserInfo(user);
    }
  }, [user]);

  return (
    <div className="h-screen mb-20 mt-5 ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col-reverse w-full "
      >
        <div className="mt-4 mr-1">
          <div className="h-10 flex gap-3 justify-end mb-10 ">
            <Button
              variant="ghost"
              className="border h-10  text-black rounded-lg px-3"
            >
              Discard changes
            </Button>
            <Button
              disabled={isSaving}
              type="submit"
              variant="ghost"
              className="border h-10 text-black bg-blue-500
                       transition-all ease-in-out
                     text-white hover:ring-2 rounded-lg"
            >
              Save
            </Button>
          </div>
        </div>
        <div>
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1  sm:grid-cols-2  gap-2">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="fullname">Full Name</Label>
                <Input
                  {...register("fullname")}
                  type="text"
                  id="fullname"
                  placeholder="full name"
                  className="border-opacity-60 rounded-md"
                />
                {errors.fullname && (
                  <span className="text-red-400">
                    {errors.fullname.message}
                  </span>
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
            {/* <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="username">username</Label>
            <Input
              {...register("username")}
              type="text"
              id="username"
              placeholder="username"
              className="border-opacity-60 rounded-md"
            />
          </div> */}
            <div className="grid items-center gap-1.5">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                {...register("bio")}
                id="bio"
                className="resize-none w-full"
                placeholder="Tell us about yourself"
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="links">Links</Label>
              <div className="flex gap-2 justify-center items-center ">
                {/* <div className=" flex justify-center items-center text-muted-foreground ">
                  https://
                </div> */}
                <Input
                  value={linkInput}
                  onChange={(e) => setLinkInput(e.target.value)}
                  type="text"
                  id="links"
                  placeholder="add links"
                  className="border-opacity-60 "
                />
                <Button
                  onClick={addNewLink}
                  className="hover:text-sky-300"
                  variant="ghost"
                >
                  + Add link
                </Button>
              </div>
              {/* <div className="flex grow absolute right-12">
                <Button
                  onClick={addNewLink}
                  className="hover:text-sky-300"
                  variant="ghost"
                >
                  + Add link
                </Button>
              </div> */}
              <div className="flex flex-col gap-3">
                {linksArr &&
                  linksArr.map((link, index) => (
                    <div
                      className="h-10 border flex items-center p-4 rounded-md hover:bg-slate-100 hover:border-black justify-between"
                      key={index}
                    >
                      <span>{link}</span>
                      <div
                        onClick={() =>
                          setLinksArr((prev) =>
                            prev.filter((_, i) => i !== index)
                          )
                        }
                        className="opacity-40 hover:opacity-100"
                      >
                        <Trash2 strokeWidth={1} stroke="red" />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditRightForm;
