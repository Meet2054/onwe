import Link from 'next/link';
import React from 'react';

const ClubSideBar = () => {
  return (
    <div className="h-screen w-44 bg-gray-100 p-4 justify-center">
      <div>
        <h2 className="text-blue-500 font-bold mb-2">Trending</h2>
        <ul className="mb-4">
          <li className="mb-2">
            <Link href="/club/coding" className="text-gray-700 hover:text-black">
              Coding
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/club/photography" className="text-gray-700 hover:text-black">
              Photography
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/club/competitions" className="text-gray-700 hover:text-black">
              Competitions
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <h2 className="text-blue-500 font-bold mb-2">My clubs</h2>
        <ul>
          <li className="mb-2">
            <Link href="/club/coding" className="text-gray-700 hover:text-black">
              Coding
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/club/painting" className="text-gray-700 hover:text-black">
              Painting
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/club/photography" className="text-gray-700 hover:text-black">
              Photography
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/club/competitions" className="text-gray-700 hover:text-black">
              Competitions
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/club/events" className="text-gray-700 hover:text-black bg-gray-300 rounded p-1">
              Events
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/club/events" className="text-gray-700 hover:text-black">
              Events
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/club/events" className="text-gray-700 hover:text-black">
              Events
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/club/events" className="text-gray-700 hover:text-black">
              Events
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/club/events" className="text-gray-700 hover:text-black">
              Events
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/club/events" className="text-gray-700 hover:text-black">
              Events
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/club/events" className="text-gray-700 hover:text-black">
              Events
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/club/events" className="text-gray-700 hover:text-black">
              Events
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/club/events" className="text-gray-700 hover:text-black">
              Events
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/club/events" className="text-gray-700 hover:text-black">
              Events
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/club/events" className="text-gray-700 hover:text-black">
              Events
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ClubSideBar;
