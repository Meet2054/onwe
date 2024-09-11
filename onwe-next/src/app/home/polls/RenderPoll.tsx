import React, { useEffect, useState } from "react";
import PostAvatar from "@/components/post_component/PostAvatar";
import VoteBar from "./VoteBar";
import { Button } from "@/components/ui/button";
import { getData, getGlobalToken } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import useSWR from "swr";
import axios from "axios";

interface PollOption {
  id:number;
  optionText: string;
  votes: number;
  userHasVoted: boolean
}

//  

interface pollPorps {
  id: number;
  question: string;
  createdBy: string;
  userHasVoted: boolean;
  PollOptions: PollOption[];
}

const Page = ({ poll }: { poll: pollPorps }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { getToken } = useAuth();
  const [totalVotes, setTV]=useState(0)
  const [voted, setVoted]=useState(false)
  // get polls
  const fetcher = async (url: string) => {
    try {
      const token = await getToken({ template: "test" });
      if (!token) throw new Error("No token found");
      return getData(
        url,
        { headers: { Authorization: `Bearer ${token}` } },
        "GET"
      );
    } catch (err) {
      throw err;
    }
  };
  const { data, isLoading } = useSWR("/polls", fetcher);

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.id);
  };

  const handlePollSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsTransitioning(true);
    try {
      //
      
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/polls/${poll.id}/vote`,
        {
          "optionId": selectedOption
        }
        , {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
          },
        });
      // console.log( Object.fromEntries(formData))
      console.log("Post successful:", response.data);
      if(response.data==="Vote counted"){
        setIsSubmitted(true);
        setVoted(true)
        setTV((total)=>total+1)
      }
    } catch (error) {
      console.error("Error posting data:", error);
    }
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500); // Transition duration (500ms)
  };

  useEffect(() => {
    const countingtotal = async () => {
      let totalVotesCount = 0;
  
      // Sum up all votes in one go
      poll.PollOptions.forEach((option) => {
        totalVotesCount += option.votes;
      });
  
      // Set the totalVotes state after calculation
      setTV(totalVotesCount);
      
      // Log the values for debugging
    };
  
    countingtotal();
    setVoted(poll.userHasVoted)
  }, [poll]); 

  
  return (
    <div className=" border  transition-all duration-500 ease-in-out w-[85%] m-1 p-5 rounded-lg shadow bg-[#F1F1F1] bg-white">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
        <PostAvatar />
        <span>Single Poll</span>
        </div>
        <div className="px-3 py-1 mr-2 bg-fuchsia-100 text-fuchsia-500  rounded-lg">
            Poll
          </div>
        
      </div>
    <div className="bg-articles-card-300 rounded-xl p-5 m-2 mt-3">
      <div className="font-bold px-3 pl-4 mb-4 bg-articles-card rounded-xl p-5 border shadow ">
        <span>{poll.question}</span>
        {/* <span>Is Pole Ready?</span> */}
      </div>

      <div
        className={`transition-opacity duration-500 ease-in-out ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
      >
        {voted ? (
          <div className="flex flex-col gap-2 px-5">
            {poll.PollOptions.map((data) => (
              <div key={data.id}>
                <div>{data.optionText}</div>
                <VoteBar value={(data.votes / (totalVotes )) * 100} />
              </div>
            ))}
          </div>
        ) : (
          <form
            className="flex flex-col gap-2  px-5 pb-2"
            onSubmit={handlePollSubmit}
          >
            {poll.PollOptions.map((data) => (
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
              disabled={selectedOption.length == 0 ? true : false}
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
