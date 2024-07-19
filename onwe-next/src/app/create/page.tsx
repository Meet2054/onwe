"use client";
import React, { useState, ChangeEvent, DragEvent } from "react";
import axios from "axios";
import {
  CircleMinus,
  CircleX,
  LoaderCircle,
  LoaderIcon,
  Upload,
  XCircle,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../lib/store";
import { useAuth, useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

const Page: React.FC = () => {
  const [category, setCategory] = useState<string>("general");
  const [description, setDescription] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
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
    } catch (error) {
      console.error("Error posting data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = (index: number) => {
    console.log(files);

    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const isPostDisabled = files.length === 0 && description.trim() === "";

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="flex w-65/100 h-2/3 mt-8">
          <div
            className="border-dashed ml-[-20px] lg:ml-0 rounded-xl mt-2 lg:mt-0 p-3 h-40 lg:h-5/6 lg:w-1/2 flex flex-col justify-center items-center shadow-md bg-gray-100"
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
              className="hidden "
            />
            <label
              htmlFor="photoUpload"
              className="cursor-pointer flex flex-col items-center"
            >
              <Upload size={40} />
              <p className="text-black h-full lg:mt-2 text-sm  ">
                Choose a file or drag and drop here.
              </p>
              <p className="text-gray-400 text-sm">Up to 5 images/videos.</p>
            </label>
            <div className="mt-4 text-center">
              {files.length > 0 && (
                <div className="text-left">
                  <h4 className="text-gray-600 mb-2">Selected files:</h4>
                  <ul className=" list-inside grid grid-cols-3">
                    {files.map((file, index) => {
                      const fileUrl = URL.createObjectURL(file);
                      return (
                        <li key={index} className="relative w-24 h-24 m-2">
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
                            className="absolute top-0 right-0  text-red-600 rounded-full p-1"
                            onClick={() => handleRemove(index)}
                          >
                            <CircleX className="w-5 h-5" />
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="ml-8 lg:ml-12 h-full w-96 flex flex-col">
            <form className="flex flex-col h-full justify-between">
              <div className="flex flex-col gap-2">
                <label htmlFor="description" className="text-xs">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={handleDescriptionChange}
                  className="lg:h-40 h-32  w-32 lg:w-full rounded-xl border-2 border-gray-300 p-2 text-sm lg:text-md"
                  placeholder="Add description"
                ></textarea>
              </div>
              <div className="flex flex-col">
                <label htmlFor="tags" className="mt-8 text-xs">
                  Tags
                </label>
                <input
                  type="text"
                  value={tags}
                  onChange={handleTagsChange}
                  className="h-10 w-32 lg:h-10 lg:w-full rounded-xl border-2 border-gray-300 p-2 mt-2 text-[12.7px] lg:text-md"
                  placeholder="Create or choose hashtags"
                />
              </div>
              <div>
                <label htmlFor="category" className="mt-8 text-xs">
                  Category
                </label>
                <select
                  value={category}
                  onChange={handleCategoryChange}
                  className=" bg-gray-200 block text-sm lg:text-md h-10 lg:h-12 w-full px-4 py-2 border-2 rounded-xl border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mt-2"
                >
                  <option value="general">General</option>
                  <option value="nature">Academia</option>
                  <option value="technology">Literature</option>
                  <option value="people">Discussions</option>
                  <option value="architecture">Sports</option>
                  <option value="animals">Arts&Fashion</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handlePost}
                  className={cn(
                    "mt-8 bg-blue-500 text-white px-6 py-2 rounded-lg flex justify-center items-center",
                    {
                      "opacity-50": loading || isPostDisabled,
                    }
                  )}
                  disabled={loading || isPostDisabled}
                >
                  {loading ? (
                    // <svg
                    //   className="animate-spin h-5 w-5 mr-3 border-2 border-white border-t-transparent rounded-full"
                    //   viewBox="0 0 24 24"
                    // ></svg>
                    <LoaderCircle className="animate-spin" />
                  ) : (
                    <>Post</>
                  )}
                </button>
              </div>
            </form>
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

export default Page;
