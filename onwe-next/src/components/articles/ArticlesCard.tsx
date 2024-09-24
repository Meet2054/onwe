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

const ArticleCard: React.FC<ArticleCardProps> = ({
  author,
  time,
  title,
  content,
  media,
  onClick,
  coverImage,
  avatar,
}) => {
  return (
    <div
      className="flex flex-col p-5  cursor-pointer bg-gray-100 rounded-md shadow-md hover:shadow-lg transition-shadow duration-200 h-[260px]" // Fixed height
      onClick={onClick}
    >
      <div className="flex gap-3 items-center ">
        <img
          loading="lazy"
          src={avatar}
          className="w-10 h-10 rounded-full object-cover"
          alt="Author Avatar"
        />
        <div className="flex flex-col">
          <div className="text-base font-bold hover:text-custom-brown">{author}</div>
          <div className="text-sm text-gray-500">{time}</div>
        </div>
      </div>
      <div className="flex flex-col justify-between h-full mt-3"> {/* Make it fill the height */}
        <div className="flex flex-grow">
          <div className="flex flex-col flex-grow">
            <div className="text-2xl font-bold text-gray-800">{title}</div>
            <div className="text-base text-gray-700 line-clamp-3 pb-1">{content}</div> {/* Limit the number of lines */}
          </div>
          <div className='overflow-hidden flex-shrink-0'>
            <img
              loading="lazy"
              src={coverImage}
              className="w-[120px] h-auto rounded-lg object-cover"
              alt="Article Thumbnail"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
