import React from 'react';
import { MoveRight } from 'lucide-react';

const InputMessage: React.FC = () => {
  return (
    <div className="flex place-content-center mx-auto rounded-xl pt-2 w-1/2 bg-[#EDF3FA] mb-5">
      <input
        type="text"
        placeholder="Message..."
        className="flex-1 p-2 ml-2 bg-transparent border-none"
      />
      <button className="p-1 mr-4 bg-transparent">
        <MoveRight/>
      </button>
    </div>
  );
};

export default InputMessage;
