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
import React from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
// import { selectMagazine } from "@/lib/features/magazines/magazineSlice";
import { RootState } from "@/lib/store";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

// Sample magazine data type
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
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  // function handleMagazineClick(magazine: Magazine): void {
  //   dispatch(selectMagazine(magazine));
  // }

  return (
    <div className="w-screen h-screen p-4 flex flex-col">
      {selectedMagazine ? (
        <div className="w-full h-full mt-4">
          <Worker workerUrl={`https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`}>
            <Viewer
              // fileUrl={`${selectedMagazine.media[1]}`}
              fileUrl={base64Prefix + selectedMagazine.media[1]}
              plugins={[defaultLayoutPluginInstance]}
            />
          </Worker>
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
