// app/page.tsx
"use client";
import LogoAnimation from "@/components/ui/Animations/LogoAnimation";
import { useSignIn } from "@/hooks/useSignIn";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState, AppDispatch } from '@/lib/store'

export default function Home() {
  // const token = useSelector((state: RootState) => state.auth.token);

  const router = useRouter();
  
  const { getToken, signout } = useSignIn()
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(getToken());
  }, [getToken, signout]);

  if(token){
    router.replace('/home')
  }
  else{
    router.replace('/sign-in')
  }

  return (
    <div className="text-center flex flex-col justify-center gap-4 content-center h-screen items-center bg-white">
      <div><LogoAnimation /></div>

      <h1 className="text-2xl mt-4">Hello!</h1>
      
      <div className="flex align-center justify-center">
        {token==null ? (
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
          
            {token && <div onClick={()=>{ 
              signout()
              router.push('/sign-in')
            }}
            className="px-3 py-2 mb-6 text-xl font-light text-white hover:text-blue-900 hover:bg-white bg-slate-700 rounded-md"
            >Sign-out</div>}
          </>
        )}
          </div>
      </div>
      );
}
