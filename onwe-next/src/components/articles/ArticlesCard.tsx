"use client"

import React from "react";



interface ArticleCardProps {
    author: string;
    time: string;
    date: string;
    title: string;
    content: string;
    imageUrl: string;
    category: string;
    onClick: () => void;
  }

const ArticleCard: React.FC<ArticleCardProps> = ({ author, time, title, content, imageUrl, onClick }) => (
    <div className="flex flex-col grow shrink p-5 cursor-pointer overflow-auto scrollbar-custom rounded-md bg-gray-100 max-h-[222px] max-w-[440px] max-md:px-5"
    onClick={onClick} >
      <div className="flex gap-3 justify-center items-center w-full font-medium whitespace-nowrap">
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/c043ab72ee954c5418f45468e5bf5d384965c4c6ceacf7798085e921a161f778?placeholderIfAbsent=true&apiKey=fa090b16b04649b4a5024c30e95337f0" className="object-contain shrink-0 self-stretch my-auto w-7 rounded-2xl aspect-square" alt={`${author}'s avatar`} />
        <div className="flex gap-1 items-start self-stretch my-auto w-full">
          <div className="text-base">{author}</div>
          <div className="text-sm p-[2px]">{time}</div>
        </div>
      </div>
      <div className="flex justify-center items-start break-words whitespace-normal gap-3  mt-2 w-full">
        <div className="flex flex-col justify-start  self-stretch my-auto min-w-[240px] w-[261px]">
          <div className="text-2xl font-bold">{title}</div>
          <div className="text-base">{content}</div>
        </div>
        <div className='overflow-hidden flex-shrink-0'>
          <img loading="lazy" src={imageUrl} className="object-contain self-stretch my-auto rounded  aspect-[0.79] w-[104px]" alt="Article thumbnail" />
        </div>
      </div>
    </div>
  );

  export default ArticleCard