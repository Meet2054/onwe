import TopClubs from '@/components/explore/TopClubs';
import TopPosts from '@/components/explore/TopPosts';
import React from 'react';

const Page = () => {
  return (
    <div className='flex flex-col h-screen overflow-y-auto p-4'>
          <TopClubs/>
          <TopPosts/>
    </div>
  );
}

export default Page;
