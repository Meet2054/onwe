import React, { useEffect, useState } from "react";
import PostAvatar from "@/components/post_component/PostAvatar";
import VoteBar from "./VoteBar";
import { Button } from "@/components/ui/button";
import { getData, getGlobalToken } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import useSWR from "swr";

interface PollOption {
  id: string;
  optionText: string;
  votes: number | null;
}

interface Poll {
  id: string;
  question: string;
  createdBy: string;
  PollOptions: PollOption[];
  userHasVoted: boolean;
}

interface pollPorps {
  id: number;
  title: string;
  username: string;
  avatar: string;
  options: {
    title: string;
    votes: number;
  }[];
}

const Page = ({ poll }: { poll: pollPorps }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { getToken } = useAuth();

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
    setSelectedOption(e.target.value);
  };

  const handlePollSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsTransitioning(true);
    setTimeout(() => {
      setIsSubmitted(true);
      setIsTransitioning(false);
    }, 500); // Transition duration (500ms)
  };

  if (data) {
    console.log(data);
  }
  return (
    <div className=" border  transition-all duration-500 ease-in-out w-[85%] m-1 p-5 rounded-lg shadow bg-[#F1F1F1] bg-white">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
        <PostAvatar />
        <span>rituisboy</span>
        </div>
        <div className="px-3 py-1 mr-2 bg-fuchsia-100 text-fuchsia-500  rounded-lg">
            Poll
          </div>
        
      </div>
    <div className="bg-articles-card-300 rounded-xl p-5 m-2 mt-3">
      <div className="font-bold px-3 pl-4 mb-4 bg-articles-card rounded-xl p-5 border shadow ">
        <span>{poll.title}</span>
      </div>

      <div
        className={`transition-opacity duration-500 ease-in-out ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
      >
        {isSubmitted ? (
          <div className="flex flex-col gap-2 px-5">
            {poll.options.map((data, index) => (
              <div key={index}>
                <div>{data.title}</div>
                <VoteBar value={(data.votes / 30) * 100} />
              </div>
            ))}
          </div>
        ) : (
          <form
            className="flex flex-col gap-2  px-5 pb-2"
            onSubmit={handlePollSubmit}
          >
            {poll.options.map((data, index) => (
              <div key={index} className="flex gap-3 items-center cursor-grab border rounded-md px-2 bg-new-bg shadow">
                <input
                  type="radio"
                  id={`option-${index}-${poll.id}`}
                  value={data.title}
                  name="poll-options"
                  className="text-black h-10 border cursor-grab"
                  onChange={handleOptionChange}
                />
                <label htmlFor={`option-${index}-${poll.id}`} className="cursor-grab w-full">
                  {data.title}
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
