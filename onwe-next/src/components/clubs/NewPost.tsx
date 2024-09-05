"use client"
import React, { useState, ChangeEvent, DragEvent, Dispatch, SetStateAction } from "react";
import plus from '../SideBar/sideBarImages/create.svg'
import create from '../SideBar/sideBarImages/create.svg'
import Image from "next/image";
import { CircleX, Plus } from "lucide-react";
import { useAuth } from '@clerk/nextjs';
import axios from "axios";

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
    const { getToken } = useAuth();

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
        const selectedFiles = Array.from(e.target.files ?? []).filter(
            (file) => file.type.startsWith("image/") || file.type.startsWith("video/")
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
                        Authorization: `Bearer ${await getToken()}`,
                    },
                }
            );
            

            setDescription("");
            setTags("");
            setFiles([]);
            setSuccessMessage("Post successful!");
            setDone((d:boolean)=>!d);
            setTimeout(() => setSuccessMessage(""), 3000);
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
                            className="w-full h-full object-cover"
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
                    <Plus size={20} />

                </label>
               <div className=" ml-14"> <InputField label={"Write Something"} id={""}  value={description} onChange={setDescription}/></div></div>
                <button onClick={async ()=>{
                    await handlePost();                    
                }}>
                    
                <Image
                    height={24} 
                    width={24}
                    alt="post"
                    loading="lazy"
                    src={create}
                    className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                    />
                </button>
            </div>
        </div>
    );
}