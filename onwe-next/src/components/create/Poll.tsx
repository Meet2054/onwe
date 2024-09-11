import { useAuth } from '@clerk/nextjs';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

interface InputFieldProps {
  label: string;
  id: string;
  type: 'text' | 'select' | 'textarea';
  value: string;
  onChange: (value: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, id, type, value, onChange }) => {
  const inputClasses = "flex flex-col justify-center items-start px-2.5 pt-2.5 pb-4 w-full text-xs font-medium tracking-wide bg-white rounded-lg border-solid border-[1.3px] border-zinc-300 max-w-[348px] text-zinc-700";

  return (
    <div className={inputClasses}>
      <label htmlFor={id} className="sr-only">{label}</label>
      {type === 'textarea' ? (
        <textarea
          id={id}
          placeholder={label}
          className="w-full focus:outline-none bg-transparent resize-none"
          rows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : type === 'select' ? (
        <select
          id={id}
          className="w-full bg-transparent"
          value={value}
          onChange={(e) => onChange(e.target.value)}
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
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
};

const Poll = () => {
  const { getToken } = useAuth()
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState(2);
  const [optionContent, setOptionContent] = useState<string[]>(Array(2).fill(""));
  const router = useRouter()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title == "") {
      return 
    }
    for(let i = 0; i < optionContent.length; i++) {
      if (optionContent[i] == "") {
        return
      }
    }

    try {
      //
      console.log(optionContent)
      console.log(JSON.stringify(optionContent))
      // console.log(await getToken())
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/polls`,
        {
          question: title,
          options: optionContent,
        }
        , {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
          },
        });
      // console.log( Object.fromEntries(formData))
      console.log("Post successful:", response.data);
      router.push("/profile")
    } catch (error) {
      console.error("Error posting data:", error);
    }

  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptionContent = [...optionContent];
    newOptionContent[index] = value;
    setOptionContent(newOptionContent);
  };

  const addOption = () => {
    if (options < 6) {
      setOptions(options + 1);
      setOptionContent([...optionContent, '']);
    }
  };

  return (
    <>
      <div className="flex flex-col w-full text-black">
        <h1 className="text-lg font-bold">✨ Create Poll</h1>
        <p className="mt-1 text-sm">
          Top stories, interviews, and insights handpicked for you.
        </p>
      </div>
      <form className="flex flex-col gap-3 mt-4" onSubmit={handleSubmit}>
        <InputField
          label="What's on Your Mind?"
          id="article-title"
          type="text"
          value={title}
          onChange={setTitle}
        />

        {Array.from({ length: options }, (_, index) => (
          <InputField
            key={index}
            label={`Option ${index + 1}`}
            id={`option-input-${index}`}
            type="text"
            value={optionContent[index]}
            onChange={(value) => handleOptionChange(index, value)}
          />
        ))}

        {options < 6 && (
          <button
            type="button"
            className="flex flex-col justify-center items-center px-2.5 pt-2.5 pb-2.5 w-full text-xs font-medium tracking-wide rounded-lg text-gray-800"
            onClick={addOption}
          >
            Add Option
          </button>
        )}
        <button
          type="submit"
          className="flex flex-col justify-center items-center px-2.5 pt-2.5 pb-2.5 w-full text-xs font-medium tracking-wide bg-black rounded-lg border border-solid border-zinc-100 text-slate-200"
        >
          Add Poll
        </button>
      </form>
    </>
  )
}

export default Poll