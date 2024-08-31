import { Button } from "@/components/ui/button";
import React from "react";

interface pollProps {
  id: number;
  title: string;
  options: {
    title: string;
    votes: number;
  }[];
}

const RenderPoll = ({ poll }: { poll: pollProps }) => {
  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const handlePollSubmit = (e) => {};
  return (
    <div>
      <div>{poll.title}</div>
      <form className="flex flex-col gap-2" onSubmit={handlePollSubmit}>
        {poll.options.map((data, index) => (
          <div key={index} className="flex gap-3 items-center">
            <input
              type="radio"
              id={`option-${data}`}
              value={data.title}
              name="poll-options"
              className="text-black h-10 border"
              onChange={handleOptionChange}
            />
            <label htmlFor={`option-${data}`}>{data.title}</label>
          </div>
        ))}
        <Button>Submit</Button>
      </form>
    </div>
  );
};

export default RenderPoll;
