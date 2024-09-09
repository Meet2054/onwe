import React from "react";
import Link from "next/link";
import { ClubCardProps } from "@/types/type";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface props {
  club: ClubCardProps;
}



const ClubCard: React.FC<props> = ({ club }) => {
  // const base64Prefix = "data:image/png;base64,";
  const imageSrc = `data:image/png;base64,${club.coverImage}`;
  const pathname = usePathname();

  const isActive = (path: string) => pathname.includes(path);
  console.log(club)
  return (

    <div className={cn(" hover:bg-gray-300 transition-all",{
      "bg-gray-300 rounded-md":isActive(club.clubName),
      "hover:scale-105":!isActive(club.clubName),
    })}>
      <Link href={`/clubs/${club.clubName}`}>
        <div className={`flex items-center mt-2 ml-6 p-2`}>
          <div
            className="rounded-full bg-gray-300 h-10 w-10 mr-3"
            style={{
              backgroundImage: `url(${imageSrc})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <div>
            <h2 className="text-sm font-bold">{club.clubName}</h2>
            {/* <img src="" alt="" /> */}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ClubCard;
