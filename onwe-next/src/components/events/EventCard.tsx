import React from 'react';
import Image from 'next/image';

interface EventCardProps {
  title: string;
  date: string;
  time: string;
  description: string;
  photos: string[];
}

const EventCard: React.FC<EventCardProps> = ({ title, date, time, description, photos }) => {
  return (
    <div className="w-full h-96 border rounded-lg shadow-md p-4"> {/* Set fixed height here */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold">{title}</h2>
        <div className="flex space-x-2">
          <button className="px-3 py-1 border rounded-full text-gray-700">add remainder</button>
          <button className="px-2 py-1 border rounded-full text-gray-700">i</button>
        </div>
      </div>
      <div className="text-gray-600 mb-4">
        {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase()}, {time}
      </div>
      <div className="flex space-x-2 mb-4">
      {photos.map((photo, index) => (
  <div key={index} className="w-1/2 h-48 bg-gray-200 rounded-lg relative overflow-hidden">
    <Image 
      src={photo} 
      alt={`Event ${index + 1}`} 
      layout="fill" 
      objectFit="cover" 
      objectPosition="center center" 
      className="rounded-lg" 
    />
  </div>
))}




      </div>
      <div className="text-gray-700 mb-4">
        {description}
      </div>
      <div className="flex justify-end">
        <button className="text-gray-700">save</button>
      </div>
    </div>
  );
};

export default EventCard;
