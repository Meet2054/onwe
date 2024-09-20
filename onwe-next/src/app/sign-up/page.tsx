"use client";
import Link from "next/link";
import { FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSignUp } from "@/hooks/useSignUp";
import Image from "next/image";
import back from "@/app/../../public/images/back.png";
import logo from "@app/../../public/images/onwelogo.svg";
import rightArrow from "@app/../../public/images/right-arrow.png";

const Signup = () => {
  const { signUp } = useSignUp();
  const [error, setError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);
  const router = useRouter();
  const [verifying, setVerifying] = useState(false);
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);

  const signUpWithEmail = async ({
    emailAddress,
    password,
    username,
  }: {
    emailAddress: string;
    password: string;
    username: string;
  }) => {
    try {
      await signUp.create({
        emailAddress,
        password,
        username,
      });
      setVerifying(true);
    } catch (err: any) {
      console.error("Sign up error:", err);
      setError(
         "An unexpected error occurred. Please try again."
      );
    }
  };

  const handleVerify = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
        emailAddress: email,
      });

      if (completeSignUp.status !== "complete") {
        setError(
          "Verification not complete. Please check the code and try again."
        );
        return;
      }
      router.push("/sign-in");
    } catch (err) {
      console.error("Verification error:", err);
      setError("Verification failed. Please try again.");
    }
  };

  const checkUsernameAvailability = async (username: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/search/username/${username}`);
      const data = await response.json();
      if (data) {
        setIsUsernameAvailable(false);
        setUsernameError("Username is already taken.");
      } else {
        setIsUsernameAvailable(true);
        setUsernameError(""); // Clear any error if the username is available
      }
    } catch (err) {
      console.error("Username check error:", err);
      setUsernameError("Error checking username availability.");
    }
  };

  useEffect(() => {
    if (username.length >= 3) {
      if (typingTimeout) clearTimeout(typingTimeout);

      const timeout = setTimeout(() => {
        checkUsernameAvailability(username);
      }, 200); // Delay of 0.2 seconds

      setTypingTimeout(timeout);
    }
  }, [username]);

  return (
    <div className="container relative flex items-center justify-center h-screen bg-gray-100">
      <Image
        src={back}
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="absolute z-0"
      />
      <div className="relative z-10 p-6 bg-white bg-opacity-50 rounded-2xl shadow-lg w-full max-w-md">
        <form
          onSubmit={
            !verifying
              ? (e) => {
                  e.preventDefault();
                  signUpWithEmail({ emailAddress: email, password, username });
                }
              : handleVerify
          }
          className="space-y-4 lg:space-y-6"
        >
          <div className="flex justify-center lg:mb-4">
            <Image src={logo} alt="Logo" className="lg:w-[150px] w-[110px]" />
          </div>
          <span className="block text-center lg:text-2xl font-semibold md:text-sm ">
            Welcome onboard!
          </span>
          {!verifying ? (
            <>
              <div className="space-y-4">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => {
                  const value = e.target.value;
                  // Only allow valid characters (letters, numbers, and underscores) and check length >= 3
                  if (/^[a-zA-Z0-9_]*$/.test(value)) {
                    setUsername(value);
                  }
                }}
                className="w-full px-3 md:py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm py-1"
                required
              />
              {username.length < 3 && username !== "" && (
                <div className="text-red-500 text-sm">
                  Username must be at least 3 characters long.
                </div>
              )}
                {usernameError && (
                  <div className="text-red-500 text-sm">{usernameError}</div>
                )}
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 md:py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm py-1"
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
                  className="w-full px-3 md:py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm py-1"
                  required
                />
              </div>
              <div className="border-b-2 my-4"></div>
              <div
                className={`cursor-pointer text-center md:py-2 border rounded-xl bg-white text-sm lg:text-md py-1 w-full lg:w-full ${
                  !isUsernameAvailable ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() =>
                  isUsernameAvailable
                    ? signUpWithEmail({ emailAddress: email, password, username })
                    : null
                }
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
                <Image
                  src={rightArrow}
                  alt="Right Arrow"
                  width={20}
                  height={20}
                />
              </button>
            </>
          )}
          {error && <div className="text-red-500 text-center">{error}</div>}
          <span
            onClick={() => router.push("/sign-in")}
            className="block text-center text-red-500 cursor-pointer lg:text-md text-sm"
          >
            I have an account
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
