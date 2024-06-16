import React from 'react';

const NavBar: React.FC = () => {
  return (
    <div className='fixed top-0 w-full bg-white shadow-md z-50 p-4'>
      <ul className='flex justify-between space-x-4'>
        <li>Upcoming Events</li>
        <li>Past Events</li>
      </ul>
    </div>
  );
}

export default NavBar;
