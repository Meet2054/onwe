// components/ForgotPasswordForm.tsx
import React, { useState } from "react";
import logo from "@/../public/images/onwelogo.svg";
import Image from "next/image";
interface ForgotPasswordFormProps {
  create: (e: React.FormEvent, email: string) => void;
  reset: (e: React.FormEvent, code: string, password: string) => void;
  successfulCreation: boolean;
  error: string;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  create,
  reset,
  successfulCreation,
  error,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!successfulCreation) {
      create(e, email);
    } else {
      reset(e, code, password);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 lg:gap-4 w-full max-w-md bg-white bg-opacity-40 p-8 rounded-xl shadow-lg"
    >
      <div className="flex justify-center lg:mb-4">
        <Image src={logo} alt="Logo" className="lg:w-[150px] w-[110px]" />
      </div>
      {!successfulCreation && (
        <>
          <label htmlFor="email" className="text-sm font-medium lg:text-lg">
            Please provide your email address
          </label>
          <input
            type="email"
            placeholder="e.g john@doe.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-1 border rounded text-sm lg:text-md lg:p-2 "
          />
          <button
            type="submit"
            className="bg-black text-white lg:p-2 rounded p-1 text-sm lg:text-md"
          >
            Send password reset code
          </button>
        </>
      )}

      {successfulCreation && (
        <>
          <label htmlFor="password" className="text-lg font-medium">
            Enter your new password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border rounded"
          />
          <label htmlFor="code" className="text-lg font-medium">
            Enter the password reset code that was sent to your email
          </label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="p-2 border rounded"
          />
          <button type="submit" className="bg-black text-white p-2 rounded">
            Reset
          </button>
        </>
      )}

      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default ForgotPasswordForm;
