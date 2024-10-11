"use client";
import React, { createContext, ReactNode, useContext, useState } from "react";
import useSWR from "swr";

interface User {
  username: string;
  avatar: string;
  bio: string;
  email: string;
  fullname: string;
  links: string[];
}

const UserContext = createContext<User | undefined>(undefined);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  useSWR("/user/info", {
    onSuccess: (data) => {
      setUser(data.user);
    },
  });

  if (user) {
    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
  }
};

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
export default UserProvider;
