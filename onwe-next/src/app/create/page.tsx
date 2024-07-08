"use client";
import React, { useState, ChangeEvent, DragEvent } from "react";
import axios from "axios";
import { Upload } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../lib/store";
import { useAuth, useUser } from "@clerk/nextjs";

const Page: React.FC = () => {
  const [category, setCategory] = useState<string>("general");
  const [description, setDescription] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const token = useSelector((state: RootState) => state.auth.token);
  const { user } = useUser();
  const { getToken } = useAuth();
  const userId = "sundaram08";

  console.log(token);
  

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
    try {
      const formData = new FormData();
      formData.append("category", category);
      formData.append("description", description);
      formData.append("tags", tags);

      for (let i = 0; i < files.length; i++) {
        formData.append("media", files[i]);
      }

      const response = await axios.post(
        "https://eb64-117-198-141-197.ngrok-free.app/posts",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      console.log("Post successful:", response.data);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const handleRemove = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="flex w-65/100 h-2/3 mt-8">
          <div
            className="border-dashed rounded-xl h-5/6 w-1/2 flex flex-col justify-center items-center shadow-md bg-gray-100"
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
              <Upload size={40} />
              <p className="text-black mt-2">
                choose a file or drag and drop here.
              </p>
              <p className="text-gray-400">up to 5 images/videos.</p>
            </label>
            <div className="mt-4 text-center">
              {files.length > 0 && (
                <div className="text-left">
                  <h4 className="text-gray-600 mb-2">Selected files:</h4>
                  <ul className="list-disc list-inside">
                    {files.map((file, index) => {
                      const fileUrl = URL.createObjectURL(file);
                      return (
                        <li
                          key={index}
                          className="text-gray-500 flex items-center"
                        >
                          {file.type.startsWith("image/") ? (
                            <img
                              src={fileUrl}
                              alt={file.name}
                              className="w-16 h-16 object-cover mr-2"
                            />
                          ) : (
                            <video
                              src={fileUrl}
                              className="w-16 h-16 object-cover mr-2"
                              controls
                            />
                          )}
                          <span>{file.name}</span>
                          <button
                            type="button"
                            className="ml-2 text-red-500"
                            onClick={() => handleRemove(index)}
                          >
                            Remove
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="ml-12 h-full w-96 flex flex-col">
            <form className="flex flex-col h-full justify-between">
              <div>
                <label htmlFor="description" className="text-xs">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={handleDescriptionChange}
                  className="h-40 w-full rounded-xl border-2 border-gray-300 p-2"
                  placeholder="Add description"
                ></textarea>
              </div>
              <div>
                <label htmlFor="tags" className="mt-8 text-xs">
                  Tags
                </label>
                <input
                  type="text"
                  value={tags}
                  onChange={handleTagsChange}
                  className="h-10 w-full rounded-xl border-2 border-gray-300 p-2 mt-2"
                  placeholder="create or choose Hashtags"
                />
              </div>
              <div>
                <label htmlFor="category" className="mt-8 text-xs">
                  Category
                </label>
                <select
                  value={category}
                  onChange={handleCategoryChange}
                  className=" bg-gray-200 block w-full px-4 py-2 border-2 rounded-xl border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mt-2"
                >
                  <option value="general">General</option>
                  <option value="nature">Nature</option>
                  <option value="technology">Technology</option>
                  <option value="people">People</option>
                  <option value="architecture">Architecture</option>
                  <option value="animals">Animals</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handlePost}
                  className="mt-8 bg-blue-500 text-white px-6 py-2 rounded-lg"
                >
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
