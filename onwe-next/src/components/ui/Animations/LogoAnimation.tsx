import React from 'react';

import './LogoAnimation.css'; // Ensure to place the CSS in a separate file or include it in your global styles.
import onwe from '../../SideBar/sideBarImages/output-onlinepngtools.png'
import Image from 'next/image';

const LogoAnimation: React.FC = () => {
  return (
    <div className="main">
      <div className="logo">
        <Image
          src={onwe}
          alt="preloader animated logo"
          className="preAnimLogo"
        />
      </div>
    </div>
  );
};

export default LogoAnimation;
