"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { useSignIn } from "@/hooks/useSignIn";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import Join from "@/components/clubs/Join";
import General from "@/components/clubs/General";
import Announcement from "@/components/clubs/Announcement";
import { PostsProps } from "@/types/type";
import GeneralAnnounce from "@/components/clubs/GeneralAnnounce";
import ClubCalendar from "@/components/clubs/ClubEvents";

const Page = () => {
  const params = useParams();
  const club = Array.isArray(params.club) ? params.club[0] : params.club;
  const tab = useSelector((state: RootState) => state.tab.tab);
  const { getToken } = useSignIn();

  // const [clubposts, setClubPosts] = useState<PostsProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<number | null>(null);
  const [admin, setAdmin] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getToken();
        // TODO : fetch using SWR
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/clubs/check/${club}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "69420",
            },
          }
        );
        // setClubPosts(response.data.posts);
        // console.log(clubposts);
        setAdmin(response.data.isAdmin);
        setError(null);
        setStatus(response.status);
      } catch (err: any) {
        if (err.response) {
          setError(err.response.data.message);
          setStatus(err.response.status);
        } else {
          setError("An unexpected error occurred");
          setStatus(null);
        }
        // setClubPosts([]);
      }
    };

    fetchData();
  }, [club, tab, getToken]);

  if (status === 404) {
    return (
      <div className="text-black flex justify-center items-center h-screen">
        Club does not exist
      </div>
    );
  }

  if (status === 403) {
    return <Join clubName={club} />;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!status) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="content h-full w-full">
          {/* <GeneralAnnounce club={club}/> */}
          <div className="w-full">
              <GeneralAnnounce club={club} isAdmin={admin}/>
          </div>
        {/* {tab === "general" ? (
          <General club={club} />
        ) : (
          // <General posts={clubposts} club={club} />
          <Announcement club={club} />
          // <Announcement posts={clubposts} club={club} isAdmin={admin} />
        )} */}
        {tab === "general" && <General club={club} />}
        {tab === "announcement" && <Announcement club={club} />}
        {tab === "events" && <ClubCalendar club={club} />}
      </div>
    );
  }
};

export default Page;
