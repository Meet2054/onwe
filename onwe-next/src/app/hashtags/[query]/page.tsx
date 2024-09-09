'use client'
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation';
import axios from 'axios';
import { useAuth } from "@clerk/nextjs";
import useSWR from "swr";
import { useDispatch } from "react-redux";
import { setPost } from "@/lib/features/posts/postSlice";
import DialogBox from '@/components/post_component/Dialog_component/DialogBox';


interface Post {
    id: string;
    media: string[];
}
const fetcher = async (url: string, token: string) => {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "69420",
      },
    });
    return response.data;
  };
  

const Page = () => {
    const path = usePathname();
    const [result,setresults] = useState<Post[]>();
    const query = path.split('/').pop();
    const [token, setToken] = useState<string | null>(null);
    const { getToken } = useAuth();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchToken = async () => {
          const fetchedToken = await getToken({ template: "test" });
          setToken(fetchedToken);
        };
        fetchToken();
      }, [getToken]);
      const { data, error } = useSWR(
        token ? `${process.env.NEXT_PUBLIC_API_URL}/top-posts` : null,
        (url) => fetcher(url, token!)
      );
      useEffect(() => {
        if (data) {
          setresults(data);
        }
      }, [data]);

      const handleClick = (post: any) => {
        dispatch(setPost(post));
      };

  return (
    <div className="w-full h-screen sm:p-4 bg-white">
    <div className="px-5 flex flex-col">
        <div className='h-20 w-full flex justify-between'>
            <div className='h-[70%] ml-[5%] p-2 mt-2'>
                <p className='text-2xl'>#together</p>
            </div>
            <div className='h-[60%]  mr-[5%] p-2 mt-2'>
                <p>2504 Posts</p>
            </div>
        </div>
      <div className="gap-1 grid grid-cols-3 sm:grid-cols-4">
        {result?.map((post) => (
          <div onClick={() => handleClick(post)} key={post.id} className="h-80">
            <DialogBox className={""} imageUrl={post.media[0]} post={post} />
          </div>
          // <Post key={inex} post={post} />
        ))}
      </div>
    </div>
  </div>
  )
}

export default Page
