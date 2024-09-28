import React from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { selectMagazine } from "@/lib/features/magazines/magazineSlice";
import { ChevronRight } from 'lucide-react';

type Magazine = {
  id: number;
  title: string;
  date: string;
  description: string;
  media: string[];
  views?: number;
};

const MagazinesComponent: React.FC<{
  magazines: Magazine[];
  onSelect: (magazine: Magazine) => void;
}> = ({ magazines, onSelect }) => {
  const dispatch = useDispatch();

  return (
    <div className="p-2 bg-white">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <span className="bg-pink-200 text-pink-600 px-2 py-0.5 rounded-full text-xs font-bold mr-2">New</span>
          <h2 className="text-lg font-bold">Featured Content</h2>
        </div>
      </div>
      <p className="text-gray-600 text-xs mb-2">Top stories, interviews, and insights handpicked for you.</p>
      
      <div className="space-y-2">
        {magazines.map((magazine) => (
          <div
            key={magazine.id}
            className="cursor-pointer hover:bg-gray-100 rounded-lg overflow-hidden"
            onClick={() => onSelect(magazine)}
          >
            <div className="flex items-center">
              <div className="relative w-24 h-24 flex-shrink-0">
                <Image
                  src={magazine.media[magazine.media.length-1]}
                  alt={magazine.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
                <div className="absolute top-1 right-1 bg-orange-500 text-white px-1.5 py-0.5 rounded-full text-xs font-bold">
                  {magazine.views || 0}
                </div>
              </div>
              <div className="flex-grow px-2 py-1">
                <h3 className="text-sm font-bold">{magazine.title}</h3>
                <p className="text-xs text-gray-500">
                  MAGAZINE {magazine.id < 10 ? `0${magazine.id}` : magazine.id}. {magazine.date}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MagazinesComponent;