"use client"
import React, { useState, ChangeEvent, DragEvent, Dispatch, SetStateAction } from "react";
import plus from '../SideBar/sideBarImages/create.svg'
import create from '../SideBar/sideBarImages/create.svg'
import Image from "next/image";
import { CircleX, Loader, Plus, Send } from "lucide-react";
import axios from "axios";
import { useSignIn } from "@/hooks/useSignIn";

interface ImagePreviewProps {
    images: string[];
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ images }) => {
    return (
        <div className="flex gap-3 items-center w-full">
            {images.map((src, index) => (
                <Image
                    key={index}
                    loading="lazy"
                    src={src}
                    height={60}
                    width={60}
                    className="object-contain shrink-0 self-stretch my-auto rounded-none aspect-square w-[60px]"
                    alt={`Preview ${index + 1}`}
                />
            ))}
        </div>
    );
};

interface InputFieldProps {
    label: string;
    id: string;
    value: string;
    onChange: (value: string) => void;
  }
  
  const InputField: React.FC<InputFieldProps> = ({ label, id, value, onChange }) => {
    const inputClasses = " flex flex-col space-evenly justify-center items-center  w-[90%] text-xs font-medium tracking-wide  text-zinc-700";
  
    return (
      <div className={inputClasses}>
        <label htmlFor={id} className="sr-only">{label}</label>
          <textarea
            id={id}
            placeholder={label}
            className="w-[50vw] h-4 focus:outline-none bg-transparent resize-none"
            rows={4}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
      </div>
    );
  };

  interface NewPostProps {
    setDone: Dispatch<SetStateAction<boolean>>;
    clubName: string;
  }

export const NewPost: React.FC<NewPostProps> = ({clubName, setDone}) =>{

    const [description, setDescription] = useState<string>("");
    const [tags, setTags] = useState<string>("");
    const [files, setFiles] = useState<File[]>([]);
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const { getToken } = useSignIn();
    const [isPosting, setPosting] = useState(false);

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const droppedFiles = Array.from(e.dataTransfer.files).filter(
            (file) => file.type.startsWith("image/") || file.type.startsWith("video/")
        );
        setFiles((prevFiles) => {
            const newFiles = [...prevFiles, ...droppedFiles].slice(0, 5);
            return newFiles;
        });
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const maxsize = 20*1024*1024
        const selectedFiles = Array.from(e.target.files ?? []).filter(
            (file) => (file.size <= maxsize) && (file.type.startsWith("image/") || file.type.startsWith("video/"))
        );
        setFiles((prevFiles) => {
            const newFiles = [...prevFiles, ...selectedFiles].slice(0, 5);
            return newFiles;
        });
    };

    const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
        return description;
    };

    const handleTagsChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTags(e.target.value);
    };

    const preventDefault = (e: DragEvent<HTMLDivElement>) => e.preventDefault();

    const handlePost = async () => {
        setPosting(true)
        if(description=="" && tags=="" && files.length==0) return 0;
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("category", "general");
            formData.append("description", description);
            formData.append("tags", tags);
            formData.append("clubname", clubName);

            for (let i = 0; i < files.length; i++) {
                formData.append("media", files[i]);
            }
            
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/clubs/posts`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${ getToken()}`,
                    },
                }
            );
            

            setDescription("");
            setTags("");
            setFiles([]);
            setSuccessMessage("Post successful!");
            setDone((d:boolean)=>!d);
            setTimeout(() => setSuccessMessage(""), 3000);
            setPosting(false)
            return 1

        } catch (error) {
            console.error("Error posting data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleRemove = (index: number) => {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    const isPostDisabled = files.length === 0 && description.trim() === "";


    return (
        <div className="bg-[#F1F1F1] rounded-3xl">
            <div className="flex flex-row">

            {files.length>0 && files.map((file, index) => {
                const fileUrl = URL.createObjectURL(file);
                return (
                    <li key={index} className="relative w-16 h-16 m-4">
                          {file.type.startsWith("image/") ? (
                            <img
                            src={fileUrl}
                            alt={file.name}
                            className="w-full h-full object-cover"
                            />
                        ) : (
                            <video
                            src={fileUrl}
                            className="w-full h-full object-contain"
                            controls
                            />
                        )}
                          <button
                            type="button"
                            className="absolute top-0 right-0 text-red-600 rounded-full p-1"
                            onClick={() => handleRemove(index)}
                            >
                            <CircleX className="w-4 h-4" />
                          </button>
                        </li>
                      );
                    })}
                    </div>
            <div className=" flex flex-wrap gap-10 justify-between items-center px-4 h-12  text-sm font-medium tracking-tight  min-w-[68vw] rounded-[42px]">
                <div className="flex items-center w-[70%]"><input
                    type="file"
                    id="photoUpload"
                    multiple
                    accept="image/*,video/*"
                    onChange={handleChange}
                    className="hidden"
                />
                <label
                    htmlFor="photoUpload"
                    className="cursor-pointer flex flex-col items-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <g opacity="0.8">
    <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="black" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M8.5 10C9.32843 10 10 9.32843 10 8.5C10 7.67157 9.32843 7 8.5 7C7.67157 7 7 7.67157 7 8.5C7 9.32843 7.67157 10 8.5 10Z" stroke="black" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M21 15L16 10L5 21" stroke="black" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>

                </label>
               <div className=" ml-14"> <InputField label={"Write Something"} id={""}  value={description} onChange={setDescription}/></div></div>
                <button onClick={async ()=>{
                    if(!isPosting) await handlePost();                    
                }}
                disabled={loading}>
                   {isPosting? <Loader/> : <Send className="w-5 h-5"/>}
                </button>
            </div>
        </div>
    );
}