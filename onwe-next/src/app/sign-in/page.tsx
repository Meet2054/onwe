// app/sign-in/[[...sign-in]]/page.tsx
"use client";
import Link from "next/link";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {useSignIn} from "@/hooks/useSignIn";
import SignInForm from "@/components/SignInForm";
import { useDispatch } from 'react-redux';
import { setToken } from '@/lib/features/auth/authSlice';
import Page from "../landingpage/page";


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
        await setActive({usertoken: result.token, username:result.username, avatar:result.avatar});
        router.push("/home");
      } else {
      }
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2));
      setError(err.message);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
     
      <div className="absolute inset-0 z-0 overflow-auto">
        <Page />
      </div>

      
      <div className="fixed absolute right-10  z-10 flex items-center justify-center bg-white bg-opacity-0 max-w-lg">
        <SignInForm
          signInWithEmail={signInWithEmail}
          clerkError={error}
          switchToSignup={() => {
            // Add your signup logic here
            console.log("Switch to Signup");
          }}
        />
      </div>
    </div>
    
  );
};

export default Signin;
