import React, { useState, useRef, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { useSignIn } from '@/hooks/useSignIn';
import axios from 'axios';

interface InputFieldProps {
  label: string;
  id: string;
  type: 'text' | 'select' | 'textarea';
  value: string;
  onChange: (value: string) => void;
  onDelete?: () => void;
  showDelete?: boolean;
  onMention?: (query: string) => void;
  inputRef?: React.RefObject<HTMLTextAreaElement | HTMLInputElement>;
}

const InputField: React.FC<InputFieldProps> = ({ 
  label, id, type, value, onChange, onDelete, showDelete, onMention, inputRef 
}) => {
  const inputClasses = "flex flex-col justify-center items-start px-2.5 pt-2.5 pb-4 w-full text-xs font-medium tracking-wide bg-white rounded-lg border-solid border-[1.3px] border-zinc-300 text-zinc-700";
  
  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => {
    const newValue = e.target.value;
    onChange(newValue);

    if (type === 'text' || type === 'textarea') {
      const input = e.target as HTMLTextAreaElement | HTMLInputElement;
      const lastAtSymbolIndex = newValue.lastIndexOf('@', input.selectionStart);
      if (lastAtSymbolIndex !== -1) {
        const query = newValue.slice(lastAtSymbolIndex + 1, input.selectionStart);
        if (onMention) {
          onMention(query);
        }
      }
    }
  };

  return (
    <div className={`${inputClasses} relative`}>
      <label htmlFor={id} className="sr-only">{label}</label>
      {type === 'textarea' ? (
        <textarea
          id={id}
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          placeholder={label}
          className="w-full focus:outline-none bg-transparent resize-none"
          rows={4}
          value={value}
          onChange={handleInputChange}
        />
      ) : type === 'select' ? (
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
          ref={inputRef as React.RefObject<HTMLInputElement>}
          placeholder={label}
          className="w-full focus:outline-none bg-transparent pr-8"
          value={value}
          onChange={handleInputChange}
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
  const { getToken } = useSignIn();
  const [title, setTitle] = useState("");
  const [optionContent, setOptionContent] = useState<string[]>(["", ""]);
  const router = useRouter();
  const [message, setMessage] = useState<string>("");
  const [mentionOptions, setMentionOptions] = useState<string[]>([]);
  const [showMentions, setShowMentions] = useState(false);
  const [activeMentionField, setActiveMentionField] = useState<string | null>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const optionInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleMention = async (query: string) => {
    if (query.length > 0) {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/explore/users/${query}`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });
        setMentionOptions(response.data.map((user: any) => user.username));
        setShowMentions(true);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    } else {
      setShowMentions(false);
    }
  };

  const handleMentionSelect = (username: string) => {
    let newValue = '';
    let inputElement: HTMLInputElement | null = null;

    if (activeMentionField === 'title') {
      const lastAtSymbolIndex = title.lastIndexOf('@');
      newValue = title.slice(0, lastAtSymbolIndex) + '@' + username + ' ' + title.slice(lastAtSymbolIndex + username.length + 1);
      setTitle(newValue);
      inputElement = titleInputRef.current;
    } else if (activeMentionField && activeMentionField.startsWith('option')) {
      const index = parseInt(activeMentionField.split('-')[1]);
      const option = optionContent[index];
      const lastAtSymbolIndex = option.lastIndexOf('@');
      newValue = option.slice(0, lastAtSymbolIndex) + '@' + username + ' ' + option.slice(lastAtSymbolIndex + username.length + 1);
      const newOptionContent = [...optionContent];
      newOptionContent[index] = newValue;
      setOptionContent(newOptionContent);
      inputElement = optionInputRefs.current[index];
    }

    setShowMentions(false);
    if (inputElement) {
      inputElement.focus();
      const length = newValue.length;
      inputElement.setSelectionRange(length, length);
    }
  };

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
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );
      router.push("/profile");
      done(false);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const handleOptionChange = (index: number, value: string) => {
    setMessage("");
    const newOptionContent = [...optionContent];
    newOptionContent[index] = value;
    setOptionContent(newOptionContent);
  };

  const addOption = () => {
    if (optionContent.length < 6) {
      setOptionContent([...optionContent, '']);
      optionInputRefs.current = [...optionInputRefs.current, null];
    }
  };

  const deleteOption = (index: number) => {
    if (optionContent.length > 2) {
      const newOptionContent = optionContent.filter((_, i) => i !== index);
      setOptionContent(newOptionContent);
      optionInputRefs.current = optionInputRefs.current.filter((_, i) => i !== index);
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
        <div className="relative">
          <InputField
            label="What's on Your Mind?"
            id="poll-title"
            type="text"
            value={title}
            onChange={(value) => {
              setMessage("");
              setTitle(value);
            }}
            onMention={(query) => {
              handleMention(query);
              setActiveMentionField('title');
            }}
            inputRef={titleInputRef}
          />
          {showMentions && mentionOptions.length > 0 && activeMentionField === 'title' && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
              {mentionOptions.map((username, index) => (
                <div
                  key={index}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleMentionSelect(username)}
                >
                  @{username}
                </div>
              ))}
            </div>
          )}
        </div>

        {optionContent.map((option, index) => (
          <div key={index} className="relative">
            <InputField
              label={`Option ${index + 1}`}
              id={`option-input-${index}`}
              type="text"
              value={option}
              onChange={(value) => handleOptionChange(index, value)}
              onDelete={() => deleteOption(index)}
              showDelete={optionContent.length > 2}
              onMention={(query) => {
                handleMention(query);
                setActiveMentionField(`option-${index}`);
              }}
              inputRef={(el) => (optionInputRefs.current[index] = el)}
            />
            {showMentions && mentionOptions.length > 0 && activeMentionField === `option-${index}` && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                {mentionOptions.map((username, idx) => (
                  <div
                    key={idx}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleMentionSelect(username)}
                  >
                    @{username}
                  </div>
                ))}
              </div>
            )}
          </div>
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