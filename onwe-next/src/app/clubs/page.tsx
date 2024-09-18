import ClubCarousel from "@/components/clubs/ClubCarousel";
import PopularClubs from "@/components/clubs/PopularClubs";

export default function Component() {
  return (
    <div className="h-screen p-5">
      <ClubCarousel />
      <PopularClubs />
      <PopularClubs />
      <PopularClubs />
      <PopularClubs />
      <PopularClubs />
    </div>
  );
}
