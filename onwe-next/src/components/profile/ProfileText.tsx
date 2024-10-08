"use client";
import { PostsProps } from "@/types/type";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setPost } from "@/lib/features/posts/postSlice";
import { Skeleton } from "../ui/skeleton";
import { EllipsisVertical, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import LikeComment from "../post_component/LikeComment";
import Description from "../post_component/Description";


const ProfileText = ({ posts }: { posts: PostsProps[] }) => {
  const [newPosts, setNewPosts] = useState<PostsProps[]>([]);
  const [expandedPostIds, setExpandedPostIds] = useState<Set<number>>(
    new Set()
  );
  const [showMoreButtonIds, setShowMoreButtonIds] = useState<Set<number>>(
    new Set()
  );
  const descriptionRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const dispatch = useDispatch();
  const pathName = usePathname();

  useEffect(() => {
    if (posts) {
      const tempPosts = posts.filter((post) => post.media.length === 0);
      setNewPosts(tempPosts);
    }
  }, [posts]);

  useEffect(() => {
    const updateShowMoreButtonIds = () => {
      const newShowMoreButtonIds = new Set<number>();
      Object.entries(descriptionRefs.current).forEach(([postId, ref]) => {
        if (ref) {
          const lineHeight = 20; // Example line-height in pixels, adjust based on your CSS
          const maxLines = 4;
          const maxHeight = lineHeight * maxLines;
          if (ref.scrollHeight > maxHeight) {
            newShowMoreButtonIds.add(Number(postId));
          }
        }
      });
      setShowMoreButtonIds(newShowMoreButtonIds);
    };

    // Update the "show more" button IDs when posts change or refs are updated
    updateShowMoreButtonIds();
  }, [newPosts]);

  if (!posts) return <ProfilePostSkeleton />;

  const handleClick = (post: PostsProps) => {
    dispatch(setPost(post));
  };

  const handleSettings = async (postId: number) => {
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}`);
    setNewPosts((prev) => prev.filter((post) => post.id !== postId));
  };

  const toggleDescription = (postId: number) => {
    setExpandedPostIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  return (
    <>
      <div className="flex flex-col gap-1 mt-5 h-max  ">
        {newPosts.length==0 ?<div className="p-3">No Texts </div>:newPosts.map((post) => (
          <div
            key={post.id}
            onClick={() => handleClick(post)}
            className="w-[85%] relative p-5 shadow rounded-xl"
          >
            {pathName == "/profile" && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <EllipsisVertical className="rotate-90 absolute right-2 top-0 opacity-30 hover:opacity-60" />
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

            <div
              ref={(el) => {
                descriptionRefs.current[post.id] = el;
              }}
              className={`${
                post.media.length !== 0
                  ? "inter font-[400] text-sm shadow p-2 pb-1 rounded-md normal-case relative"
                  : "inter normal-case relative bg-articles-card rounded-2xl shadow p-5 font-medium"
              } ${expandedPostIds.has(post.id) ? "" : "line-clamp-4"}`} // Apply line clamping only when not expanded
              style={{ display: "-webkit-box", WebkitBoxOrient: "vertical" }}
            >
              <Description des={post.description} />
              
              {showMoreButtonIds.has(post.id) && (
                <button
                  onClick={() => toggleDescription(post.id)}
                  className="absolute bottom-0 right-4 text-gray-500 text-sm font-semibold hover:underline ml-[92%] mt-0"
                >
                  {expandedPostIds.has(post.id) ? "...less" : "...more"}
                </button>
              )}
            </div>

            <div className="w-full ">
              <LikeComment post={post} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProfileText;

const ProfilePostSkeleton = () => {
  return (
    <div className="flex flex-col gap-1 h-full mt-5">
      <Skeleton className="h-[120px] w-[85%] animate-pulse" />
      <Skeleton className="h-[120px] w-[85%] animate-pulse" />
      <Skeleton className="h-[120px] w-[85%] animate-pulse" />
      <Skeleton className="h-[120px] w-[85%] animate-pulse" />
      <Skeleton className="h-[120px] w-[85%] animate-pulse" />
    </div>
  );
};
