"use client";
import React, { useState } from "react";

const Myclubs = () => {
  const [clubs, Getclubs] = useState([
    { id: 1, name: "Coding" },
    { id: 2, name: "Painting" },
    { id: 3, name: "Photography" },
    { id: 4, name: "Competitions" },
    { id: 5, name: "Events" },
  ]);

  return (
    <div className="border border-gray-200 rounded m-2 p-4">
      <div>
        <h5 className="text-lg font-bold">My Clubs</h5>
      </div>
      <div className="text-left">
        {clubs.map((item) => (
          <p key={item.id} className="py-1">
            {item.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Myclubs;
