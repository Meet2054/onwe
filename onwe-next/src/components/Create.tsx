import { useState, Dispatch, SetStateAction, useRef, useEffect } from "react";
import Post from "./create/Post";
import Tweet from "./create/Tweet";
import Poll from "./create/Poll";

interface CreateArticleProps {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

export const Create: React.FC<CreateArticleProps> = ({ open, setOpen}) => {

    const [currentCreate, setCurrentCreate] = useState<0 | 1 | 2>(0);

 // Create a ref for the Create component
 const modalRef = useRef<HTMLDivElement>(null);

 // Add an event listener to detect clicks outside the component
 useEffect(() => {
   function handleClickOutside(event: MouseEvent) {
     if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
       setOpen(false); // Close the modal
     }
   }

   document.addEventListener("mousedown", handleClickOutside);

   return () => {
     document.removeEventListener("mousedown", handleClickOutside);
   };
 }, [open]);

    return (
        <main ref={modalRef} className="flex overflow-y-auto gap-2.5 h-[95vh] w-[30vw] rounded-md">
            <section className="flex bg-white rounded-xl px-10 py-8 flex-col self-stretch mx-auto my-auto min-w-[240px] w-full ">
                <header className="mx-auto flex gap-3 items-center self-start text-sm font-semibold ">
                    <button className={`gap-2.5 self-stretch p-2.5 my-auto ${currentCreate == 0 ? "text-fuchsia-100 bg-fuchsia-500" : "bg-fuchsia-100 text-fuchsia-500"} rounded-md`} onClick={() => setCurrentCreate(0)}>
                        Create Post
                    </button>
                    <button className={`gap-2.5 self-stretch p-2.5 my-auto ${currentCreate == 1 ? "text-fuchsia-100 bg-fuchsia-500" : "bg-fuchsia-100 text-fuchsia-500"} rounded-md`} onClick={() => setCurrentCreate(1)}>
                        Create Tweet
                    </button>
                    <button className={`gap-2.5 self-stretch p-2.5 my-auto ${currentCreate == 2 ? "text-fuchsia-100 bg-fuchsia-500" : "bg-fuchsia-100 text-fuchsia-500"} rounded-md`} onClick={() => setCurrentCreate(2)}>
                        Create Poll
                    </button>
                </header>
                <div className="flex flex-col mt-5 w-full">
                    {currentCreate == 0 && <Post />}
                    {currentCreate == 1 && <Tweet />}
                    {currentCreate == 2 && <Poll />}
                </div>
            </section>
        </main>
    );
};