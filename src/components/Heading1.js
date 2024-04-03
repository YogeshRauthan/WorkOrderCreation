import React, { useState } from 'react';
import arrowSvg from './left_arrow.svg';
import './utility.css';
import Drawer from './drawer';

export default function Heading1() {
  const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(false);

  const handleClick = () => {
    setIsRightDrawerOpen(true);
  };

  return (
    <div className='layer1'>
      <div className='imgandOrder'>
        <img src={arrowSvg} alt='' />
        <div className='text1'>Create Workorder</div>
      </div>
      <button className='save' onClick={handleClick}>Save</button>
      <Drawer isOpen={isRightDrawerOpen} onClose={() => setIsRightDrawerOpen(false)} />
    </div>
  );
}
