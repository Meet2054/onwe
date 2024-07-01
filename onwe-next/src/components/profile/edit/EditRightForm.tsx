import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

const EditRightForm = () => {
  return (
    <div className="h-[100vh] flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-2">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="firstName">First name</Label>
          <Input
            type="text"
            id="firstName"
            placeholder="first name"
            className="border-opacity-20 rounded-md"
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="surName">Surname</Label>
          <Input
            type="text"
            id="surName"
            placeholder="surname"
            className="border-opacity-20 rounded-md"
          />
        </div>
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="username">username</Label>
        <Input
          type="text"
          id="username"
          placeholder="username"
          className="border-opacity-20 rounded-md"
        />
      </div>
      <div className="grid items-center gap-1.5">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          className="resize-none w-full"
          placeholder="Tell use about yourself"
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="links">links</Label>
        <Input
          type="text"
          id="links"
          placeholder="add links"
          className="border-opacity-20 rounded-md"
        />
      </div>
    </div>
  );
};

export default EditRightForm;
