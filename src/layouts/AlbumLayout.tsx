// import React, { ReactNode } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from '../components/sidebar';
import AlbumPage from '../pages/AlbumPage';
import EditAlbum from '../pages/EditAlbumPage';
import AddAlbum from '../pages/AddAlbumPage';
import DeleteAlbumDialog from '@/components/delete-dialog-album';

// interface AlbumLayoutProps {
//   children: ReactNode;
// }

const AlbumLayout= () => {
  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar></Sidebar>
        <div className='ml-20 pr-10'>
          <Routes>
            <Route path="/albums" element={<AlbumPage></AlbumPage>} />
            <Route path="/1/edit-album" element={<EditAlbum></EditAlbum>} />
            <Route path="/add-album" element={<AddAlbum></AddAlbum>} />
            <Route path="/1/delete-album" element={<DeleteAlbumDialog></DeleteAlbumDialog>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default AlbumLayout;
