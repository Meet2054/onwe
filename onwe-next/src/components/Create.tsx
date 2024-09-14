import React, { useState, Dispatch, SetStateAction, useRef, useEffect } from "react";
import Post from "./create/Post";
import Tweet from "./create/Tweet";
import Poll from "./create/Poll";

interface CreateArticleProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

export const Create: React.FC<CreateArticleProps> = ({ open, setOpen }) => {
    const [currentCreate, setCurrentCreate] = useState<0 | 1 | 2>(0);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50 p-4">
            <main ref={modalRef} className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-visible">
                <section className="p-4 sm:p-6 md:p-8">
                    <header className="flex flex-wrap gap-2 mb-4">
                        <button
                            className={`flex-grow px-3 py-2 text-xs sm:text-sm font-semibold rounded-md transition-colors ${
                                currentCreate == 0 ? "text-white bg-black" : "bg-gray-200 text-black hover:bg-gray-300"
                            }`}
                            onClick={() => setCurrentCreate(0)}
                        >
                            Create Post
                        </button>
                        <button
                            className={`flex-grow px-3 py-2 text-xs sm:text-sm font-semibold rounded-md transition-colors ${
                                currentCreate == 1 ? "text-white bg-black" : "bg-gray-200 text-black hover:bg-gray-300"
                            }`}
                            onClick={() => setCurrentCreate(1)}
                        >
                            Create Tweet
                        </button>
                        <button
                            className={`flex-grow px-3 py-2 text-xs sm:text-sm font-semibold rounded-md transition-colors ${
                                currentCreate == 2 ? "text-white bg-black" : "bg-gray-200 text-black hover:bg-gray-300"
                            }`}
                            onClick={() => setCurrentCreate(2)}
                        >
                            Create Poll
                        </button>
                    </header>
                    <div className="mt-4">
                        {currentCreate == 0 && <Post done={setOpen} />}
                        {currentCreate == 1 && <Tweet done={setOpen} />}
                        {currentCreate == 2 && <Poll done={setOpen} />}
                    </div>
                </section>
            </main>
        </div>
    );
};