import Image from "next/image";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const PostImage = ({ className = "" }: { className?: string }) => {
  const images = ["/img.svg", "/img.svg", "/img.svg", "/img.svg", "/img.svg"];
  return (
    // <div className={className}>
    <Carousel>
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index} className={className}>
            <Image src={image} layout="fill" objectFit="none" alt="Image" />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
    // </div>
  );
};

export default PostImage;
