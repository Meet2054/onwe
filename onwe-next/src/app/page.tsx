// app/page.tsx
"use client";
import LogoAnimation from "@/components/ui/Animations/LogoAnimation";
import { UserButton,SignOutButton, useUser, useAuth} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState, AppDispatch } from '@/lib/store'

export default function Home() {
  // const token = useSelector((state: RootState) => state.auth.token);
  const { isSignedIn, user, isLoaded } = useUser();
  const router = useRouter();
  const { sessionId } = useAuth()


  // if (isSignedIn) {
  //   router.push('/home');
  // }
  return (
    <div className="text-center flex flex-col justify-center gap-4 content-center h-screen items-center bg-white">
      <div><LogoAnimation /></div>
      
      <h1 className="text-2xl mt-4">Hello!</h1>
      {isSignedIn && <h1 className="text-2xl">You are logged in!</h1>}
      <div className="flex align-center justify-center">
        {!isSignedIn ? (
          <div className="flex gap-2">
            <div className="px-3 py-2 mb-6 text-xl font-light text-white hover:text-blue-900 hover:bg-white bg-slate-700 rounded-md">
              <Link href="/sign-up" className="self-center">
                Signup
              </Link>
            </div>
            <div className="px-3 py-2 mb-6 text-xl font-light text-white hover:text-blue-900 hover:bg-white bg-slate-700 rounded-md">
              <Link href="/sign-in" className="self-center">
                Login
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* <UserButton afterSignOutUrl="/" /> */}
            {/* <h1 className="text-black">{token}</h1> */}
            {sessionId && <SignOutButton signOutOptions={{sessionId}}/>}
          </>
        )}
      </div>
    </div>
  );
}
