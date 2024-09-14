import { useAuth } from '@clerk/nextjs';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { X } from 'lucide-react'; // Import the X icon from lucide-react

interface InputFieldProps {
  label: string;
  id: string;
  type: 'text' | 'select' | 'textarea';
  value: string;
  onChange: (value: string) => void;
  onDelete?: () => void; // New prop for delete functionality
  showDelete?: boolean; // New prop to determine if delete button should be shown
}

const InputField: React.FC<InputFieldProps> = ({ label, id, type, value, onChange, onDelete, showDelete }) => {
  const inputClasses = "flex flex-col justify-center items-start px-2.5 pt-2.5 pb-4 w-full text-xs font-medium tracking-wide bg-white rounded-lg border-solid border-[1.3px] border-zinc-300 text-zinc-700";

  return (
    <div className={`${inputClasses} relative`}>
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
          className="w-full focus:outline-none bg-transparent pr-8" // Added right padding for delete button
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {showDelete && onDelete && (
        <button
          type="button"
          onClick={onDelete}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

interface ChildComponentProps {
  done: React.Dispatch<React.SetStateAction<boolean>>;
}

const Poll: React.FC<ChildComponentProps> = ({ done }) => {
  const { getToken } = useAuth();
  const [title, setTitle] = useState("");
  const [optionContent, setOptionContent] = useState<string[]>(["", ""]);
  const router = useRouter();
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title === "" || optionContent.some(option => option === "") || optionContent.length < 2) {
      setMessage("Poll incomplete: Add title and at least 2 or more proper options.");
      return;
    }
   
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/polls`,
        {
          question: title,
          options: optionContent,
        },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );
      console.log("Post successful:", response.data);
      router.push("/profile");
      done(false);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const handleOptionChange = (index: number, value: string) => {
    setMessage("")
    const newOptionContent = [...optionContent];
    newOptionContent[index] = value;
    setOptionContent(newOptionContent);
  };

  const addOption = () => {
    if (optionContent.length < 6) {
      setOptionContent([...optionContent, '']);
    }
  };

  const deleteOption = (index: number) => {
    if (optionContent.length > 2) {
      const newOptionContent = optionContent.filter((_, i) => i !== index);
      setOptionContent(newOptionContent);
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
          onChange={(value)=>{
            setMessage("")
            setTitle(value)
          }}
        />

        {optionContent.map((option, index) => (
          <InputField
            key={index}
            label={`Option ${index + 1}`}
            id={`option-input-${index}`}
            type="text"
            value={option}
            onChange={(value) => handleOptionChange(index, value)}
            onDelete={() => deleteOption(index)}
            showDelete={optionContent.length > 2}
          />
        ))}

        {optionContent.length < 6 && (
          <button
            type="button"
            className="flex flex-col justify-center items-center px-2.5 pt-2.5 pb-2.5 w-full text-xs font-medium tracking-wide rounded-lg text-gray-800"
            onClick={addOption}
          >
            Add Option
          </button>
        )}
        {message && <div className="text-red-500 text-sm">{message}</div>}
        <button
          type="submit"
          className="flex flex-col justify-center items-center px-2.5 pt-2.5 pb-2.5 w-full text-xs font-medium tracking-wide bg-black rounded-lg border border-solid border-zinc-100 text-slate-200"
        >
          Add Poll
        </button>
      </form>
    </>
  );
};

export default Poll;