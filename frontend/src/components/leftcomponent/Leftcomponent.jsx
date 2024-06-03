import React from 'react'
import Logo from './Logo'
import Trending from './Trending'
import Myclubs from './Myclubs'
import Announce from './Announce'
import Lprofile from './Lprofile'

const Leftcomponent = () => {
  return (
    <div className='col-2 col-lg-2 p-2 l-fixed'>
      <Logo/>
      <Trending/>
      <Myclubs/>
      <Announce/>
      <Lprofile/>
    </div>
  )
}

export default Leftcomponent