"use client";
import React, { useState, ChangeEvent, DragEvent } from "react";
import axios from "axios";
import { CircleX, LoaderCircle, Upload } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

const CreatePost: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [category, setCategory] = useState<string>("general");
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

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleTagsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTags(e.target.value);
  };

  const preventDefault = (e: DragEvent<HTMLDivElement>) => e.preventDefault();

  const handlePost = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("category", category);
      formData.append("description", description);
      formData.append("tags", tags);

      for (let i = 0; i < files.length; i++) {
        formData.append("media", files[i]);
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
      setFiles([]);
      setSuccessMessage("Post successful!");

      // Hide success message after 3 seconds
      setTimeout(() => setSuccessMessage(""), 3000);
      onClose();
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
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-8 rounded shadow-md w-96 relative">
          <h2 className="text-xl mb-4">Create Post</h2>
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            className="w-full h-32 p-2 border border-gray-300 rounded mb-4"
            placeholder="What's on your mind?"
          />
          <input
            type="text"
            value={tags}
            onChange={handleTagsChange}
            className="w-full p-2 border border-gray-300 rounded mb-4"
            placeholder="Tags"
          />
          <select
            value={category}
            onChange={handleCategoryChange}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          >
            <option value="general">General</option>
            <option value="nature">Academia</option>
            <option value="technology">Literature</option>
            <option value="people">Discussions</option>
            <option value="architecture">Sports</option>
            <option value="animals">Arts & Fashion</option>
          </select>
          <div
            className="border-dashed rounded-xl h-24 flex flex-col justify-center items-center shadow-md bg-gray-100 mb-4"
            onDragOver={preventDefault}
            onDragEnter={preventDefault}
            onDragLeave={preventDefault}
            onDrop={handleDrop}
          >
            <input
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
              <Upload size={20} />
              <p className="text-black mt-2 text-sm">Choose a file or drag and drop here.</p>
              <p className="text-gray-400 text-xs">Up to 5 images/videos.</p>
            </label>
            <div className="mt-4 text-center">
              {files.length > 0 && (
                <div className="text-left">
                  <h4 className="text-gray-600 mb-2">Selected files:</h4>
                  <ul className="list-inside grid grid-cols-3">
                    {files.map((file, index) => {
                      const fileUrl = URL.createObjectURL(file);
                      return (
                        <li
                          key={index}
                          className="relative w-16 h-16 m-2"
                        >
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
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handlePost}
              className={cn(
                "bg-blue-500 text-white px-4 py-2 rounded",
                {
                  "opacity-50": loading || isPostDisabled,
                }
              )}
              disabled={loading || isPostDisabled}
            >
              {loading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <>Post</>
              )}
            </button>
          </div>
        </div>
      </div>
      {successMessage && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
          {successMessage}
        </div>
      )}
    </>
  );
};

export default CreatePost;
