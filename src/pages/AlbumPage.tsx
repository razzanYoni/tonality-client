import React from 'react';
import AlbumCard from '@/components/album-card';
import "../styles/Albums.css";


const AlbumPage: React.FC = () => {
    const albums = [
      { id: 1, title: 'Album 1', description: 'Deskripsi Album 1', imageUrl: 'src/assets/images/default-cover.jpg' },
      { id: 2, title: 'Album 2', description: 'Deskripsi Album 2', imageUrl: 'src/assets/images/default-cover.jpg' },
      { id: 3, title: 'Album 3', description: 'Deskripsi Album 3', imageUrl: 'src/assets/images/default-cover.jpg' },
      { id: 4, title: 'Album 4', description: 'Deskripsi Album 4', imageUrl: 'src/assets/images/default-cover.jpg' },
      { id: 5, title: 'Album 5', description: 'Deskripsi Album 5', imageUrl: 'src/assets/images/default-cover.jpg' },
      { id: 6, title: 'Album 6', description: 'Deskripsi Album 6', imageUrl: 'src/assets/images/default-cover.jpg' },
      { id: 7, title: 'Album 7', description: 'Deskripsi Album 7', imageUrl: 'src/assets/images/default-cover.jpg' },
      { id: 8, title: 'Album 8', description: 'Deskripsi Album 8', imageUrl: 'src/assets/images/default-cover.jpg' },
      { id: 9, title: 'Album 9', description: 'Deskripsi Album 9', imageUrl: 'src/assets/images/default-cover.jpg' },
      { id: 10, title: 'Album 10', description: 'Deskripsi Album 10', imageUrl: 'src/assets/images/default-cover.jpg' },
    ];

    return (
      <div className="album-page pt-12">
        <button className="bg-white hover:bg-gray-300 px-4 py-2 rounded absolute top-10 right-10">
        Add Album
        </button>
        {albums.map((album) => (
          <AlbumCard key={album.id} {...album} />
        ))}
      </div>
    );
  };

  export default AlbumPage;
