'use client'

import React, { useState } from 'react'
import useSWR from 'swr'
import axios from 'axios'
import { useSignIn } from '@/hooks/useSignIn'
import ArticleView from '@/components/articles/ArticlesView'
import ArticleCard from '@/components/articles/ArticlesCard'
import { Skeleton } from '@/components/ui/skeleton'

interface ArticleCardProps {
  id: number
  owner: string
  time: string
  media: string[]
  createdAt: string
  title: string
  description: string
  imageUrl: string
  category: string
  avatar: string
  coverphoto: string
}

const fetcher = async (url: string, token: string|null) => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "69420",
    },
  })
  return response.data
}

const ProfileArticles: React.FC<{ username: string | null }> = ({ username }) => {
  const [selectedArticle, setSelectedArticle] = useState<ArticleCardProps | null>(null)
  const { getToken } = useSignIn()
  
  const { data: articles, error, isLoading, mutate } = useSWR(
    username ? [`/artical/${username}`, getToken()] : null,
    ([url, token]) => fetcher(url, token),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )

  const handleArticleDelete = () => {
    mutate(`/artical/${username}`)
  }
  const handleBackToArticles = () => {
    setSelectedArticle(null)
  }

  const handleArticleClick = (article: ArticleCardProps) => {
    setSelectedArticle(article)
  }
  
  if (isLoading) return <ProfileArticleSkeleton />
  if (error) return <div className="text-center text-red-500 py-5">Failed to fetch articles</div>

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-auto">
        {selectedArticle ? (
          <ArticleView {...selectedArticle} onBack={handleBackToArticles} />
        ) : (
          <div className="flex flex-wrap gap-2 p-2">
            {!articles  || !Array.isArray(articles) ||  articles.length === 0 ? (
              <div className="p-3">No Articles</div>
            ) : (
              articles.map((article: ArticleCardProps, index: number) => (
                <ArticleCard
                  key={index}
                  id={article.id}
                  author={article.owner}
                  time={article.time}
                  date={article.createdAt}
                  title={article.title}
                  content={article.description}
                  media={article.media}
                  category={article.category}
                  avatar={article.avatar}
                  coverImage={article.coverphoto}
                  isDeletable={true}
                  onClick={() => handleArticleClick(article)}
                  onDelete={() => handleArticleDelete()}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}

const ProfileArticleSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <Skeleton className="h-[180px] w-full" />
      <Skeleton className="h-[180px] w-full" />
      <Skeleton className="h-[180px] w-full" />
    </div>
  )
}

export default ProfileArticles