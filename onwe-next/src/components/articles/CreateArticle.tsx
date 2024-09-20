"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSignIn } from "@/hooks/useSignIn";

interface InputFieldProps {
  label: string;
  id: string;
  type: "text" | "select" | "textarea";
  value: string;
  onChange: (value: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, id, type, value, onChange }) => {
  const inputClasses = "flex flex-col justify-center items-start px-2.5 pt-2.5 pb-4 w-full text-xs font-medium tracking-wide bg-white rounded-lg border-solid border-[1.3px] border-zinc-300 max-w-[348px] text-zinc-700";

  return (
    <div className={inputClasses}>
      <label htmlFor={id} className="sr-only">{label}</label>
      {type === "textarea" ? (
        <textarea
          id={id}
          placeholder={label}
          className="w-full bg-transparent resize-none"
          rows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : type === "select" ? (
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
          className="w-full bg-transparent"
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
      className="flex flex-col justify-center items-center px-4 py-4 w-full text-sm tracking-tight text-black rounded-md bg-neutral-400 bg-opacity-10 min-h-48px]"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <p className="font-medium">{label}</p>
      <input
        type="file"
        accept={accept}
        className="hidden"
        onChange={handleFileInput}
        id={label.replace(' ', '-').toLowerCase()}
      />
      <label htmlFor={label.replace(' ', '-').toLowerCase()} className="mt-4 cursor-pointer text-blue-500 hover:text-blue-600">
        Select Files
      </label>
    </div>
  );
};

interface CreateArticleProps {}

const CreateArticle: React.FC<CreateArticleProps> = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [coverPhoto, setCoverPhoto] = useState<string>("");
  const [pdfFile, setPdfFile] = useState<string>("");

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

    if (!token) {
      console.error("No token available for authentication.");
      return;
    }

    try {
      
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


      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/artical`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );

      // Reset form fields if needed
      setTitle("");
      setCategory("");
      setDescription("");
      setCoverPhoto("");
      setPdfFile("");
    } catch (error) {
      console.error("Failed to create article:", error);
    }
  };

  return (
    <main className="flex overflow-auto scrollbar-custom gap-2.5 items-start px-10 py-8 bg-white h-[95vh] rounded-md">
      <section className="flex flex-col self-stretch my-auto min-w-[240px] w-[350px]">
        <header className="flex gap-3 items-center self-start text-sm font-semibold text-fuchsia-500">
          <div className="gap-2.5 self-stretch p-2.5 my-auto bg-fuchsia-100 rounded-md">
            Create Article
          </div>
        </header>
        <div className="flex flex-col mt-5 w-full">
          <div className="flex flex-col w-full text-black">
            <h1 className="text-lg font-bold">✨ Create Article</h1>
            <p className="mt-1 text-sm">
              Top stories, interviews, and insights handpicked for you.
            </p>
          </div>
          <form className="flex flex-col gap-3 mt-4" onSubmit={handleSubmit}>
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
            <InputField
              label="Write Details on Articles... (Description)"
              id="article-description"
              type="textarea"
              value={description}
              onChange={setDescription}
            />
            <div className="flex gap-3">
              <Uploader onFileUpload={handleCoverPhotoUpload} accept="image/*" label="Upload Cover Photo" />
              <Uploader onFileUpload={handlePDFUpload} accept=".pdf" label="Upload PDF" />
            </div>
            <div className='flex gap-5'>
              {coverPhoto && (
                <img src={coverPhoto} alt="Cover Photo Preview" className="w-1/2  mt-3" />
              )}
              {pdfFile && (
                <embed src={pdfFile} type="application/pdf" className="w-1/2  mt-3 " />
              )}
            </div>
            <button
              type="submit"
              className="flex flex-col justify-center items-center px-2.5 pt-2.5 pb-2.5 w-full text-xs font-medium tracking-wide bg-black rounded-lg border border-solid border-zinc-100 text-slate-200"
            >
              Add Post
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default CreateArticle;
