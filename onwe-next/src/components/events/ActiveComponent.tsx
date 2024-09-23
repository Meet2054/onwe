import React from "react";
import { Event } from "../../lib/types/event";

interface ActiveComponentProps {
  currentEvent: Event | null;
  onClose: () => void;
}

const ActiveComponent: React.FC<ActiveComponentProps> = ({
  currentEvent,
  onClose,
}) => {
  if (!currentEvent) return null;

  // Determine the MIME type of the base64 string (assuming PNG, change as necessary)
  const base64Prefix = 'data:image/png;base64,';

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 animate-scale-up transition-all">
      <div
        className="bg-black bg-opacity-50 absolute inset-0"
        onClick={onClose}
      ></div>
      <div className="bg-white p-6 rounded-lg shadow-lg z-50 space-y-4">
        <h2 className="text-xl font-bold mb-4">{currentEvent.title}</h2>
        <img
          src={currentEvent.media[0]}
          alt="Background"
          width={400}
          height={400}
        />
        <p>{currentEvent.description}</p>
      </div>
    </div>
  );
};

export default ActiveComponent;

