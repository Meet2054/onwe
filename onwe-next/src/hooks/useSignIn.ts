import { useState } from "react";

interface SignInParams {
  identity: string;
  password: string;
}

// const [token,setToken] = useState<string | null>(null)
export const useSignIn = () => {
  const create = async ({ identity, password }: SignInParams) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emailOrUsername: identity, password }),
        credentials: 'include',
      });

      if (response.status === 400) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };

  const signout = () => {
    localStorage.removeItem("onwetoken");
    localStorage.removeItem("onweusername");
  };

  const getToken = () => {
    return localStorage.getItem("onwetoken")||"";
  };

  const getUsername = () => {
    return localStorage.getItem("onweusername");
  };
  let user = {};

if (typeof window !== "undefined") { 
  user = {
    userName: localStorage.getItem("onweusername"),
    avatar: localStorage.getItem("onweAvatar") || "",
    updateAvatar: (url: string) => localStorage.setItem("onweAvatar", url),
    removeAvatar: () => localStorage.setItem("onweAvatar", ""),
  };
} else {
  // Fallback or default values if not in the browser environment
  user = {
    userName: "",
    avatar: "",
    updateAvatar: () => {},
    removeAvatar: () => {},
  };
}
  // if (localStorage) {
  //   user = {
  //     userName: localStorage.getItem("onweusername") || "",
  //     avatar: localStorage.getItem("onweAvatar") || "",
  //     updateAvatar: (url: string) => localStorage.setItem("onweAvatar", url),
  //     removeAvatar: () => localStorage.setItem("onweAvatar", ""),
  //   };
  // }
  return {
    signIn: { create },
    setActive: async ({
      usertoken,
      username,
      avatar,
    }: {
      usertoken: string;
      username: string;
      avatar: string;
    }) => {
      localStorage.setItem("onwetoken", usertoken);
      localStorage.setItem("onweusername", username);
      localStorage.setItem("onweAvatar", avatar);
    },
    getToken,
    getUsername,
    signout,
    user,
  };
};
