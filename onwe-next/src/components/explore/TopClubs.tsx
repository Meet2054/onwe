import React, { useEffect, useState } from "react";
import Club from "./Club"; // Assuming Club component is in the same directory
import { useAuth } from "@clerk/nextjs";
interface Club{
  id: string,
  name: string,
  slogan: string,
  coverImage: string,
}
import axios from "axios";

const TopClubs: React.FC = () => {
  // const topClubs = [
  //   {
  //     coverImage:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxJUGTMD96Sm5qSH5lVySE52Fn-Q7rZ5Uh7w&s",
  //     Name: "Adventure",
  //     slogan: "Explore the unexplored",
  //   },
  //   {
  //     coverImage:
  //       "https://s3-alpha-sig.figma.com/img/9844/1699/fe650196bc5b5e10e697b8e5c1a2c6a7?Expires=1721001600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=TIZiATfiCamhS-QjhktWP7kjhK5qB54AAC040tr~38AolV8ZWNp1CnxnnjDcID~wX~QgvRi8p6AMHb~qWA3TpAlkovF1KfCc~EgYzT4J4gUU5XcQuBn87apb~8SUHivenxHmxLQSk2FxxxmQH9x4~~uVZrS5a9c8UY02NTd-8nJCMPbEjkPpqBnDm~OcWRkmNM32MBehT~3CwldomoLtz79AaFDefLSr2iIlr2bFL~ggC8cqltIBQKh4Tx5RQPWN3QnZEavh-eKqZvcKk-lHewgxYDVd2YaJVwD0zNtTtfTGD1Tfn-6bYrlkjRV-Pc-VyeGYriy3KXKQ-3ZjQHsIBQ__",
  //     Name: "Sports",
  //     slogan: "Get active and compete",
  //   },
  //   {
  //     coverImage:
  //       "https://s3-alpha-sig.figma.com/img/1d84/a113/5297444437a9094b28ba5a7719b140b1?Expires=1721001600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=K7JczNOw2pnT8IXpiEs3Z~~M0dwvJK-CJ-UdmXFYI106R-nmRJaU6azB-tmn327SYniH7WfSdHjswDb4seSuxWVdYgIj461v4bTJu7CSB8wW6VtnuLbuSi2-CSq8W7RsajO9YMQCXsepTS7OIVmyn7Y95Z5DaY-oxAvxn7vibP9XIRkbil8KNYkKgERk~9b35oMQ5nwdF3jgcMtny3KFM~iMzIPi4XnXoJk~tV1A-T7y-CV0eLMxpI7gaThc~azVZEXmG6zTjj8uEAd3l4zq1J9hnA-8DCcLaZYK2AZkFfg-7-Tzy~m7XQW~xOQIZnKW8Y0Eq9PxqiUa1Yw7xLfRFg__",
  //     Name: "Tech",
  //     slogan: "Innovate the future",
  //   },
  // ];
  const [clubs,setClubs] = useState<Club[]>()
  const {getToken} = useAuth()

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/topclubs`, {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
            "ngrok-skip-browser-warning": "69420"
          },
        });
        setClubs(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [getToken]);



  return (
    <div className="w-full p-4 h-full">
      <div className="px-5 h-full">
        <div className="flex gap-4 overflow-hidden h-full">
          {clubs?.map((club, index) => (
            <Club key={index} club={club} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopClubs;
