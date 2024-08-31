import React, { useState } from "react";
import PostAvatar from "@/components/post_component/PostAvatar";
import VoteBar from "./VoteBar";
import { Button } from "@/components/ui/button";

const Page = ({ poll }: {}) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

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

  return (
    <div className="border transition-all duration-500 ease-in-out">
      <div className="flex items-center gap-3  ">
        <PostAvatar />
        <span>rituisboy</span>
      </div>

      <div className="font-bold p-2 ">
        <span>{poll.title}</span>
      </div>

      <div
        className={`transition-opacity duration-500 ease-in-out ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
      >
        {isSubmitted ? (
          <div className="flex flex-col gap-2 px-5 py-2">
            {poll.options.map((data, index) => (
              <div key={index}>
                <div>{data.title}</div>
                <VoteBar value={(data.votes / 30) * 100} />
              </div>
            ))}
          </div>
        ) : (
          <form
            className="flex flex-col gap-2  px-5 py-2"
            onSubmit={handlePollSubmit}
          >
            {poll.options.map((data, index) => (
              <div key={index} className="flex gap-3 items-center ">
                <input
                  type="radio"
                  id={`option-${index}-${poll.id}`}
                  value={data.title}
                  name="poll-options"
                  className="text-black h-10 border"
                  onChange={handleOptionChange}
                />
                <label htmlFor={`option-${index}-${poll.id}`}>
                  {data.title}
                </label>
              </div>
            ))}
            <Button
              disabled={selectedOption.length == 0 ? true : false}
              type="submit"
            >
              Submit
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Page;
