import React from 'react'
import { useState } from 'react';
const Announce = () => {
    const [clubs, Getclubs] = useState([,
        { id: 4, name: 'Competitions' },
        { id: 5, name: 'Events' },
      ]);
  return (
    <div className='border border-gray border-2 rounded m-2 p-4'>
      <div >
        <h5 className='heading-trending'>Announcements</h5>
      </div>
      <div className='text-leftsection'>
        {clubs.map(item => (
          <p key={item.id} className='trending-p py-1'>{item.name}</p>
        ))}
      </div>
    </div>
  )
}

export default Announce