import { useEffect, useState } from 'react';
import AlbumCard from '@/components/album-card';
import "../styles/Albums.css";
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import api from "@/api/api.ts";
import {PremiumAlbum} from "@/types/premium-album.ts";
import {StatusCodes} from "http-status-codes";
import {useAuth} from "@/context/auth-context.tsx";

// TODO : Prettier pagination
const AlbumPage = () => {
  const { onLogout } = useAuth();
  const [dataAlbums, setDataAlbums] = useState<PremiumAlbum[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const fetchData = async (page: number) => {
    try {
      api.post("/verify-token",).then((response) => {
        if (response.status !== StatusCodes.OK) {
          onLogout();
        }
      });

      const response = await api.get(
        `/premium-album?page=${page}`);

      setDataAlbums(() => [...response.data.data]);
      setTotalPages(response.data.paging.totalPages);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(true);
    }
  };

  useEffect(() => {
    const interval = setInterval(function () {fetchData(currentPage)}, 1000); // 100 milliseconds
    return () => clearInterval(interval);
  }, [dataAlbums]);

  const toAddAlbum = () => {
    navigate('/add-album', );
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

    return (
      <div className="album-page pt-12">
        <button className="bg-white hover:bg-gray-300 px-4 py-2 rounded absolute top-10 right-10" onClick={toAddAlbum}>
        Add Album
        </button>
        {
          loading ? <div className="text-white">Loading . . .</div> :
          dataAlbums.map((album) => (
          <AlbumCard key={album.albumId} {...album} />
          ))
        }
        <div className="space-x-2">
          <Button variant="outline" size="sm" onClick={handlePreviousPage}>
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={handleNextPage}>
            Next
          </Button>
      </div>
      </div>
    );
  };

  export default AlbumPage;
