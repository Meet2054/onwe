import React, { useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Magazine = {
  id: number;
  title: string;
  date: string;
  description: string;
  media: string[];
};

const MagazineDetails: React.FC<{ magazine: Magazine }> = ({ magazine }) => {
  const selectedMagazine = useSelector((state: RootState) => state.magazine.selectedMagazine);
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = magazine.media.length;

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 2, totalPages - 1));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 2, 0));
  };

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const lastPage = totalPages - 1;
    
    // Always show first page
    pageNumbers.push(
      <PageNumber key={0} pageNum={1} currentPage={currentPage} onClick={() => goToPage(0)} />
    );

    if (currentPage <= 2) {
      // First few pages: show 1 3 5 ... <lastPage>
      for (let i = 3; i <= 5 && i < lastPage; i += 2) {
        pageNumbers.push(
          <PageNumber key={i} pageNum={i} currentPage={currentPage} onClick={() => goToPage(i - 1)} />
        );
      }
      if (lastPage > 6) {
        pageNumbers.push(<span key="ellipsis">...</span>);
      }
    } else if (currentPage >= lastPage - 2) {
      // Last few pages: show 1 ... <lastOddNum-4> <lastOddNum-2> <lastOddNum> <lastPage>
      pageNumbers.push(<span key="ellipsis">...</span>);
      const lastOddNum = lastPage - (lastPage % 2 === 0 ? 1 : 0);
      for (let i = lastOddNum - 4; i <= lastOddNum; i += 2) {
        if (i > 1) {
          pageNumbers.push(
            <PageNumber key={i} pageNum={i} currentPage={currentPage} onClick={() => goToPage(i - 1)} />
          );
        }
      }
    } else {
      // Middle pages: show 1 ... <prevOdd> <currentOdd> <nextOdd> ... <lastPage>
      pageNumbers.push(<span key="ellipsis1">...</span>);
      const currentOdd = currentPage + 1 - (currentPage % 2);
      for (let i = currentOdd - 2; i <= currentOdd + 2; i += 2) {
        if (i > 1 && i < lastPage) {
          pageNumbers.push(
            <PageNumber key={i} pageNum={i} currentPage={currentPage} onClick={() => goToPage(i - 1)} />
          );
        }
      }
      if (currentOdd + 2 < lastPage - 1) {
        pageNumbers.push(<span key="ellipsis2">...</span>);
      }
    }

    // Always show last page if it's not already shown
    const lastElement = pageNumbers[pageNumbers.length - 1];
    if (lastPage > 0 && (typeof lastElement === 'string' || lastElement.props.pageNum !== lastPage + 1)) {
      pageNumbers.push(
        <PageNumber key={lastPage} pageNum={lastPage + 1} currentPage={currentPage} onClick={() => goToPage(lastPage)} />
      );
    }

    return pageNumbers;
  };

  const renderContent = () => {
    if (currentPage === 0) {
      return (
        <>
          <div className="w-1/2 p-8 flex flex-col items-center justify-center">
            <h1 className="text-5xl font-bold mb-2">WHATS AROUND? <span className="text-xs align-top bg-black text-white px-1 py-0.5 ml-2">New</span></h1>
            <h2 className="text-xl mb-4">MAGAZINE 03. SEP 02</h2>
            <p className="text-sm text-gray-600 max-w-md">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas dapibus tincidunt tortor et pharetra. Pellentesque congue dictum lacus.
            </p>
          </div>
          <div className="w-1/2 relative">
            <Image
              src={magazine.media[totalPages - 1]}
              alt={`Magazine cover ${totalPages}`}
              layout="fill"
              objectFit="cover"
            />
          </div>
        </>
      );
    } else if (currentPage === totalPages - 1) {
      return (
        <>
          <div className="w-1/2 relative">
            <Image
              src={magazine.media[0]}
              alt={`Magazine cover 1`}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="w-1/2 p-8 flex flex-col items-center justify-center">
            <h1 className="text-5xl font-bold mb-2">Thank You</h1>
            <p className="text-sm text-gray-600 max-w-md">
              We hope you enjoyed this issue of WHATS AROUND?
            </p>
          </div>
        </>
      );
    } else {
      const leftPageIndex = totalPages - 1 - currentPage;
      const rightPageIndex = totalPages - 2 - currentPage;
      return (
        <>
          <div className="w-1/2 relative">
            <Image
              src={magazine.media[leftPageIndex]}
              alt={`Magazine cover ${leftPageIndex + 1}`}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="w-1/2 relative">
            <Image
              src={magazine.media[rightPageIndex]}
              alt={`Magazine cover ${rightPageIndex + 1}`}
              layout="fill"
              objectFit="cover"
            />
          </div>
        </>
      );
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col p-[0.2rem]">
      <div className="w-full h-screen flex flex-col bg-white text-black">
        <div className="flex-grow flex">
          {renderContent()}
        </div>
        <div className="h-20 flex bg-transparent text-zinc-200">
          <div className="w-full flex items-center bg-zinc-900 justify-between">
            <div className={`w-1/${currentPage === 0 || currentPage === totalPages - 1 ? '2' : '3'} flex justify-center`}>
              {currentPage > 1 && (
                <ArrowLeft 
                  className="text-white cursor-pointer" 
                  size={30} 
                  onClick={goToPreviousPage}
                />
              )}
            </div>
            <div className={`w-1/${currentPage === 0 || currentPage === totalPages - 1 ? '2' : '3'} flex justify-center items-center space-x-2`}>
              {renderPageNumbers()}
            </div>
            <div className={`w-1/${currentPage === 0 || currentPage === totalPages - 1 ? '2' : '3'} flex justify-center`}>
              {currentPage < totalPages - 2 && (
                <ArrowRight 
                  className="text-white cursor-pointer" 
                  size={30} 
                  onClick={goToNextPage}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PageNumber: React.FC<{ pageNum: number; currentPage: number; onClick: () => void }> = ({ pageNum, currentPage, onClick }) => (
  <div 
    className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer
      ${pageNum - 1 === currentPage ? 'bg-white text-black' : 'border border-white text-white'}`}
    onClick={onClick}
  >
    {pageNum}
  </div>
);

export default MagazineDetails;