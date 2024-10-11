import React, { useEffect, useState } from 'react';
import axios from "axios";
import useSWR from "swr";
import Right1Article from './Right1Artcle';
import ArticleView from '@/components/articles/ArticlesView';
import { useSignIn } from '@/hooks/useSignIn';

interface ArticleCardProps {
  owner: string;
  time: string;
  media: string[];
  createdAt: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  avatar: string;
  coverphoto: string;
  onClick: () => void;
}

const fetcher = async ([url, token]: [string, string]) => {
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "69420",
    },
  });
  return response.data;
};

const RightArticles = () => {
  const [selectedArticle, setSelectedArticle] = useState<ArticleCardProps | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(3); 
  const { getToken } = useSignIn();
  const [token, setToken] = useState<string | null>(null);

  const handleBackToArticles = () => {
    setSelectedArticle(null);
  };

  const handleArticleClick = (article: ArticleCardProps) => {
    setSelectedArticle(article);
  };

  const { data: articles, error } = useSWR("/artical");

  useEffect(() => {
    const fetchedToken = getToken();
    setToken(fetchedToken);

    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setVisibleItems(1); 
      } else if (window.innerWidth <= 1024) {
        setVisibleItems(2); 
      } else {
        setVisibleItems(3); 
      }
    };

    handleResize(); 
    window.addEventListener('resize', handleResize); 

    const interval = setInterval(() => {
      if (articles && articles.length > 0) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % articles.length); 
      }
    }, 3000);

    return () => {
      clearInterval(interval); 
      window.removeEventListener('resize', handleResize);
    };
  }, [getToken, articles]);

  if (error) return <div>Error loading articles</div>;
  if (!articles) return <div>Loading...</div>;

  return (
    <div className="w-full">
      {selectedArticle ? (
        <ArticleView {...selectedArticle} onBack={handleBackToArticles} />
      ) : (
        <div className="w-full flex flex-col rounded-2xl">
          <div className="text-black pl-4 text-lg border-l-4 border-black">
            Trending
            <span className="text-[10px] ml-2 border rounded-2xl py-1 px-3">
              Articles
            </span>
          </div>
          <div className="flex z-10 w-full gap-1 items-start mt-3 text-black max-md:mt-0 max-md:mr-2.5 max-h-[230px] overflow-hidden relative">
            {articles.length > 0 && (
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${(currentIndex * 100) / visibleItems}%)`, 
                  width: `${(articles.length / visibleItems) * 100}%`,
                }}
              >
                {articles.map((article: ArticleCardProps, index: number) => (
                  <div
                    className="p-1 flex grow h-full"
                    key={index}
                    style={{ width: `${100 / visibleItems}%` }} 
                  >
                    <Right1Article
                      author={article.owner}
                      time={article.time}
                      date={article.createdAt}
                      title={article.title}
                      content={article.description}
                      media={article.media}
                      category={article.category}
                      avatar={article.avatar}
                      coverImage={article.coverphoto}
                      onClick={() => handleArticleClick(article)}
                    />
                  </div>
                ))}
              </div>
            )}

            <button
              className="absolute left-0 flex flex-col self-center bg-transparent text-zinc-600 p-2 rounded-xl"
              onClick={() =>
                setCurrentIndex(
                  currentIndex === 0 ? articles.length - visibleItems : currentIndex - 1
                )
              }
            >
              ◀
            </button>
            <button
              className="absolute right-0 flex flex-col self-center bg-transparent text-zinc-600 p-2 rounded-full"
              onClick={() =>
                setCurrentIndex(
                  (currentIndex + 1) % (articles.length - visibleItems + 1)
                )
              }
            >
              ▶
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RightArticles;
