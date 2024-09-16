// // components/MagazineDetailsComponent.tsx
// import React from "react";
// import Image from "next/image";
// import { useDispatch } from 'react-redux';
// import { selectMagazine } from "@/lib/features/magazines/magazineSlice";
// import { useSelector } from "react-redux";
// import { RootState } from "@/lib/store";




// // Sample magazine data type
// type Magazine = {
//   id: number;
//   title: string;
//   date: string;
//   description: string;
//   media: string[]; // Assuming media is an array of strings
// };

// const MagazineDetails: React.FC<{ magazine: Magazine }> = ({
//   magazine,
// }) => {
//   const base64Prefix = 'data:image/png;base64,';
//   const dispatch = useDispatch();
//   const selectedMagazine = useSelector((state: RootState) => state.magazine.selectedMagazine);


//   function handleMagazineClick(magazine: Magazine): void {
//     dispatch(selectMagazine(magazine));
//   }

//   return (
//     <div className="w-screen h-screen p-4 flex flex-col"onClick={() => handleMagazineClick(magazine)}>
//       <h1 className="text-4xl font-bold text-gray-600">WHATS AROUND?</h1>
//       <h2 className="text-xl text-gray-600 mb-4">
//         MAGAZINE {magazine.id < 10 ? `0${magazine.id}` : magazine.id}.{" "}
//         {magazine.date}
//       </h2>
//       <p className="mb-4">{magazine.description}</p>
//       <div className="w-full h-full relative">
//         <Image
//           src={`${base64Prefix}${magazine.media[0]}`}
//           alt={magazine.title}
//           layout="fill"
//           objectFit="contain"
//           className="rounded-lg"
//         />
//       </div>
//     </div>
//   );
// };

// export default MagazineDetails;

// components/MagazineDetailsComponent.tsx
import React, { useState } from "react";
import Image from "next/image";
import M from "./Magazine_page-1.jpg"
import { useDispatch, useSelector } from "react-redux";
// import { selectMagazine } from "@/lib/features/magazines/magazineSlice";
import { RootState } from "@/lib/store";
import { ArrowLeft, ArrowRight } from "lucide-react";
// import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
// import "@react-pdf-viewer/core/lib/styles/index.css";
// import "@react-pdf-viewer/default-layout/lib/styles/index.css";

// Sample magazine data type

const data = [
  { imageUrl: M },
  { imageUrl: M },
  { imageUrl: M },
  { imageUrl: M },
  { imageUrl: M },
  { imageUrl: M },
  { imageUrl: M },
  { imageUrl: M },
  { imageUrl: M },
  { imageUrl: M },
  { imageUrl: M },
  { imageUrl: M },
];

type Magazine = {
  id: number;
  title: string;
  date: string;
  description: string;
  media: string[]; // Assuming media is an array of strings
};

const MagazineDetails: React.FC<{ magazine: Magazine }> = ({ magazine }) => {
  const base64Prefix = 'data:image/png;base64,';
  const selectedMagazine = useSelector((state: RootState) => state.magazine.selectedMagazine);
  // const defaultLayoutPluginInstance = defaultLayoutPlugin();

  // function handleMagazineClick(magazine: Magazine): void {
  //   dispatch(selectMagazine(magazine));
  // }
  const [currentPage, setCurrentPage] = useState(0);

  const goToNextPage = () => {
    setCurrentPage((prev) => (prev + 1) % data.length);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => (prev - 1 + data.length) % data.length);
  };

  const goToPage = (pageNumber:number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="w-screen h-screen flex flex-col p-[0.2rem]">
        
      {selectedMagazine ? (
          <div className="w-full h-screen flex flex-col bg-white text-black">
          <div className="flex-grow flex">
            {/* Left side content */}
            <div className="w-1/2 p-8 flex flex-col items-center justify-center">
              <button 
                className="text-sm text-gray-500 w-20 h-8 border border-gray-300 rounded-full mb-8"
                onClick={goToPreviousPage}
              >
                previous
              </button>
              <h1 className="text-5xl font-bold mb-2">WHATS AROUND? <span className="text-xs align-top bg-black text-white px-1 py-0.5 ml-2">New</span></h1>
              <h2 className="text-xl mb-4">MAGAZINE 03. SEP 02</h2>
              <p className="text-sm text-gray-600 max-w-md">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas dapibus tincidunt tortor et pharetra. Pellentesque congue dictum lacus.
              </p>
            </div>
    
            {/* Right side image */}
            <div className="w-1/2 relative">
              <Image
                src={data[currentPage].imageUrl}
                alt={`Magazine cover ${currentPage + 1}`}
                layout="fill"
                objectFit="cover"
              />
              <div className="absolute top-4 right-4 flex text-zinc-200 text-sm">
                <div className="rounded opacity-60 p-2 hover:bg-zinc-200 hover:text-zinc-900 mr-4">Download</div>
                <div className="rounded opacity-60 p-2 hover:bg-zinc-200 hover:text-zinc-900">Show fullscreen</div>
              </div>
            </div>
          </div>
    
          {/* Bottom navigation */}
          <div className="h-20 flex bg-transparent text-zinc-200">
            <div className="w-1/2 flex items-center bg-zinc-900 justify-center space-x-2">
              {data.map((_, index) => (
                <div key={index} className="flex items-center">
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer
                      ${index === currentPage ? 'bg-white text-black' : 'border border-white'}`}
                    onClick={() => goToPage(index)}
                  >
                    {index + 1}
                  </div>
                  {index < data.length - 1 && <div className="w-4 h-px bg-white mx-1"></div>}
                </div>
              ))}
            </div>
            <div className="w-1/2 flex items-center justify-center pr-8">
              <ArrowLeft 
                className="text-zinc-900 cursor-pointer mr-4" 
                size={30} 
                onClick={goToPreviousPage}
              />
              <ArrowRight 
                className="text-zinc-900 cursor-pointer" 
                size={30} 
                onClick={goToNextPage}
              />
            </div>
          </div>
        </div>
      ) : (
        <>
          <h1 className="text-4xl font-bold text-gray-600">WHATS AROUND?</h1>
          <h2 className="text-xl text-gray-600 mb-4">
            MAGAZINE {magazine.id < 10 ? `0${magazine.id}` : magazine.id}. {magazine.date}
          </h2>
          <p className="mb-4">{magazine.description}</p>
          <div className="w-full h-full relative">
            <Image
              src={`${base64Prefix}${magazine.media[0]}`}
              alt={magazine.title}
              layout="fill"
              objectFit="contain"
              className="rounded-lg"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default MagazineDetails;
