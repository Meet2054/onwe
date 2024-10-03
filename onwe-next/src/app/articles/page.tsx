"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import axios from "axios";
import { useDispatch } from "react-redux";
import ArticleView from "@/components/articles/ArticlesView";
import ArticleCard from "@/components/articles/ArticlesCard";
import CreateArticle from "@/components/articles/CreateArticle";
import { useSignIn } from "@/hooks/useSignIn";

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

const fetcher = async (url: string, token: string) => {
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "69420",
    },
  });
  return response.data;
};

const ArticlePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedArticle, setSelectedArticle] =
    useState<ArticleCardProps | null>(null);
  const [showCreateArticle, setShowCreateArticle] = useState(false);

  const { getToken } = useSignIn();
  let token;
  useEffect(() => {
    token = getToken();
  }, []);

  const { data: articles, error } = useSWR(
    token ? [`${process.env.NEXT_PUBLIC_API_URL}/artical`, token] : null,
    ([url, token]) => fetcher(url, token)
  );

  const loading = !articles && !error;

  const handleBackToArticles = () => {
    setSelectedArticle(null);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleToggleCreateArticle = () => {
    setShowCreateArticle(!showCreateArticle);
  };

  const handleArticleClick = (article: ArticleCardProps) => {
    setSelectedArticle(article);
  };

  const closeCreateArticle = () => {
    setShowCreateArticle(false);
  };

  const filteredArticles = articles
    ? articles.filter(
        (article: ArticleCardProps) =>
          selectedCategory === "All" ||
          article.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    : [];

  return (
    <div className="flex overflow-hidden flex-col pt-5 bg-zinc-100">
      {showCreateArticle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20 flex justify-center items-center">
          <div className="absolute inset-0 bg-white opacity-50"></div>
          <div className="relative z-30 bg-white rounded-lg shadow-lg">
            <button
              onClick={handleToggleCreateArticle}
              className="absolute top-2 right-2 text-xl text-gray-500"
            >
              &times;
            </button>
            <CreateArticle onClose={closeCreateArticle} />
          </div>
        </div>
      )}

      <div className="flex z-10 flex-col items-center pr-1 mt-0 w-full max-md:pr-5 max-md:mt-0 max-md:max-w-full">
        <div className="flex z-10 flex-col mt-0 w-full h-[883px] max-w-[1421px] max-md:mt-0 max-md:max-w-full">
          <div className="flex flex-wrap gap-10 justify-between items-center w-full max-md:max-w-full">
            <div className="flex gap-1.5 items-center self-stretch my-auto text-base tracking-normal leading-none text-center whitespace-nowrap">
              <div className="overflow-hidden gap-2.5 pt-3 self-stretch px-4 my-auto font-bold text-white rounded-lg bg-zinc-800 min-h-[40px] w-[103px]">
                Articles
              </div>
              <Link href="/magazines" passHref>
                <button className="overflow-hidden gap-2.5 self-stretch px-4 my-auto font-medium rounded-lg border border-solid border-black border-opacity-40 min-h-[40px] text-zinc-800 w-[124px]">
                  Magazines
                </button>
              </Link>
            </div>
            <button
              className="gap-2.5 self-stretch p-2.5 my-auto text-sm text-black rounded-md bg-black bg-opacity-10"
              onClick={handleToggleCreateArticle}
            >
              + Add Article
            </button>
          </div>

          {selectedArticle ? (
            <ArticleView {...selectedArticle} onBack={handleBackToArticles} />
          ) : (
            <div className="flex-column mt-2.5 p-8 w-full bg-white rounded-xl min-h-[834px] max-md:max-w-full">
              <div className="flex overflow-hidden overflow-x-auto flex-wrap gap-1 items-center pt-3 px-2.5 w-full text-sm font-medium tracking-normal leading-5 text-center border-b border-black border-opacity-10 text-black text-opacity-90 max-md:max-w-full">
                {[
                  "All",
                  "General",
                  "Sports",
                  "Academia",
                  "Art",
                  "Fashion",
                  "Social engagement",
                ].map((category) => (
                  <div
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    className={`overflow-hidden cursor-pointer gap-2.5 self-stretch px-3 my-auto text-sm font-bold tracking-normal border-b leading-none whitespace-nowrap min-h-[36px] ${
                      selectedCategory === category
                        ? "text-black border-black"
                        : "text-gray-400 border-gray-400"
                    }`}
                  >
                    {category}
                  </div>
                ))}
              </div>
              {loading ? (
                <div className="text-center py-5">Loading...</div>
              ) : error ? (
                <div className="text-center text-red-500 py-5">
                  Failed to fetch articles
                </div>
              ) : (
                <div className="flex flex-col mt-5 ml-2.5 max-w-full w-full">
                  <div className="overflow-hidden gap-2.5 self-start px-3 py-1.5 text-sm font-medium tracking-tight text-fuchsia-600 whitespace-nowrap rounded-md bg-fuchsia-600 bg-opacity-10 min-h-[26px]">
                    New
                  </div>
                  <div className="flex flex-col mt-3 w-full text-black">
                    <div className="text-lg font-bold">{selectedCategory}</div>
                    <div className="mt-1.5 text-sm">
                      Top stories, interviews, and insights handpicked for you.
                    </div>
                  </div>

                  <div className="flex z-10 flex-wrap gap-2 items-start mt-5 text-black max-md:mt-0 max-md:mr-2.5 max-h-[59vh] overflow-y-auto scrollbar-custom">
                    {filteredArticles.length > 0 && (
                      <>
                        {Array.from({
                          length: Math.ceil(filteredArticles.length / 3),
                        }).map((_, rowIndex) => (
                          <div className="flex w-full" key={rowIndex}>
                            {filteredArticles
                              .slice(rowIndex * 3, rowIndex * 3 + 3)
                              .map(
                                (article: ArticleCardProps, index: number) => (
                                  <div className="w-1/3 p-1" key={index}>
                                    <ArticleCard
                                      author={article.owner}
                                      time={article.time}
                                      date={article.createdAt}
                                      title={article.title}
                                      content={article.description}
                                      media={article.media}
                                      category={article.category}
                                      avatar={article.avatar}
                                      coverImage={article.coverphoto}
                                      onClick={() =>
                                        handleArticleClick(article)
                                      }
                                    />
                                  </div>
                                )
                              )}
                          </div>
                        ))}
                      </>
                    )}
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

export default ArticlePage;
