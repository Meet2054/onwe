import React from 'react'
import Magazines from './Magazines'
import Hots from './Hots'
import Events from './Events'
const Rightcomponent = () => {
  return (
    <div className='col-4 col-lg-3 px-4'>
      <Magazines/>
      <Hots/>
      <Events/>
    </div>
  )
}

export default Rightcomponent