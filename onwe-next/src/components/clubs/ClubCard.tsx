import React from "react";
import Link from "next/link";
import { ClubCardProps } from "@/types/type";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

interface props {
  club: ClubCardProps;
  showJoin?: boolean;
}

const ClubCard: React.FC<props> = ({ club, showJoin }) => {
  // const base64Prefix = "data:image/png;base64,";
  const imageSrc = `data:image/png;base64,${club.coverImage}`;
  const pathname = usePathname();

  const isActive = (path: string) => pathname.includes(path);

  return (
    <div
      className={cn(
        "flex justify-between items-center  hover:bg-gray-300 transition-all",
        {
          "bg-gray-300 rounded-md": isActive(club.clubName),
          "hover:scale-105": !isActive(club.clubName),
        }
      )}
    >
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
      {showJoin && (
        <div className="rounded-full flex gap-1  bg-slate-200 mr-3 items-center px-2 py-1 text-xs">
          Join <Plus strokeWidth={1} size={15} />
        </div>
      )}
    </div>
  );
};

export default ClubCard;
