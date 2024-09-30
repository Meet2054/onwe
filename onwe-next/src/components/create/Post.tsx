import React, { ChangeEvent, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { CircleX, Camera } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { extractHashTags } from '@/lib/utils';
import { useSignIn } from '@/hooks/useSignIn';
import PostAvatar from "../post_component/PostAvatar";
import useSWRMutation from "swr/mutation";

interface ImagePreviewProps {
    images: File[];
    handleRemove: (index: number) => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ images, handleRemove }) => {
    return (
        <div className="flex gap-3 items-center w-full">
            {images.map((file, index) => (
                <div key={index} className='relative'>
                    <img
                        loading="lazy"
                        src={URL.createObjectURL(file)}
                        className="object-contain shrink-0 self-stretch my-auto rounded-none aspect-square w-[60px]"
                        alt={`Preview ${index + 1}`}
                    />
                    <button
                        type="button"
                        className="absolute top-0 right-0 text-red-600 rounded-full p-1"
                        onClick={() => handleRemove(index)}
                    >
                        <CircleX className="w-4 h-4" />
                    </button>
                </div>
            ))}
        </div>
    );
};

interface InputFieldProps {
    label: string;
    id: string;
    type: 'text' | 'select' | 'textarea';
    value: string;
    onChange: (value: string) => void;
    onMention?: (query: string) => void;
    inputRef?: React.RefObject<HTMLTextAreaElement>;
}

interface User {
    username: string;
    avatar: string;
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
    );
    return data;
};

const InputField: React.FC<InputFieldProps> = ({ label, id, type, value, onChange, onMention, inputRef }) => {
    const inputClasses = "flex flex-col justify-center items-start px-1.5 pt-2.5 pb-4 w-full text-xs font-medium tracking-wide bg-white rounded-lg border-solid border-[1.3px] border-zinc-300 text-zinc-700";
    const [mentionQuery, setMentionQuery] = useState('');
    const [cursorPosition, setCursorPosition] = useState(0);

    const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => {
        const newValue = e.target.value;
        onChange(newValue);

        if (type === 'textarea') {
            const textarea = e.target as HTMLTextAreaElement;
            setCursorPosition(textarea.selectionStart);

            const lastAtSymbolIndex = newValue.lastIndexOf('@', textarea.selectionStart);
            if (lastAtSymbolIndex !== -1) {
                const query = newValue.slice(lastAtSymbolIndex + 1, textarea.selectionStart);
                setMentionQuery(query);
                if (onMention) {
                    onMention(query);
                }
            } else {
                setMentionQuery('');
            }
        }
    };

    return (
        <div className={inputClasses}>
            <label htmlFor={id} className="sr-only">{label}</label>
            {type === 'textarea' ? (
                <textarea
                    id={id}
                    placeholder={label}
                    ref={inputRef}
                    className="w-full scrollbar-custom bg-transparent focus:outline-none resize-none"
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
                    placeholder={label}
                    className="w-full focus:outline-none bg-transparent"
                    value={value}
                    onChange={handleInputChange}
                />
            )}
        </div>
    );
};

interface ImageUploaderProps {
    onImageUpload: (files: FileList) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        onImageUpload(e.dataTransfer.files);
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            onImageUpload(e.target.files);
        }
    };
    return (
        <div
            className="flex flex-col justify-center px-10 py-9 w-full text-sm tracking-tight text-black rounded-md bg-neutral-400 bg-opacity-10 min-h-[168px]"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
        >
            <div className="flex flex-col items-center w-full">
                <Camera className="w-10 h-10" />
                <p className="mt-2.5 font-medium">Choose Images or drag and drop here.</p>
                
                <input
                    type="file"
                    accept="image/*,video/*"
                    multiple
                    className="hidden"
                    onChange={handleFileInput}
                    id="file-upload"
                />
                <label htmlFor="file-upload" className="mt-4 cursor-pointer text-blue-500 hover:text-blue-600">
                    Select Images
                </label>
            </div>
        </div>
    );
};

interface ChildComponentProps {
    done: React.Dispatch<React.SetStateAction<boolean>>;
}
  
