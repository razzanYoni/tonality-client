import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

const EditSong = () => {
  const { albumId, songId } = useParams();
  const [songsData, setSongsData] = useState({
    title: '',
    artist: '',
    songNumber: '',
    discNumber: '',
    duration: '',
    audioFile: null
  });

  const handleEditSong = async () => {
    try {
      await axios.patch(
        `/api/premium-album/${albumId}/${songId}`,
        songsData
      );

      console.log('Album edited successfully!');
    } catch (error) {
      console.error('Error editing album:', error);
    }
  };

  const handleChange = (e: { target: { id: any; value: any; }; }) => {
    setSongsData({ ...songsData, [e.target.id]: e.target.value });
  };

    return (
      <div className="w-full max-w-xs ml-[450px] mt-[50px]">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-2 text-2xl font-bold">
            Edit Song
        </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              placeholder="Title"
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
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="songNumber">
              Song Number
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="songNumber"
              type="text"
              placeholder="Song Number"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="discNumber">
              Disc Number
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="discNumber"
              type="text"
              placeholder="Disc Number"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="duration">
              Duration
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="duration"
              type="text"
              placeholder="Duration"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="audioFile">
              Audio File
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="audioFile"
              type="file"
              accept="audio/*"
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center justify-center">
            <button onClick={handleEditSong} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
              Edit
            </button>
          </div>
        </form>
      </div>
    );
  }

export default EditSong;
