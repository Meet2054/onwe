import React from 'react';

interface ReceivedMessageProps {
  message: string;
}

const ReceivedMessage: React.FC<ReceivedMessageProps> = ({ message, }) => {
  return (
    <div className="flex justify-start">
      <div className="bg-gray-100 text-gray-700 p-3 rounded-full max-w-xs ml-20">
        {message}
      </div>
    </div>
  );
};

export default ReceivedMessage;
