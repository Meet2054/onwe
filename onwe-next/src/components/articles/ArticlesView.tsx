"use client"

import React from "react"
import { MdOutlineKeyboardBackspace } from "react-icons/md";


interface ArticleViewProps {
    owner: string;
    createdAt: string;
    title: string;
    description: string;
    imageUrl: string;
    onBack: () => void;
  }
  
  const ArticleView: React.FC<ArticleViewProps> = ({
    owner,
    createdAt,
    title,
    description,
    imageUrl,
    onBack,
  }) => {
    return (
      <div className="flex flex-col px-6 pt-4 pb-3 mt-2 w-full h-[90vh] overflow-auto scrollbar-custom font-source-serif text-custom-brown-700 rounded-xl max-md:pl-5 max-md:max-w-full bg-custom-gradient">
    <div className="flex flex-wrap gap-10 justify-between items-center w-full max-md:max-w-full">
      <button
        onClick={onBack}
        style={{ fontSize: '36px', cursor: 'pointer' }}
      >
        <MdOutlineKeyboardBackspace />
      </button>
  
      <div className="flex gap-4 justify-center self-stretch my-auto font-medium text-black">
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/fa0db432333a92b264091df6d869605d89f8244515c5d9b879259b249afba747?placeholderIfAbsent=true&apiKey=fa090b16b04649b4a5024c30e95337f0" className="object-contain shrink-0 my-auto w-7 rounded-2xl aspect-square" alt="Author avatar" />
        <div className="text-base w-[72px] break-words whitespace-normal">{owner}</div>
        <div className="text-sm text-right w-[47px] break-words whitespace-normal">{createdAt.slice(0,10)}</div>
      </div>
    </div>
  
    <div className="flex flex-col overflow-y-auto scrollbar-custom h-full mt-8 ml-4 max-md:mr-2 max-md:max-w-full">
      <div className="flex gap-10 items-start min-h-[370px]">
        <img loading="lazy" src={imageUrl} className="object-cover rounded aspect-[1.71] w-[626px] h-[366px] max-md:w-full max-md:h-auto" alt="Article image" />
        <div className="flex flex-col max-w-[666px] w-full">
          <div className="text-custom-brown text-3xl font-bold break-words whitespace-normal">{title}</div>
          <div className="mt-3 text-base font-source-serif text-black break-words whitespace-normal">
            {description.slice(0, 1350)}
          </div>
        </div>
      </div>
      <div className="mt-1 text-base font-source-serif text-black break-words whitespace-normal">
        {description.slice(1350)}
      </div>
    </div>
  </div>
  
  
    );
  };

  export default ArticleView;



//   import React, { useEffect, useRef } from 'react';

// interface PdfViewerProps {
//   src: string;
// }

// const PdfViewer: React.FC<PdfViewerProps> = ({ src }) => {
//   const iframeRef = useRef<HTMLIFrameElement | null>(null);

//   useEffect(() => {
//     if (iframeRef.current) {
//       iframeRef.current.src = `https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(src)}`;
//     }
//   }, [src]);

//   return (
//     <iframe
//       ref={iframeRef}
//       frameBorder="0"
//       width="1280"
//       height="900"
//       title="PDF Viewer"
//     />
//   );
// };

// export default PdfViewer;


// using

// <div>
//       <PdfViewer src="compressed.tracemonkey-pldi-09.pdf" />
//     </div>