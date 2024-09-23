// components/MagazineComponent.tsx
import React from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { selectMagazine } from "@/lib/features/magazines/magazineSlice";
import M from "./cover.jpg"


// Sample magazine data type
type Magazine = {
  id: number;
  title: string;
  date: string;
  description: string;
  media: string[]; // Assuming media is an array of strings
};

const MagazinesComponent: React.FC<{
  magazines: Magazine[];
  onSelect: (magazine: Magazine) => void;
}> = ({ magazines, onSelect }) => {
  const dispatch = useDispatch();


  return (
    <div className="p-1 bg-gray-100">
      {magazines.map((magazine) => (
        <div
          key={magazine.id}
          className="mb-8 p-2 cursor-pointer hover:bg-gray-200 flex flex-col items-center"
          onClick={() => onSelect(magazine)}
        >
          <div className="w-full h-48 relative">
            <Image
              src={M}              
              // src={magazine.media[0]} 
              alt={magazine.title}
              layout="fill"
              objectFit="cover"
              className="border rounded-xl"
            />
          </div>
          <h3 className="items-center text-md text-gray-400 font-bold">
            {magazine.title}
          </h3>
          <p className="text-xs text-gray-600">
            MAGAZINE {magazine.id < 10 ? `0${magazine.id}` : magazine.id}.{" "}
            {magazine.date}
          </p>
        </div>
      ))}
    </div>
  );
};

export default MagazinesComponent;
