// app/sign-in/[[...sign-in]]/page.tsx
"use client";
import Link from "next/link";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {useSignIn} from "@clerk/nextjs";
import SignInForm from "@/components/SignInForm";
import { useDispatch } from 'react-redux';
import { setToken } from '@/lib/features/auth/authSlice';
import { useAuth } from "@clerk/nextjs";


const Signin = () => {
  const {isLoaded, signIn, setActive} = useSignIn();
  const [clerkError, setClerkError] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const {getToken} = useAuth();

  const signInWithEmail = async ({
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
      const result = await signIn.create({
        identifier: emailAddress,
        password,
      });
      if (result.status === "complete") {
        console.log(result);
        await setActive({session: result.createdSessionId});
        getToken({ template: "test" }).then((token) => {
          console.log(token);
          dispatch(setToken(token!));
        });
        router.push("/home");
      } else {
        console.log(result);
      }
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2));
      setClerkError(err.errors[0].message);
    }
  };

  return (
    <SignInForm signInWithEmail={signInWithEmail} clerkError={clerkError} switchToSignup={function (): void {
      throw new Error("Function not implemented.");
    } } />
  );
};

export default Signin;
