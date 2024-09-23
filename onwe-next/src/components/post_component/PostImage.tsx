import Image from "next/image";
import React, { useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { checkVidImg } from "@/lib/utils";
import { fill } from "lodash";
// import { base64Prefix } from "@/lib/utils";

const YourComponent = ({ image, fill }: { image: string; fill: string }) => {
  const [isMuted, setIsMuted] = useState(true);

  const handleVideoClick = (event: React.MouseEvent<HTMLVideoElement>) => {
    const videoElement = event.currentTarget;
    setIsMuted(!isMuted); // Toggle mute
    videoElement.muted = !isMuted; // Sync with state
  };

  return checkVidImg(image) === 0 ? (
    <Image
      contextMenu="return false;"
      src={image}
      layout="fill"
      objectFit={fill}
      alt="Image"
      // className="object-cover w-full h-[500px] pointer-events-none rounded-lg"
    />
  ) : (
    <video
      src={image}
      muted={isMuted}
      autoPlay
      loop
      onClick={handleVideoClick}
      className="object-contain w-full h-full rounded-lg"
    />
  );
};

const PostImage = ({
  className = "",
  images,
  fill,
}: {
  className?: string;
  images?: string[];
  fill: string;
}) => {
  // const base64toBlob = (
  //   base64Data: string,
  //   contentType = "",
  //   sliceSize = 512
  // ): Blob => {
  //   const byteCharacters = atob(base64Data);
  //   const byteArrays: Uint8Array[] = [];

  //   for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
  //     const slice = byteCharacters.slice(offset, offset + sliceSize);
  //     const byteNumbers = new Array(slice.length);
  //     for (let i = 0; i < slice.length; i++) {
  //       byteNumbers[i] = slice.charCodeAt(i);
  //     }
  //     const byteArray = new Uint8Array(byteNumbers);
  //     byteArrays.push(byteArray);
  //   }

  //   return new Blob(byteArrays, { type: contentType });
  // };

  return (
    // <div className={className}>
    <Carousel>
      <CarouselContent>
        {images?.map((image, index) => {
          // const blobUrl = URL.createObjectURL(
          //   base64toBlob(image, "image/jpeg")
          // );

          return (
            <CarouselItem key={index} className={className}>
              <YourComponent image={image} fill={fill} />
            </CarouselItem>
          );
        })}
      </CarouselContent>
      {images?.length! > 1 && (
        <div className="flex justify-center">
          <CarouselPrevious className="absolute left-1" />
          <CarouselNext className="absolute right-1" />
          <CarouselDots className="absolute bottom-0 mt-3 " />
        </div>
      )}
    </Carousel>
    // </div>
  );
};

export default PostImage;
