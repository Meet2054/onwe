import React from 'react';

interface SentMessageProps {
  message: string;
}

const SentMessage: React.FC<SentMessageProps> = ({ message }) => {
  return (
    <div className="flex justify-end">
      <div className="bg-blue-500 text-white p-3 rounded-lg max-w-xs mr-20 rounded-s-full rounded-se-full">
        {message}
      </div>

    </div>
  );
};

export default SentMessage;
