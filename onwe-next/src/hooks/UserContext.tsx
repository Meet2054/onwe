"use client";
import React, { createContext, ReactNode, useContext, useEffect } from "react";
import useSWR from "swr";
import { useRouter } from "next/navigation";

interface User {
  username: string;
  avatar: string;
  bio: string;
  email: string;
  fullname: string;
  links: string[];
}

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { data: user, error, isLoading } = useSWR("/user/info");

  useEffect(() => {
    if (error) {
      // Redirect to login page if there's an error
      router.push("/sign-in");
    }
  }, [error]);

  const value = { user: user ?? null, isLoading, error: error ?? null };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

export default UserProvider;
