"use client";
import { useState } from "react";

const Announce = () => {
  const [clubs, Getclubs] = useState([
    { id: 4, name: "Competitions" },
    { id: 5, name: "Events" },
  ]);

  return (
    <div className="border border-gray-200 rounded m-2 p-4">
      <div>
        <h5 className="text-xl font-bold">Announcements</h5>
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

export default Announce;
