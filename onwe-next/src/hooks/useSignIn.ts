import { useState } from 'react';

interface SignInParams {
  identity: string;
  password: string;
}

// const [token,setToken] = useState<string | null>(null)
export const useSignIn = () => {
  const create = async ({ identity, password }: SignInParams) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emailOrUsername:identity, password }),
      });

      if (!response.ok) {
        throw new Error('Failed to sign in');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };

  const signout = ()=>{
    localStorage.removeItem('onwetoken')
    localStorage.removeItem('onweusername')
  }

  const getToken = () => {
    return localStorage.getItem("onwetoken");
  };
  
  const getUsername =  () => {

    return localStorage.getItem("onweusername");
  };

  return {
    signIn: { create },
    setActive: async ({ usertoken, username }: { usertoken: string, username:string }) => {
      localStorage.setItem('onwetoken', usertoken);
      localStorage.setItem('onweusername', username);
    },
    getToken,
    getUsername,
    signout
  };
};
