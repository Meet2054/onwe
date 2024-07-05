import React from "react";
import { Event } from "../../lib/types/event";
import Image from "next/image";

interface ActiveComponentProps {
  currentEvent: Event | null;
  onClose: () => void;
}

const ActiveComponent: React.FC<ActiveComponentProps> = ({
  currentEvent,
  onClose,
}) => {
  if (!currentEvent) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 animate-scale-up transition-all">
      <div
        className="bg-black bg-opacity-50 absolute inset-0"
        onClick={onClose}
      ></div>
      <div className="bg-white p-6 rounded-lg shadow-lg z-50 space-y-4">
        <h2 className="text-xl font-bold mb-4">{currentEvent.title}</h2>
        <Image
          src={currentEvent.photo}
          //  objectFit="cover"
          alt="Background"
          width={400}
          height={400}
        />
        <p>{currentEvent.description}</p>
        {/* <button onClick={onClose} className="mt-4 p-2 bg-blue-500 text-white rounded-lg">Close</button> */}
      </div>
    </div>
  );
};

export default ActiveComponent;
