"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSignIn } from "@/hooks/useSignIn";
import { MdOutlineKeyboardBackspace } from "react-icons/md";

interface InputFieldProps {
  label: string;
  id: string;
  type: "text" | "select" | "textarea";
  value: string;
  onChange: (value: string) => void;
  
}

const InputField: React.FC<InputFieldProps> = ({ label, id, type, value, onChange }) => {
  const inputClasses = "flex flex-col shadow justify-center items-start  w-full h-full text-md  font-medium tracking-wide bg-transparent rounded-lg border border-[0.5px] border-zinc-300  text-zinc-700";

  return (
    <div className={inputClasses}>
      <label htmlFor={id} className="sr-only h-full w-full">{label}</label>
      {type === "textarea" ? (
        <textarea
          id={id}
          placeholder={label}
          className="w-full h-full bg-transparent resize-none p-5  font-serif scrollbar-custom"
          rows={10}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : type === "select" ? (
        <select
          id={id}
          className="w-full h-full bg-transparent text-center "
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="" disabled selected>Select Category</option>
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
          className="w-full bg-transparent h-full text-center"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
};

interface UploaderProps {
  onFileUpload: (files: FileList) => void;
  accept: string;
  label: string;
}

const Uploader: React.FC<UploaderProps> = ({ onFileUpload, accept, label }) => {
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    onFileUpload(e.dataTransfer.files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onFileUpload(e.target.files);
    }
  };

  return (
    <div
      className="flex justify-between items-center px-16 py-4 border border-zinc-300 shadow text-sm tracking-tight text-black rounded-md bg-neutral-400 bg-opacity-10 h-full"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <p className="font-medium text-zinc-500 ">{label}</p>
      <input
        type="file"
        accept={accept}
        className="hidden"
        onChange={handleFileInput}
        id={label.replace(' ', '-').toLowerCase()}
      />
      <label htmlFor={label.replace(' ', '-').toLowerCase()} className="cursor-pointer text-blue-500 hover:text-blue-600">
        Select Files
      </label>
    </div>
  );
};

interface CreateArticleProps {
  onClose: () => void; 
}

const CreateArticle: React.FC<CreateArticleProps> = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [coverPhoto, setCoverPhoto] = useState<string>("");
  const [pdfFile, setPdfFile] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null); 

  const { getToken } = useSignIn();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const fetchedToken =  getToken();
        if (typeof fetchedToken === "string") {
          setToken(fetchedToken);
        } else {
          setToken(null);
        }
      } catch (error) {
        console.error("Failed to fetch token:", error);
        setToken(null);
      }
    };
    fetchToken();
  }, [getToken]);

  const handleCoverPhotoUpload = (files: FileList) => {
    const file = files[0];
    if (file && file.type.startsWith("image/")) {
      setCoverPhoto(URL.createObjectURL(file));
    }
  };

  const handlePDFUpload = (files: FileList) => {
    const file = files[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !category || !description || !coverPhoto ) {
      setMessage("All fields are required.");
      return;
    }

    if (!token) {
      console.error("No token available for authentication.");
      setMessage("Failed to create article: Missing authentication token.");
      return;
    }

    try {
      setLoading(true);
      setMessage(null); 

      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      formData.append("description", description);

      if (coverPhoto) {
        const coverFile = await fetch(coverPhoto).then((r) => r.blob());
        formData.append("media", coverFile, "cover-photo.jpg");
      }
      if (pdfFile) {
        const pdfFileBlob = await fetch(pdfFile).then((r) => r.blob());
        formData.append("media", pdfFileBlob, "article.pdf");
      }

      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/artical`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
          "ngrok-skip-browser-warning": "69420",
        },
      });

      setMessage("Article created successfully!"); 

      setTitle("");
      setCategory("");
      setDescription("");
      setCoverPhoto("");
      setPdfFile("");

      onClose();
    } catch (error) {
      console.error("Failed to create article:", error);
      setMessage("Failed to create article. Please try again."); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className=" border flex justify-center overflow-auto scrollbar-custom gap-2.5 items-start px-10  bg-white h-screen bg-custom-gradient">
      <section className="flex flex-col self-stretch pt-5 w-full">
      <button
        onClick={onClose}
        style={{ fontSize: '28px', cursor: 'pointer' }}
      >
        <MdOutlineKeyboardBackspace />
      </button>
        <header className="flex gap-3 mt-5 items-center self-start text-sm font-semibold text-fuchsia-500">
          <div className="gap-2.5 self-stretch p-2.5 my-auto bg-fuchsia-100 rounded-md">
            Create Article
          </div>
        </header>
        <div className="flex flex-col py-3 w-full h-full">
          <form className="flex flex-col gap-3 justify-between h-full  " onSubmit={handleSubmit}>
          <div className="flex justify-between items-center">
        <div className="flex flex-col w-full text-black">
            <h1 className="text-lg font-bold">✨ Create Article</h1>
            <p className="mt-1 text-sm">
              Top stories, interviews, and insights handpicked for you.
            </p>
          </div>
          <div className="w-full h-full  flex justify-end gap-3 items-center">
            
          {message && (
              <p className={`mt-3 text-md ${message.includes("successfully") ? "text-green-600" : "text-red-600"}`}>
                {message}
              </p>
            )}
             {loading ? (
              <div className="flex flex-col justify-center items-center px-3 h-[90%] text-xs font-medium tracking-wide bg-black rounded-lg border border-solid border-zinc-100 text-slate-500">
                Adding...
              </div>
            ) : (
              <button
                type="submit"
                className="flex flex-col justify-center items-center px-3 h-[90%]   text-xs font-medium tracking-wide bg-black rounded-lg border border-solid border-zinc-100 text-slate-200"
              >
                Add Article
              </button>
            )}
            
            </div>
        </div>
            <div className="flex grid grid-cols-3 w-full gap-3 max-h-[100px] ">
            <InputField
              label="What's on Your Mind? (Title)"
              id="article-title"
              type="text"
              value={title}
              onChange={setTitle}
            />
            <InputField
              label="Choose Your #Category"
              id="article-category"
              type="select"
              value={category}
              onChange={setCategory}
            />
            <Uploader onFileUpload={handleCoverPhotoUpload} accept="image/*" label="Upload Cover Photo (or) Drag here" />

            </div>
            
            <div className="flex  h-full w-full gap-3">
            
            <div className='flex gap-5 w-[50%] '>
              {coverPhoto && (
                <img src={coverPhoto} alt="Cover Photo Preview" className="w-full object-contain rounded-md" />
              )}
              {pdfFile && (
                <embed src={pdfFile} type="application/pdf" className="w-1/2  mt-3 " />
              )}
            </div>
            <div className="flex grow w-full">
            <InputField
              label="|    Well, what are you waiting for? Start writing your article already!"
              id="article-description"
              type="textarea"
              value={description}
              onChange={setDescription}
            />
            </div>
            </div>
            
            {/* {message && (
              <p className={`mt-3 text-sm ${message.includes("successfully") ? "text-green-600" : "text-red-600"}`}>
                {message}
              </p>
            )}
            {loading ? (
              <div className="flex justify-center items-center py-2.5 text-xs font-medium text-slate-500">
                Loading...
              </div>
            ) : (
              <button
                type="submit"
                className="flex flex-col justify-center items-center px-2.5 pt-2.5 pb-2.5 w-full text-xs font-medium tracking-wide bg-black rounded-lg border border-solid border-zinc-100 text-slate-200"
              >
                Add Article
              </button>
            )}
             */}
          </form>
        </div>
      </section>
    </main>
  );
};

export default CreateArticle;
