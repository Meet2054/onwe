import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

interface JoinProps {
  clubName: string;
}

const Join: React.FC<JoinProps> = ({ clubName }) => {
  const { getToken } = useAuth();
  const [message, setMessage] = useState<string>("");
  const router = useRouter()

  const handleJoinClub = async () => {
    try {
      const token = await getToken();
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/clubs/join`, 
        { clubName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );
      setMessage("Successfully joined the club!");
      router.push(`/clubs/${clubName}`)
      console.log(response.data); // Handle the response as needed
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
    <div className="join">
      <h2>Join the Club</h2>
      <p>You are not a part of <span className="bold">{clubName}</span>club. Please join to see the posts.</p>
      <button onClick={handleJoinClub}>Join</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Join;
