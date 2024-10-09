import axios from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useSignIn } from "@/hooks/useSignIn";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// export const getData = async (url: string, body: {}, token: string) => {
//   const res = await axios.post(
//     `${process.env.NEXT_PUBLIC_API_URL}${url}`,
//     body,
// {
//   headers: {
//     Authorization: `Bearer ${token}`,
//     "Content-Type": "application/json",
//     Accept: "*/*",
//     "ngrok-skip-browser-warning": "69420",
//   },
// }
//   );

//   return res.data;
// };

export const getData = async (
  url: string,
  body: any = {},
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" = "GET"
) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { getToken } = useSignIn();
  try {
    const res = await axios({
      method: method,
      url: `${process.env.NEXT_PUBLIC_API_URL}${url}`,
      data: method !== "GET" ? body : undefined, // GET requests should not have a body
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
        Accept: "*/*",
        "ngrok-skip-browser-warning": "69420",
      },
      withCredentials: true,
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const base64Prefix = "data:image/png;base64,";

export const checkVidImg = (imgUrl: string): number => {
  if (imgUrl?.includes("image")) {
    return 0; // It's an image
  } else if (imgUrl?.includes("video")) {
    return 1; // It's a video
  }
  return -1; // Invalid or unsupported URL format
};

export const extractHashTags = (text: string) => {
  const hashRegex = /#\w+/g;
  const hashTags = text.match(hashRegex);
  return hashTags ? hashTags.join(" ") : "";
};

export const extractTags = (text: string) => {};

export const globalFetcher = async (url: string) => {
  const { data } = await axios.get(process.env.NEXT_PUBLIC_API_URL + url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("onwetoken")}`,
    },
    withCredentials: true,
  });

  return data;
};
