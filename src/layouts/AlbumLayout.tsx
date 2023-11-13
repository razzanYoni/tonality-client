// import React, { ReactNode } from 'react';
import Sidebar from '../components/sidebar';
import AlbumPage from '../pages/AlbumsPage';

// interface AlbumLayoutProps {
//   children: ReactNode;
// }

const AlbumLayout= () => {
  return (
    <div className="flex">
      <Sidebar></Sidebar>
      <div className='pl-20 pr-10'>
       <AlbumPage></AlbumPage>
      </div>
    </div>
  );
};

export default AlbumLayout;
