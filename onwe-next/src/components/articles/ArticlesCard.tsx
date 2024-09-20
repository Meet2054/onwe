import React from "react";

interface ArticleCardProps {
  media: string[]; // Array containing 2 base64 images and 1 base64 PDF
  author: string;
  time: string;
  date: string;
  title: string;
  content: string;
  category: string;
  avatar: string;
  coverImage: string;
  onClick: () => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ author, time, title, content, media, onClick, coverImage , avatar}) => {
  // Extract the first two base64 images and the third PDF string
  const [image1, image2, pdf] = media;
  const image1Url = coverImage

  return (
    <div className="flex flex-col grow shrink p-5 cursor-pointer overflow-auto scrollbar-custom rounded-md bg-gray-100 max-h-[222px] max-w-[440px] max-md:px-5"
      onClick={onClick} >
      <div className="flex gap-3 justify-center items-center w-full font-medium whitespace-nowrap">
        <img
          loading="lazy"
          src={`data:image/*;base64,${avatar}`}
          className="object-cover shrink-0 self-stretch my-auto w-8 rounded-full aspect-square"
          alt={`${author}'s avatar`}
        />
        <div className="flex gap-1 items-start self-stretch my-auto w-full">
          <div className="text-base font-bold hover:text-custom-brown">{author}</div>
          <div className="text-sm p-[2px]">{time}</div>
        </div>
      </div>
      <div className="flex justify-center items-start break-words whitespace-normal gap-3 mt-2 w-full">
        <div className="flex flex-col justify-start self-stretch my-auto min-w-[240px] w-[261px]">
          <div className="text-2xl font-bold">{title}</div>
          <div className="text-base">{content}</div>
        </div>
        <div className='overflow-hidden flex-shrink-0'>
          <img loading="lazy" src={`data:image/*;base64,${coverImage}`} className="object-fill self-stretch my-auto rounded  aspect-[0.79] w-[111px]" alt="Article thumbnail" />
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
