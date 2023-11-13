import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AlbumLayout from '../layouts/AlbumLayout';
// import AlbumPage from '../pages/AlbumsPage';

const AlbumRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/albums" element={<AlbumLayout></AlbumLayout>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AlbumRouter;
