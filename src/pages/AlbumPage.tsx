import React, { useEffect, useState } from 'react';
import AlbumCard from '@/components/album-card';
import "../styles/Albums.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface PremiumAlbum {
  albumId: number;
  albumName: string;
  releaseDate: Date;
  genre: string;
  artist: string;
  coverFilename: string;
}

const AlbumPage: React.FC = () => {
  const [dataAlbums, setDataAlbums] = useState<PremiumAlbum[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/premium-album");
        console.log(response);

        setDataAlbums(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const toAddAlbum = () => {
    navigate('/add-album', );
  }

    return (
      <div className="album-page pt-12">
        <button className="bg-white hover:bg-gray-300 px-4 py-2 rounded absolute top-10 right-10" onClick={toAddAlbum}>
        Add Album
        </button>
        {dataAlbums.map((album) => (
          <AlbumCard key={album.albumId} {...album} />
        ))}
      </div>
    );
  };

  export default AlbumPage;
