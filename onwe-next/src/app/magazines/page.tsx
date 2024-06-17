"use client";
import React, { useState } from "react";
import Image from "next/image";

// Sample magazine data type
type Magazine = {
  id: number;
  title: string;
  date: string;
  description: string;
  imageUrl: string;
};

// Sample magazine data
const magazines: Magazine[] = [
  {
    id: 1,
    title: "ONE MONTH OF ONWE",
    date: "AUG 02",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, possimus? Facilis, quos eos sed dolore a enim saepe alias in omnis numquam, laudantium beatae maxime sit praesentium, voluptates cumque architecto?",
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/b34f/fc85/560e295ba000c93b1152c7b15f99a547?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=VPmADhhJNKCaFiLhO6CJQQ-jM5lAPKmlm78dYwaaY5VVA5UfUpz13Ppjr2uaLL58xMo8gqz-V1s4730HK0O~ILE2OWCAah6kA7DoIJywhY8xMrBD0596TPHLt4Kp1kMpbDUdSjv~F8lZolG4pG1GqYaF72vF8FpI5HHyjSn9FSk2GA9UTStCw3TGLm2bcPRr1YTU19VuyWz3uFftxS18eBo6LBymUiIzq-7XocpF7TZbWj71nOPFbvwATgiegPS9amZnxfcMsRrsIW9HLipSLydMKwf5kR-lSsQlTbpisQoLfM8AbvlyYbtVSgfe73suXx-KbjbmuR5WhTUjfMJ7ug__",
  },
  {
    id: 2,
    title: "How It Started",
    date: "JULY 02",
    description: "Description for How It Started",
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/b34f/fc85/560e295ba000c93b1152c7b15f99a547?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=VPmADhhJNKCaFiLhO6CJQQ-jM5lAPKmlm78dYwaaY5VVA5UfUpz13Ppjr2uaLL58xMo8gqz-V1s4730HK0O~ILE2OWCAah6kA7DoIJywhY8xMrBD0596TPHLt4Kp1kMpbDUdSjv~F8lZolG4pG1GqYaF72vF8FpI5HHyjSn9FSk2GA9UTStCw3TGLm2bcPRr1YTU19VuyWz3uFftxS18eBo6LBymUiIzq-7XocpF7TZbWj71nOPFbvwATgiegPS9amZnxfcMsRrsIW9HLipSLydMKwf5kR-lSsQlTbpisQoLfM8AbvlyYbtVSgfe73suXx-KbjbmuR5WhTUjfMJ7ug__",
  },
  {
    id: 3,
    title: "Third Smaple magazine",
    date: "SEP 02",
    description: "Description for ",
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/b34f/fc85/560e295ba000c93b1152c7b15f99a547?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=VPmADhhJNKCaFiLhO6CJQQ-jM5lAPKmlm78dYwaaY5VVA5UfUpz13Ppjr2uaLL58xMo8gqz-V1s4730HK0O~ILE2OWCAah6kA7DoIJywhY8xMrBD0596TPHLt4Kp1kMpbDUdSjv~F8lZolG4pG1GqYaF72vF8FpI5HHyjSn9FSk2GA9UTStCw3TGLm2bcPRr1YTU19VuyWz3uFftxS18eBo6LBymUiIzq-7XocpF7TZbWj71nOPFbvwATgiegPS9amZnxfcMsRrsIW9HLipSLydMKwf5kR-lSsQlTbpisQoLfM8AbvlyYbtVSgfe73suXx-KbjbmuR5WhTUjfMJ7ug__",
  },
];

// Magazine Component to list all magazines
const MagazineComponent: React.FC<{
  magazines: Magazine[];
  onSelect: (magazine: Magazine) => void;
}> = ({ magazines, onSelect }) => {
  return (
    <div className="p-1 bg-gray-100">
      {magazines.map((magazine) => (
        <div
          key={magazine.id}
          className="mb-8 p-2 cursor-pointer hover:bg-gray-200 flex flex-col items-center"
          onClick={() => onSelect(magazine)}
        >
          <div>
            <Image
              src={magazine.imageUrl}
              alt={magazine.title}
              layout="responsive"
              width={1}
              height={1}
              objectFit="contain"
              className="border rounded-xl "
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

// Magazine Details Component to show selected magazine details
const MagazineDetailsComponent: React.FC<{ magazine: Magazine }> = ({
  magazine,
}) => {
  return (
    <div className="w-screen h-screen p-4 flex flex-col">
      <h1 className="text-4xl font-bold text-gray-600">WHATS AROUND?</h1>
      {/* <h1 className="text-2xl font-bold">{magazine.title}</h1> */}
      <h2 className="text-xl text-gray-600 mb-4">
        MAGAZINE {magazine.id < 10 ? `0${magazine.id}` : magazine.id}.{" "}
        {magazine.date}
      </h2>
      <p className="mb-4">{magazine.description}</p>
      <div className=" w-full h-full relative">
        <Image
          src={magazine.imageUrl}
          alt={magazine.title}
          layout="fill"
          objectFit="contain"
          className="rounded-lg"
        />
      </div>
    </div>
  );
};

// Main Page Component
const Page: React.FC = () => {
  const [selectedMagazine, setSelectedMagazine] = useState<Magazine | null>(
    null
  );

  const handleSelectMagazine = (magazine: Magazine) => {
    setSelectedMagazine(magazine);
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-gray-100 overflow-y-auto border border-r-2 flex flex-col items-center">
        <h1 className="mt-4 w-1/2 border rounded-xl border-gray-400 flex justify-center items-center hover:bg-slate-400">
          Previous
        </h1>
        <MagazineComponent
          magazines={magazines}
          onSelect={handleSelectMagazine}
        />
      </div>
      <div className="w-3/4 overflow-y-auto flex">
        {selectedMagazine ? (
          <MagazineDetailsComponent magazine={selectedMagazine} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 ml-80">
              Select a magazine to see the details
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
