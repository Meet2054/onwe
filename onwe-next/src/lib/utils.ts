import axios from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getData = async (url: string, body: {}, token: string) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}${url}`,
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "*/*",
        "ngrok-skip-browser-warning": "69420",
      },
    }
  );

  return res.data;
};
