"use client";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useSignUp } from "@clerk/nextjs";
import Image from "next/image";
import back from "@/app/../../public/images/back.png";
import logo from "@app/../../public/images/onwelogo.svg";
import rightArrow from "@app/../../public/images/right-arrow.png";

const Signup = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [clerkError, setClerkError] = useState("");
  const router = useRouter();
  const [verifying, setVerifying] = useState(false);
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUpWithEmail = async ({
    emailAddress,
    password,
  }: {
    emailAddress: string;
    password: string;
  }) => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress,
        password,
      });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setVerifying(true);
    } catch (err: any) {
      setClerkError(err.errors[0].message);
    }
  };

  const handleVerify = async (e: FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (completeSignUp.status !== "complete") {
        console.log(JSON.stringify(completeSignUp, null, 2));
        setClerkError("Verification not complete. Please check the code and try again.");
      }

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/home");
      }
    } catch (err) {
      console.log("Error:", JSON.stringify(err, null, 2));
    }
  };
 
  return (
    <div className="relative flex items-center justify-center h-screen bg-gray-100">
      <Image
        src={back}
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="absolute z-0"
      />
      <div className="relative z-10 p-6 bg-white bg-opacity-50 rounded-2xl shadow-lg w-full max-w-md">
        <form onSubmit={!verifying ? (e) => {
            e.preventDefault();
            signUpWithEmail({ emailAddress: email, password });
          } : handleVerify} className="space-y-6">
          <div className="flex justify-center mb-4">
            <Image src={logo} alt="Logo" width={150} height={150} />
          </div>
          <span className="block text-center text-2xl font-semibold">Welcome onboard!</span>
          {!verifying ? (
            <>
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="border-b-2 my-4"></div>
              <div className="space-y-4">
                <input
                  type="password"
                  placeholder="Create Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="border-b-2 my-4"></div>
              <div
                className="cursor-pointer text-center py-2 border rounded-xl bg-white"
                onClick={() => signUpWithEmail({ emailAddress: email, password })}
              >
                Get Code
              </div>
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="Enter Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="w-full flex items-center justify-center px-4 py-2 bg-black text-white border rounded-xl"
              >
                <span>Next</span>
                <Image src={rightArrow} alt="Right Arrow" width={20} height={20} />
              </button>
            </>
          )}
          {clerkError && (
            <div className="text-red-500 text-center">{clerkError}</div>
          )}
          <span
            onClick={() => router.push("/sign-in")}
            className="block text-center text-red-500 cursor-pointer"
          >
            I have an account
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
