import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='py-3 navbar'>
        <p className='p-nav'><NavLink to="/Social" activeClassName="active">Social Engagement</NavLink></p>
        <p className='p-nav'><NavLink to="/Academia" activeClassName="active">Academia</NavLink></p>
        <p className='p-nav'><NavLink to="/Literature" activeClassName="active">Literature</NavLink></p>
        <p className='p-nav'><NavLink to="/Discussions" activeClassName="active">Discussions</NavLink></p>
        <p className='p-nav'><NavLink to="/Sports" activeClassName="active">Sports</NavLink></p>
        <p className='p-nav'><NavLink to="/Artafashion" activeClassName="active">Art & Fashion</NavLink></p>
    </div>
  );
}

export default Navbar;