const Post: React.FC<ChildComponentProps> = ({ done }) => {
    const router = useRouter()
    const { getToken } = useSignIn();
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState("");
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState<File[]>([]);
    const [message, setMessage] = useState('');
    const [mentionOptions, setMentionOptions] = useState<User[]>([]);
    const [showMentions, setShowMentions] = useState(false);
    const descriptionInputRef = useRef<HTMLTextAreaElement>(null);
    const { trigger, isMutating } = useSWRMutation("/explore/users", getRequest);

    const handleImageUpload = (files: FileList) => {
        setMessage("")
        const maxsize = 20*1024*1024

        const selectedFiles = Array.from(files).filter(
            (file) =>{
                if (file.size > maxsize){
                    setMessage("Please upload file less than 20mb")
                }
                return (file.size <= maxsize) && (file.type.startsWith("image/") || file.type.startsWith("video/"))}
        );
        setImages((prevFiles) => [...prevFiles, ...selectedFiles].slice(0, 5));
    };

    const handleRemove = (index: number) => {
        setImages((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    const handleMention = async (query: string) => {
        if (query.length > 0) {
            const token = getToken();
            try {
                trigger(
                    { query, token: token as string },
                    {
                        onSuccess(data) {
                            setMentionOptions(data.map((user: User) => ({ username: user.username, avatar: user.avatar })));
                            setShowMentions(true);
                        },
                    }
                );
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        } else {
            setShowMentions(false);
        }
    };

    const handleMentionSelect = (username: string) => {
        const lastAtSymbolIndex = description.lastIndexOf('@');
        const newDescription = description.slice(0, lastAtSymbolIndex) + '@' + username + ' ' + description.slice(lastAtSymbolIndex + username.length + 1);
        setDescription(newDescription);
        setShowMentions(false);
        if (descriptionInputRef.current) {
            descriptionInputRef.current.focus();
            const length = newDescription.length;
            descriptionInputRef.current.setSelectionRange(length, length);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(images.length == 0){
            setMessage("Please Upload at least 1 image.");
            return
        }
        setLoading(true);
        
        try {
            const formData = new FormData();
            formData.append("category", category);
            formData.append("description", description);
            formData.append("tags", extractHashTags(description));
            for (let i = 0; i < images.length; i++) {
                formData.append("media", images[i]);
            }

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/posts`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${getToken()}`,
                    },
                }
            );

            setMessage("Post successful!");
            setCategory("general");
            setDescription("");
            setTags("");
            setImages([]);
            done(false)
            router.push("/profile")
        } catch (error) {
            console.error("Error posting data:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col w-full text-black">
            <h1 className="text-lg font-bold">✨ Create Post</h1>
            <p className="mt-1 text-sm">Top stories, interviews, and insights handpicked for you.</p>
            <form className="flex flex-col items-center gap-3 mt-4" onSubmit={handleSubmit}>
                <div className="relative w-full">
                    <InputField
                        label="Write Description here..."
                        id="article-description"
                        type="textarea"
                        value={description}
                        onChange={setDescription}
                        onMention={handleMention}
                        inputRef={descriptionInputRef}
                    />
                    {showMentions && mentionOptions.length > 0 && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                            {mentionOptions.map((user, index) => (
                                <div
                                    key={index}
                                    className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleMentionSelect(user.username)}
                                >
                                    <PostAvatar imageUrl={user.avatar} size={6} />
                                    <span className="ml-2">@{user.username}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <InputField
                    label="Choose Your #Category"
                    id="article-category"
                    type="select"
                    value={category}
                    onChange={setCategory}
                />
                {images.length < 5 && <ImageUploader onImageUpload={handleImageUpload} />}
                <ImagePreview images={images} handleRemove={handleRemove} />
                {message && <p className="text-sm text-red-500">{message}</p>}
                <button
                    type="submit"
                    className="flex flex-col justify-center items-center px-2.5 pt-2.5 pb-2.5 w-full text-xs font-medium tracking-wide bg-black rounded-lg border border-solid border-zinc-100 text-slate-200"
                    disabled={loading}
                >
                    {loading ? "Posting..." : "Add Post"}
                </button>
            </form>
        </div>
    );
};

export default Post;