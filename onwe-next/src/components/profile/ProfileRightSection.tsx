"use client";

import React, { useState } from "react";
import { PostsProps } from "@/types/type";
import ProfilePost from "./ProfilePost";
import ProfilePolls from "./ProfilePolls";
import ProfileText from "./ProfileText";

const ProfileRightSection = ({ posts }: { posts: PostsProps[] }) =>{

    const [selectedCategory, setSelectedCategory] = useState("Media")

    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category);
      };
    
    console.log(posts)

    return(
        <div>
        <div className="flex overflow-hidden flex-wrap  top-0 gap-1 items-center pt-2  w-full text-sm font-medium tracking-normal leading-5 text-center  border-black border-opacity-10 text-black text-opacity-90 max-md:max-w-full">
            {['Media', 'Texts', 'Polls', 'Articles'].map((category) => (
            <div
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`overflow-hidden sticky top-0 cursor-pointer gap-2.5 self-stretch px-3 my-auto text-sm font-bold tracking-normal border-b leading-none whitespace-nowrap min-h-[36px] ${
                selectedCategory === category ? 'text-black border-black' : 'text-gray-400 border-gray-400'
                }`}
            >
                {category} 
            </div>
            ))}
        </div>
       
        {selectedCategory === "Media" && (
                <ProfilePost posts={posts} />
            )}

            {selectedCategory === "Texts" && (    
                <ProfileText posts={posts} />
            )}

            {selectedCategory === "Polls" && (
                <ProfilePolls />
            )}
        
           
        

      
    </div>  
    )
}

export default ProfileRightSection