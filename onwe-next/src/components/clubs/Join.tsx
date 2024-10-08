import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSignIn } from "@/hooks/useSignIn";
import { useSWRConfig } from "swr";

interface JoinProps {
  clubName: string;
}

const Join: React.FC<JoinProps> = ({ clubName }) => {
  const { getToken } = useSignIn();
  const [message, setMessage] = useState<string>("");
  const { mutate } = useSWRConfig();
  const router = useRouter();

  const handleJoinClub = async () => {
    try {
      const token = getToken();
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/clubs/join`,
        { clubName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );
      setMessage("Successfully joined the club!");
      mutate("/myclubs");
      router.push(`/clubs/${clubName}`);
    } catch (error: any) {
      if (error.response) {
        setMessage(`Error: ${error.response.data.message}`);
      } else {
        setMessage("An unexpected error occurred");
      }
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      <div className="p-8 bg-white text-black rounded-lg shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl">
        {/* <h2 className="text-xl font-extrabold mb-4 text-center">Join the Club</h2> */}
        <p className="mb-6 text-md text-center">
          You are not a part of <span className="font-bold">{clubName}</span>{" "}
          club. Please join to see the posts.
        </p>
        <button
          onClick={handleJoinClub}
          className="bg-black text-white py-3 px-6 rounded-full font-semibold hover:bg-white hover:text-black border border-black transition-colors duration-300"
        >
          Join
        </button>
        {message && (
          <p className="mt-4 text-lg font-semibold text-center text-green-500">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Join;
