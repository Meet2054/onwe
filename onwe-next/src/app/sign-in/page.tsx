// app/sign-in/[[...sign-in]]/page.tsx
"use client";
import Link from "next/link";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {useSignIn} from "@/hooks/useSignIn";
import SignInForm from "@/components/SignInForm";
import { useDispatch } from 'react-redux';
import { setToken } from '@/lib/features/auth/authSlice';


const Signin = () => {
  const {signIn, setActive} = useSignIn();
  const [error, setError] = useState("");
  const router = useRouter();


  const signInWithEmail = async ({
    emailAddress,
    password,
  }: {
    emailAddress: string;
    password: string;
  }) => {
    try {
      const result = await signIn.create({
        identity: emailAddress ,
        password,
      });
      if (result.status === "complete") {
        await setActive({usertoken: result.token, username:result.username});
        router.push("/home");
      } else {
      }
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2));
      setError(err.message);
    }
  };

  return (
    <SignInForm signInWithEmail={signInWithEmail} clerkError={error} switchToSignup={function (): void {
      throw new Error("Function not implemented.");
    } } />
  );
};

export default Signin;
