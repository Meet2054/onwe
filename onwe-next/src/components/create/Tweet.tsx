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
            {/* Add more options here */}
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

const Tweet = () => {

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    
    const handleImageUpload = (files: FileList) => {
        const newImages = Array.from(files).map(file => URL.createObjectURL(file));
        
      };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission here
        console.log({ title, category, description });
      };
  return (
    <>
            <div className="flex flex-col w-full text-black">
              <h1 className="text-lg font-bold">✨ Create Tweet</h1>
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
              
              <InputField
                label="Enjoying the sunset at the beach #Relation #NatureLover"
                id="article-description"
                type="textarea"
                value={description}
                onChange={setDescription}
              />
              
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