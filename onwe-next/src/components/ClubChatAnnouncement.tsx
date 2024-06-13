import React from "react";
import SentMessage from "./chat/SentMessage";
import ReceivedMessage from "./chat/ReceiveMessage";
import InputMessage from "./chat/InputMessage";

const ClubChatAnnouncement: React.FC = () => {
  return (
    <div className="flex flex-col w-screen h-screen max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex items-center border-b pb-2 w-full">
        <div className="flex w-1/2 justify-center">
          <button className="font-bold text-lg text-gray-500 hover:text-black p-2">
            Chats
          </button>
        </div>
        <div className="flex w-1/2 justify-center">
          <button className="text-gray-500 text-lg p-2">Announcements</button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 scrollbar-hide">
        <div className="flex flex-col space-y-4">
          <ReceivedMessage message="ewm ew ewekewew e" />
          <SentMessage message="new messageejbkjbkjbk" />
          <ReceivedMessage message="lke eje wm em,we ,wme ew ew,e j" />
          <SentMessage message="kjkjkjbmnewj, n.nlkd cwd wedwedewewedfweffff" />
          <ReceivedMessage message="lke eje wm em,we ,wme ew ew,e j" />
          <SentMessage message="kjkjkjbmnewj, n.nlkd cwd wedwedewewedfweffff" />
          <ReceivedMessage message="lke eje wm em,we ,wme ew ew,e j" />
          <SentMessage message="onwe onwwe wkrnioawbfnioswnbfpin" />
          <ReceivedMessage message="ewm ew ewekewew e" />
          <SentMessage message="new messageejbkjbkjbk" />
          <ReceivedMessage message="lke eje wm em,we ,wme ew ew,e j" />
          <SentMessage message="kjkjkjbmnewj, n.nlkd cwd wedwedewewedfweffff" />
          <ReceivedMessage message="lke eje wm em,we ,wme ew ew,e j" />
          <SentMessage message="kjkjkjbmnewj, n.nlkd cwd wedwedewewedfweffff" />
          <ReceivedMessage message="lke eje wm em,we ,wme ew ew,e j" />
          <SentMessage message="onwe onwwe wkrnioawbfnioswnbfpin" />
        </div>
      </div>
      <InputMessage />
    </div>
  );
};

export default ClubChatAnnouncement;
