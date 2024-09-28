import React, { useEffect, useState } from "react";
import PostAvatar from "@/components/post_component/PostAvatar";
import VoteBar from "./VoteBar";
import { Button } from "@/components/ui/button";
import { getData } from "@/lib/utils";
import useSWR from "swr";
import axios from "axios";
import { useSignIn } from "@/hooks/useSignIn";

interface PollOption {
  id: number;
  optionText: string;
  votes: number;
}

interface PollProps {
  id: number;
  question: string;
  createdBy: string;
  userHasVoted: boolean;
  PollOptions: PollOption[];
  avatar: string;
  
}

const Page = ({ poll }: { poll: PollProps, isDeleted:boolean }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { getToken, getUsername } = useSignIn();
  const [pollOptions, setPollOptions] = useState(poll.PollOptions); // Keep track of poll options state
  const [voted, setVoted] = useState(poll.userHasVoted);
  const [totalVotes, setTotalVotes] = useState(
    poll.PollOptions.reduce((acc, option) => acc + option.votes, 0) // Calculate initial total votes
  );

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.id);
  };

  const handlePollSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsTransitioning(true);
    try {
      const token =  getToken();
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/polls/${poll.id}/vote`,
        {
          optionId: selectedOption,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );

      if (response.status === 201) {
        setIsSubmitted(true);
        setVoted(true);

        // Update the vote count dynamically
        const updatedOptions = pollOptions.map((option) => {
          if (option.id === parseInt(selectedOption)) {
            return { ...option, votes: option.votes + 1 };
          }
          return option;
        });

        // Update total votes and poll options
        setTotalVotes(totalVotes + 1);
        setPollOptions(updatedOptions);
      }
    } catch (error) {
      console.error("Error posting data:", error);
    }
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500); // Transition duration (500ms)
  };

  const deletePoll = async () => {
    try {
      const token =  getToken();
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/polls/${poll.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );
      if (response.status === 200) {
        console.log("Poll deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  return (
    <div className="border transition-all duration-500 ease-in-out w-[85%] m-1 p-5 rounded-lg shadow bg-[#F1F1F1] bg-white">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <PostAvatar imageUrl={poll.avatar} />
          <span>{poll.createdBy}</span>
        </div>
        {poll.createdBy===getUsername()?<div onClick={deletePoll} className="px-3 py-1 mr-2 bg-red-100 text-red-500 rounded-lg">
          Delete
        </div>:
          <div className="px-3 py-1 mr-2 bg-fuchsia-100 text-fuchsia-500 rounded-lg"></div>
        }
      </div>
      <div className="bg-articles-card-300 rounded-xl p-5 m-2 mt-3">
        <div className="font-bold px-3 pl-4 mb-4 bg-articles-card rounded-xl p-5 border shadow ">
          <span>{poll.question}</span>
        </div>

        <div
          className={`transition-opacity duration-500 ease-in-out ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
        >
          {voted ? (
            <div className="flex flex-col gap-2 px-5">
              {pollOptions.map((data) => (
                <div key={data.id}>
                  <div>{data.optionText}</div>
                  <VoteBar value={(data.votes / totalVotes) * 100} /> {/* Dynamic progress */}
                </div>
              ))}
            </div>
          ) : (
            <form className="flex flex-col gap-2 px-5 pb-2" onSubmit={handlePollSubmit}>
              {pollOptions.map((data) => (
                <div key={data.id} className="flex gap-3 items-center cursor-grab border rounded-md px-2 bg-new-bg shadow">
                  <input
                    type="radio"
                    id={`${data.id}`}
                    value={data.optionText}
                    name="poll-options"
                    className="text-black h-10 border cursor-grab"
                    onChange={handleOptionChange}
                  />
                  <label htmlFor={`option-${data.id}-${poll.id}`} className="cursor-grab w-full">
                    {data.optionText}
                  </label>
                </div>
              ))}
              <Button
                disabled={selectedOption.length === 0}
                type="submit"
              >
                VOTE
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
