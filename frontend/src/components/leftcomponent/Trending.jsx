import React from 'react'
import { useState } from 'react'
const Trending = () => {
    const [trending,Gettrending]=useState([{"id":1,"name":"Coding"},{"id":2,"name":"Photography"},{"id":3,"name":"Competitions"}])
  return (
    <div className='border border-gray border-2 rounded m-2 p-4'>
        <div>
            <h5  className='heading-trending color-trending'>Trending</h5>
        </div>
        <div className='text-leftsection'>
            {trending.map(item=>
                <p key={item.id} className='trending-p py-1'>{item.name}</p>
            )}
        </div>
    </div>
  )
}

export default Trending