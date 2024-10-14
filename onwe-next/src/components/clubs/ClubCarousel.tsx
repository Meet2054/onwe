import React from "react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
const ClubCarousel = () => {
  const arr = ["image.jpg", "katana_zero.jpg", "berserk.jpg"];
  return (
    <Carousel className="relative">
      <CarouselContent>
        {arr.map((val, index) => (
          <CarouselItem
            key={index}
            className="flex justify-center items-center"
          >
            <div
              className={`relative w-full h-96 rounded`}
              // style={{ backgroundImage: `/images/club_carousel/${val}` }}
            >
              <Image
                src={`/images/club_carousel/${val}`}
                alt="image"
                fill
                objectFit="cover"
                className="rounded-lg"
              />
              <div className="absolute inset-0 flex justify-center items-end py-4 ">
                <Button
                  variant={"secondary"}
                  className="z-10 space-x-1 rounded-md  py-0 px-3 "
                >
                  <span>Join Now</span> <ArrowRight size={20} />
                </Button>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 h-full w-10 rounded-sm ml-3 hover:border-black" />
      <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 h-full w-10 rounded-sm hover:border-black" />
      <CarouselDots className=" absolute  -bottom-3" />
    </Carousel>
  );
};

export default ClubCarousel;
