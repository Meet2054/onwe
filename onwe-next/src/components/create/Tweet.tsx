'use client'

import React, { useState, useRef, ChangeEvent } from "react"
import { useSignIn } from "@/hooks/useSignIn"
import { extractHashTags } from "@/lib/utils"
import axios from "axios"
import { useRouter } from "next/navigation"
import useSWRMutation from "swr/mutation"
import Image from "next/image"
import PostAvatar from "../post_component/PostAvatar"

interface InputFieldProps {
  label: string
  id: string
  type: "text" | "select" | "textarea"
  value: string
  onChange: (value: string) => void
  onMention?: (query: string) => void
  inputRef?: React.RefObject<HTMLTextAreaElement>
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  type,
  value,
  onChange,
  onMention,
  inputRef,
}) => {
  const inputClasses =
    "flex flex-col justify-center items-start px-2.5 pt-2.5 pb-4 w-full text-xs font-medium tracking-wide bg-white rounded-lg border-solid border-[1.3px] border-zinc-300 text-zinc-700"
  const [mentionQuery, setMentionQuery] = useState("")

  const handleInputChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>
  ) => {
    const newValue = e.target.value
    onChange(newValue)

    if (type === "textarea") {
      const textarea = e.target as HTMLTextAreaElement
      const lastAtSymbolIndex = newValue.lastIndexOf(
        "@",
        textarea.selectionStart
      )
      if (lastAtSymbolIndex !== -1) {
        const query = newValue.slice(
          lastAtSymbolIndex + 1,
          textarea.selectionStart
        )
        setMentionQuery(query)
        if (onMention) {
          onMention(query)
        }
      } else {
        setMentionQuery("")
      }
    }
  }

  return (
    <div className={inputClasses}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          id={id}
          ref={inputRef}
          placeholder={label}
          className="w-full focus:outline-none bg-transparent resize-none"
          rows={8}
          value={value}
          onChange={handleInputChange}
        />
      ) : type === "select" ? (
        <select
          id={id}
          className="w-full bg-transparent"
          value={value}
          onChange={handleInputChange}
        >
          <option value="general">General</option>
          <option value="sports">Sports</option>
          <option value="academia">Academia</option>
          <option value="art">Art</option>
          <option value="fashion">Fashion</option>
          <option value="social">Social Engagement</option>
        </select>
      ) : (
        <input
          type={type}
          id={id}
          placeholder={label}
          className="w-full focus:outline-none bg-transparent"
          value={value}
          onChange={handleInputChange}
        />
      )}
    </div>
  )
}

interface ChildComponentProps {
  done: React.Dispatch<React.SetStateAction<boolean>>
}

interface User {
  username: string
  avatar: string
}

const getRequest = async (
  url: string,
  { arg }: { arg: { query: string; token: string } }
) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}${url}/${arg.query}`,
    {
      headers: {
        Authorization: `Bearer ${arg.token}`,
      },
    }
  )
  return data
}

const Tweet: React.FC<ChildComponentProps> = ({ done }) => {
  const { getToken } = useSignIn()
  const [description, setDescription] = useState("")
  const [message, setMessage] = useState("")
  const router = useRouter()
  const [mentionOptions, setMentionOptions] = useState<User[]>([])
  const [showMentions, setShowMentions] = useState(false)
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null)
  const { trigger, isMutating } = useSWRMutation("/explore/users", getRequest)

  const handleMention = async (query: string) => {
    if (query.length > 0) {
      const token = getToken()
      try {
        trigger(
          { query, token: token as string },
          {
            onSuccess(data) {
              setMentionOptions(data.map((user: User) => ({ username: user.username, avatar: user.avatar })))
              setShowMentions(true)
            },
          }
        )
      } catch (error) {
        console.error("Error fetching users:", error)
      }
    } else {
      setShowMentions(false)
    }
  }

  const handleMentionSelect = (username: string) => {
    const lastAtSymbolIndex = description.lastIndexOf("@")
    const newDescription =
      description.slice(0, lastAtSymbolIndex) +
      "@" +
      username +
      " " +
      description.slice(lastAtSymbolIndex + username.length + 1)
    setDescription(newDescription)
    setShowMentions(false)
    if (descriptionInputRef.current) {
      descriptionInputRef.current.focus()
      const length = newDescription.length
      descriptionInputRef.current.setSelectionRange(length, length)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (description === "") {
      setMessage("Please enter something")
      return
    }

    try {
      const formData = new FormData()
      formData.append("description", description)
      formData.append("tags", extractHashTags(description))

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/posts`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${getToken()}`,
          },
        }
      )
      setDescription("")
      done(false)
      router.push("/profile")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <div className="flex flex-col w-full text-black">
        <h1 className="text-lg font-bold">✨ Create Tweet</h1>
        <p className="mt-1 text-sm">
          Top stories, interviews, and insights handpicked for you.
        </p>
      </div>
      <form className="flex flex-col w-full gap-3 mt-4" onSubmit={handleSubmit}>
        <div className="relative w-full">
          <InputField
            label="What's on Your Mind?"
            id="article-description"
            type="textarea"
            value={description}
            onChange={(value) => {
              setDescription(value)
              setMessage("")
            }}
            onMention={handleMention}
            inputRef={descriptionInputRef}
          />
          {showMentions && mentionOptions.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
              {mentionOptions.map((user, index) => (
                <div
                  key={index}
                  className="flex items-center px-4 py-2 cursor-pointer gap-x-2 hover:bg-gray-100"
                  onClick={() => handleMentionSelect(user.username)}
                >
                  <PostAvatar imageUrl={user.avatar} size={6} />
                  <span>@{user.username}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        {message && <p className="text-sm text-red-500">{message}</p>}
        <button
          type="submit"
          className="flex flex-col justify-center items-center px-2.5 pt-2.5 pb-2.5 w-full text-xs font-medium tracking-wide bg-black rounded-lg border border-solid border-zinc-100 text-slate-200"
        >
          Add Tweet
        </button>
      </form>
    </>
  )
}

export default Tweet