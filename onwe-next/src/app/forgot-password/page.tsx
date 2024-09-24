// pages/forgot-password.tsx
"use client";
import React, { useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/navigation";
import ForgotPasswordForm from "@/components/forgot-password/ForgotPasswordForm";
import Image from "next/image";
import back from "@/app/../../public/images/back.png";

const ForgotPasswordPage: NextPage = () => {
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const create = async (e: React.FormEvent, email: string) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/forgotPassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("error", errorData?.errors?.[0]?.longMessage);
        setError(errorData?.errors?.[0]?.longMessage || "An unknown error occurred");
        return;
      }
      setSuccessfulCreation(true);
      setError("");
    } catch (err) {
      console.error("Network error", err);
      setError("Failed to send request. Please try again later.");
    }
  };


  const reset = async (e: React.FormEvent, code: string, password: string) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reset-password`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          OTP: code,
          Password: password
        }),
      })
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("error", errorData?.errors?.[0]?.longMessage);
        setError(errorData?.errors?.[0]?.longMessage || "An unknown error occurred");
        return;
      }
      setError("")
      router.push("/sign-in")
    } catch (err) {
      console.error("Network error", err);
    setError("Failed to send request. Please try again later.");
    }
  };

  return (
    <div className="container min-h-screen relative flex items-center justify-center bg-gray-100">
      <Image
        
        src={back}
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="absolute z-0"
      />
      <div className="relative z-10">
        <ForgotPasswordForm
          create={create}
          reset={reset}
          successfulCreation={successfulCreation}
          error={error}
        />
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
