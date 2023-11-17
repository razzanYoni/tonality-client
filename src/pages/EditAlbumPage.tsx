import {ChangeEventHandler, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { date, object, string } from 'zod';
import api from "@/api/api.ts";

const albumSchema = object({
  albumName: string().min(1, "Album Name cannot be empty"),
  releaseDate: date(),
  genre: string().min(1, "Genre cannot be empty"),
  artist: string().min(1, "Artist cannot be empty"),
  coverFile: string().nullable(),
});

export default function EditAlbum() {
  const { albumId } = useParams();
  const [albumData, setAlbumData] = useState({
    albumName: '',
    releaseDate: '',
    genre: '',
    artist: '',
    coverFile: null
  });

  useEffect(() => {
    const fetchAlbumData = async () => {
      try {
        const response = await api.get(
          `/premium-album/${albumId}`
        );
        setAlbumData(response.data);
      } catch (error) {
        console.error('Error fetching album data:', error);
      }
    };

    fetchAlbumData();
  }, [albumId]);

  const handleEditAlbum = async () => {
    try {
      albumSchema.parse(albumData);
      await api.patch(
        `/premium-album/${albumId}`,
        albumData
      );

      console.log('Album edited successfully!');
    } catch (error) {
      console.error('Error editing album:', error);
    }
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setAlbumData({ ...albumData, [e.target.id]: e.target.value });
  };

  return (
    <div className="w-full max-w-xs ml-[450px] mt-[50px]">
      <form id="edit-form" className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-2 text-2xl font-bold">
            Edit Album
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="albumName">
            Album Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="albumName"
            type="text"
            placeholder="Artist"
            onChange={handleChange}
            value={albumData.albumName}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="releaseDate">
            Release Date
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="releaseDate"
            type="date"
            onChange={handleChange}
            value={albumData.releaseDate}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="genre">
            Genre
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="genre"
            type="text"
            placeholder="Genre"
            value={albumData.genre}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="artist">
            Artist
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="artist"
            type="text"
            placeholder="Artist"
            onChange={handleChange}
            value={albumData.artist}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="coverFile">
            Cover File
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="coverFile"
            type="file"
            accept="image/*"
          />
        </div>
        <div className="flex items-center justify-center">
          <button onClick={handleEditAlbum} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Edit
          </button>
        </div>
      </form>
    </div>
  );
}
