import React from "react";
import Link from "next/link";
import { ClubCardProps } from "@/types/type";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Image from "next/image";

interface props {
  club: ClubCardProps;
  showJoin?: boolean;
  isJoined?: boolean;
}

const ClubCard: React.FC<props> = ({ club, showJoin, isJoined }) => {
  // const base64Prefix = "data:image/png;base64,";

  const pathname = usePathname();

  const isActive = (path: string) => pathname.includes(path);

  return (
    <div
      className={cn(
        "flex justify-between items-center  hover:bg-gray-300 transition-all ",
        {
          "bg-gray-300 rounded-md": isActive(club.clubName),
          "hover:scale-105": !isActive(club.clubName),
        }
      )}
    >
      <Link href={`/clubs/${club.clubName}`}>
        <div className={`flex items-center mt-2 ml-6 p-2`}>
          <div className="rounded-full bg-gray-300 h-10 w-10 mr-3 relative">
            <Image
              src={club.coverImage[0]}
              alt="cover"
              layout="fill"
              className="z-0
              "
            />
          </div>
          <div>
            <h2 className="text-xl font-bold">{club.clubName}</h2>
            {/* <img src="" alt="" /> */}
          </div>
        </div>
      </Link>
      {showJoin && isJoined && (
        <div className="rounded-full flex gap-1  bg-slate-200 mr-3 items-center px-2 py-1 text-xs">
          Joined
        </div>
      )}
    </div>
  );
};

export default ClubCard;
