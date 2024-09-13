"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useAuth } from '@clerk/nextjs';
import { useDispatch } from 'react-redux';
import ArticleView from '@/components/articles/ArticlesView';
import ArticleCard from '@/components/articles/ArticlesCard';
import CreateArticle from '@/components/articles/CreateArticle';
import { Skeleton } from '../ui/skeleton';

interface ArticleCardProps {
  owner: string;
  time: string;
  createdAt: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  onClick: () => void;
}

const ProfileArticles = ({ username }: { username: string | null }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('General');
  const [selectedArticle, setSelectedArticle] = useState<ArticleCardProps | null>(null);
  const [showCreateArticle, setShowCreateArticle] = useState(false);
  const [articles, setArticles] = useState<ArticleCardProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { getToken } = useAuth();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    console.log("hiiiii from useEffect");

    const fetchTokenAndArticles = async () => {
      try {
        const fetchedToken = await getToken({ template: 'test' });
        if (isMounted) {
          setToken(fetchedToken);
  
          if (fetchedToken) {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/artical`, {
              headers: {
                Authorization: `Bearer ${fetchedToken}`,
                "ngrok-skip-browser-warning": "69420",
              },
            });
            
            console.log('API Response:', response.data);

            if (Array.isArray(response.data)) {
              setArticles(response.data);
            } else {
              console.error('Unexpected data format:', response.data);
            }
          }
        }
      } catch (error) {
        if (isMounted) {
          setError('Failed to fetch articles');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchTokenAndArticles();

    return () => {
      isMounted = false;
    };
  }, [getToken]);

  console.log("hi")
  console.log('Articles:', JSON.stringify(articles, null, 2))
  console.log("booo")

  const handleBackToArticles = () => {
    setSelectedArticle(null);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  

  const handleArticleClick = (article: ArticleCardProps) => {
    setSelectedArticle(article);
  };
  console.log(token)
  return (
    <div className="flex flex-col">

      <div className="flex z-10 flex-col items-center mt-0 w-full max-md:pr-5 max-md:mt-0 max-md:max-w-full">
        <div className="flex z-10 flex-col mt-0 w-full h-screen max-w-[1421px] max-md:mt-0 max-md:max-w-full">
          {selectedArticle ? (
            <ArticleView {...selectedArticle} onBack={handleBackToArticles} />
          ) : (
            <div className="flex-col w-full bg-white h-screen max-md:max-w-full">
              {loading ? (
                <div className="text-center py-5"><ProfileArticleSkeleton /></div>
              ) : error ? (
                <div className="text-center text-red-500 py-5">{error}</div>
              ) : (
                <div className="flex flex-col  ml-2.5 max-w-full w-full">

                  <div className="flex z-10 flex-wrap gap-2 items-start mt-5 text-black max-md:mt-0 max-md:mr-2.5 h-screen ">
                    {
                    // articles
                      // .filter((article) => article.category === selectedCategory)
                      articles.map((article, index) => (
                        <ArticleCard
                          key={index}
                          author={article.owner}
                          time={article.time}
                          date={article.createdAt}
                          title={article.title}
                          content={article.description}
                          imageUrl={article.imageUrl}
                          category={article.category}
                          onClick={() => handleArticleClick(article)}
                        />
                      ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileArticles;

const ProfileArticleSkeleton = () => {
  return (
    <div className="flex flex-col gap-1 h-full mt-5">
      <Skeleton className="h-[180px] w-[60%] animate-pulse" />
      <Skeleton className="h-[180px] w-[60%] animate-pulse" />
      <Skeleton className="h-[180px] w-[60%] animate-pulse" />
    </div>
  );
};
