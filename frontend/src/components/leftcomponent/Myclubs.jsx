import React, { useState } from 'react';

const Myclubs = () => {
  const [clubs, Getclubs] = useState([
    { id: 1, name: 'Coding' },
    { id: 2, name: 'Painting' },
    { id: 3, name: 'Photography' },
    { id: 4, name: 'Competitions' },
    { id: 5, name: 'Events' },
  ]);

  return (
    <div className='border border-gray border-2 rounded m-2 p-4 Myclubs'>
      <div >
        <h5 className='heading-trending'>My Clubs</h5>
      </div>
      <div className='text-leftsection'>
        {clubs.map(item => (
          <p key={item.id} className='trending-p py-1'>{item.name}</p>
        ))}
      </div>
    </div>
  );
}

export default Myclubs;
