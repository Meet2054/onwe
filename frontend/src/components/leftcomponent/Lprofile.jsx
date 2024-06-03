import React from 'react'

const Lprofile = () => {
  return (
    <div className='p-2 m-2'>
        <div className='new-post mx-2 my-4 heading-trending'>
            <i className="bi bi-plus"></i><p className='d-inline px-2'>New Post</p>
        </div>
        <div className='explore mx-2 my-4 heading-trending'>
            <i className="bi bi-compass"></i><p className='d-inline px-2'>Explore</p>
        </div>
        <div className='profile mx-2 my-4'>
            <i className="bi bi-person-circle"></i><p className='d-inline px-2 text-leftsection'>Dharmaveer </p>
        </div>
        
    </div>
  )
}

export default Lprofile