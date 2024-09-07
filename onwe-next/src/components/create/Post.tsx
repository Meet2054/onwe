import React, { ChangeEvent, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import axios from 'axios';
import { CircleX } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { extractHashTags } from '@/lib/utils';

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
                    className="w-full bg-transparent focus:outline-none resize-none"
                    rows={4}
                    value={value}
                    onChange={(e) => {
                        console.log(e.target.value)
                        console.log(extractHashTags(e.target.value))
                        onChange(e.target.value)}}
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
                <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/49b69fe3d7ae892f549ffe61bf9563fdd1b4c8230018dceeab1c0efc273d6373?placeholderIfAbsent=true&apiKey=fa090b16b04649b4a5024c30e95337f0" className="object-contain w-10 aspect-[0.98]" alt="" />
                <p className="mt-2.5 font-medium">Choose a file or drag and drop here.</p>
                <p className="mt-2.5 text-center">PDF</p>
                <input
                    type="file"
                    accept="image/*,video/*"
                    multiple
                    className="hidden"
                    onChange={handleFileInput}
                    id="file-upload"
                />
                <label htmlFor="file-upload" className="mt-4 cursor-pointer text-blue-500 hover:text-blue-600">
                    Select Files
                </label>
            </div>
        </div>
    );
};

const Post: React.FC = () => {
    const router = useRouter()
    const { getToken } = useAuth();
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState("");
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState<File[]>([]);
    const [message, setMessage] = useState('');

    const handleImageUpload = (files: FileList) => {
        const selectedFiles = Array.from(files).filter(
            (file) => file.type.startsWith("image/") || file.type.startsWith("video/")
        );
        setImages((prevFiles) => [...prevFiles, ...selectedFiles].slice(0, 5));
    };

    const handleRemove = (index: number) => {
        setImages((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(images.length <1 && description.length<1){
            setMessage("Please Upload atleast 1 image or description.");
            return
        }
        setLoading(true);
        setTags(extractHashTags(description))
        console.log(tags)
        try {
            const formData = new FormData();
            formData.append("category", category);
            formData.append("description", description);
            formData.append("tags", tags);

            for (let i = 0; i < images.length; i++) {
                formData.append("media", images[i]);
            }

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/posts`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${await getToken()}`,
                    },
                }
            );

            console.log("Post successful:", response.data);

            // Clear form fields
            setCategory("general");
            setDescription("");
            setTags("");
            setImages([]);
            setMessage("Post successful!");

            // Hide success message after 3 seconds
            setTimeout(() => {
                setMessage("")
                router.push("/profile")
            }, 500);
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
            <form className="flex flex-col gap-3 mt-4" onSubmit={handleSubmit}>
                <InputField
                    label="Write Details on Articles... (Description)"
                    id="article-description"
                    type="textarea"
                    value={description}
                    onChange={setDescription}
                />
                <InputField
                    label="Choose Your #Category"
                    id="article-category"
                    type="select"
                    value={category}
                    onChange={setCategory}
                />
                {images.length<5 &&<ImageUploader onImageUpload={handleImageUpload} />}
                <ImagePreview images={images} handleRemove={handleRemove} />
                <button
                    type="submit"
                    className="flex flex-col justify-center items-center px-2.5 pt-2.5 pb-2.5 w-full text-xs font-medium tracking-wide bg-black rounded-lg border border-solid border-zinc-100 text-slate-200"
                    disabled={loading}
                >
                    {loading ? "Posting..." : "Add Post"}
                </button>
            </form>
            {message && <p className="mt-4 text-green-500">{message}</p>}
        </div>
    );
};

export default Post;
