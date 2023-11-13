// import React, { ReactNode } from 'react';
import Sidebar from '../components/sidebar';
import SongsPage from '../pages/SongsPage';

const SongsLayout= () => {
  return (
    <div className="flex pl-20 pr-10">
      <Sidebar></Sidebar>
      <div className=''>
       <SongsPage/>
      </div>
    </div>
  );
};

export default SongsLayout;
