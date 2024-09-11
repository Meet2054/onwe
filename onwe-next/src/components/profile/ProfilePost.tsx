"use client";
import { PostsProps } from "@/types/type";
import React, { useEffect, useState } from "react";
import DialogBox from "../post_component/Dialog_component/DialogBox";
import { useDispatch } from "react-redux";
import { setPost } from "@/lib/features/posts/postSlice";
import { Skeleton } from "../ui/skeleton";
import { EllipsisVertical, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import axios from "axios";
import { usePathname } from "next/navigation";

const ProfilePost = ({ posts }: { posts: PostsProps[] }) => {
  const [newPosts, setNewPosts] = useState<PostsProps[] | []>([]);
  const dispatch = useDispatch();
  const handleClick = (post: PostsProps) => {
    dispatch(setPost(post));
  };
  const pathName = usePathname();

  useEffect(() => {
    if (posts) {
      const tempPosts = posts.filter((post) => post.media.length > 0);
      setNewPosts(tempPosts);
    }
  }, [posts]);

  if (!posts) return <ProfilePostSkeleton />;

  const handleSettings = async (postId: Number) => {
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}`);

    setNewPosts((prev) => prev.filter((post) => post.id !== postId));
  };

  // console.log(posts, "hi")
  return (
    <div className=" flex grid md:grid-cols-3 grid-cols-2  gap-1 mt-10 h-max w-full ">
      {newPosts !== null &&
        newPosts.map((post) => (
          <div
            key={post.id}
            onClick={() => {
              handleClick(post);
            }}
            className="w-full h-52 relative"
          >
            <>
              {pathName == "/profile" && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <EllipsisVertical className="z-10 right-1 absolute text-white opacity-35 top-2 hover:opacity-100" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-56 border-2 "
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <AlertDialog
                        onOpenChange={() => {
                          console.log("open change");
                        }}
                      >
                        <AlertDialogTrigger className="w-full text-start flex gap-3 justify-start items-center">
                          <Trash size={16} stroke="red" /> <span>Delete</span>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action will delete this post
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleSettings(post.id)}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              <DialogBox post={post} imageUrl={post.media[0]} />
            </>
          </div>
        ))}
    </div>
  );
};

export default ProfilePost;

const ProfilePostSkeleton = () => {
  return (
    <div className=" flex grid grid-cols-3 border gap-1 h-[95dvh]">
      <Skeleton className="h-52 w-full animate-pulse" />
      <Skeleton className="h-52 w-full animate-pulse" />
      <Skeleton className="h-52 w-full animate-pulse" />
      <Skeleton className="h-52 w-full animate-pulse" />
      <Skeleton className="h-52 w-full animate-pulse" />
      <Skeleton className="h-52 w-full animate-pulse" />
      <Skeleton className="h-52 w-full animate-pulse" />
      <Skeleton className="h-52 w-full animate-pulse" />
      <Skeleton className="h-52 w-full animate-pulse" />
      {/* <Skeleton className="h-52 w-full animate-pulse" /> */}
    </div>
  );
};
