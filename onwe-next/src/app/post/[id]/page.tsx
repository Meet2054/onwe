"use client";

import DiaglogComment from "@/components/post_component/Dialog_component/DiaglogComment";
import DialogBox from "@/components/post_component/Dialog_component/DialogBox";
import DialogImage from "@/components/post_component/Dialog_component/DialogImage";
import { useSignIn } from "@/hooks/useSignIn";
import { cn } from "@/lib/utils";
import { PostsProps } from "@/types/type";
import axios from "axios";
import { MessageSquare } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {

    const {getToken} = useSignIn();
    const postid =  useParams().id;
    const [post, setPost] = useState<PostsProps|null>(null)
    
    useEffect(() => {
        const getPost = async () => {
            try {
                const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts/${postid}`
                , {
                    headers: {
                        Authorization: `Bearer ${ getToken()}`,
                        "ngrok-skip-browser-warning": "69420",
                    },
                }
                );
                setPost(data as PostsProps)
                console.log(post)
            } catch (error) {
                console.log(error)
            }
        }
         getPost()
    }, [getToken,postid])


    return <div className="flex justify-center bg-white items-center text-black h-[80vh]">
           {post ? <div className="w-[40vh] h-[40vh]"><DialogBox post={post} imageUrl={post.media[0]}  description={post.description}/></div>:
            "No post found"
           }
           
            
    </div>;
};

export default Page;
