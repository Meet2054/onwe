import React, { useState} from "react";
import { globalFetcher } from "@/lib/utils";
import useSWR from "swr";
import Link from "next/link";
import FollowNoti from "./FollowNoti";
import LikeNoti from "./LikeNoti";
import CommentNoti from "./CommentNoti";

interface SearchCProps {
  setOpenNoti: (value: boolean) => void;
}

const Noti: React.FC<SearchCProps> = ({ setOpenNoti }) => {

  const { data: results, error, isLoading} = useSWR("/api/notifications");

  if(isLoading){
    return <div>Loading...</div>
  }

  return (
    <div className="bg-white h-full w-full border rounded-md flex flex-col">
      <div className="w-full h-20 flex items-center justify-center">
        <div className="flex flex-col justify-center p-1 h-[90%] w-[90%] space-y-8">
          <h1 className="text-2xl font-bold">Notifications</h1>
        </div>
      </div>
      <div className="w-full border h-full overflow-y-auto">
        { 
        isLoading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : (
            results?.map((item: any) => 
                item.follow ? (
                    <Link key={item.id} href={`/profile/${item.id}`}>
                      <a>
                        <FollowNoti details={item} />
                      </a>
                    </Link>
                  ) : item.like ? (
                    <Link key={item.id} href={`/post/${item.postId}`}>
                      <a>
                        <LikeNoti details={item} />
                      </a>
                    </Link>
                  ) : (
                    <Link key={item.id} href={`/post/${item.postId}`}>
                      <a>
                        <CommentNoti details={item} />
                      </a>
                    </Link>
                  )
              )
        )}
      </div>
    </div>
  );
};

export default Noti;