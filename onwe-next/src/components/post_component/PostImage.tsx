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
// import { base64Prefix } from "@/lib/utils";

const YourComponent = ({ image }: { image: string }) => {
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
      objectFit="contain"
      alt="Image"
      className="object-contain pointer-events-none"
    />
  ) : (
    <video
      src={image}
      muted={isMuted}
      autoPlay
      onClick={handleVideoClick}
      className="object-contain w-full h-full"
    />
  );
};

const PostImage = ({
  className = "",
  images,
}: {
  className?: string;
  images?: string[];
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
              <YourComponent image={image}/>
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
