"use client";
import ClubCarousel from "@/components/clubs/ClubCarousel";
import PopularClubs, { Club } from "@/components/clubs/PopularClubs";

// const fetcher = (url: string) =>
//   fetch(process.env.NEXT_PUBLIC_API_URL + url).then((res) => res.json());

export default function Component() {
  return (
    <div className="h-screen p-5">
      <ClubCarousel />
      <PopularClubs type={"/trending"} />
      <PopularClubs type={"/clubs/all"} />
    </div>
  );
}
