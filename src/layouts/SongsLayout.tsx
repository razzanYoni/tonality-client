// import React, { ReactNode } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from '../components/sidebar';
import SongsPage from '../pages/SongsPage';
import EditSong from '@/pages/EditSongPage';
import AddSong from '@/pages/AddSongPage';
// import DeleteSongDialog from '@/components/delete-dialog-song';

const SongsLayout= () => {
  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar></Sidebar>
        <div className='ml-20 pr-10'>
          <Routes>
            <Route path="/1/songs" element={<SongsPage></SongsPage>} />
            <Route path="/1/edit-song/1" element={<EditSong></EditSong>} />
            <Route path="/1/add-song" element={<AddSong></AddSong>} />
            {/*<Route path="/1/delete-song/1" element={<DeleteSongDialog></DeleteSongDialog>} />*/}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default SongsLayout;
