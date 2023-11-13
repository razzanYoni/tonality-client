import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SongsLayout from '../layouts/SongsLayout';
// import AlbumPage from '../pages/AlbumsPage';

const AlbumRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:albumId/songs" element={<SongsLayout></SongsLayout>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AlbumRouter;
