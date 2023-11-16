import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router";

const AddSong = () => {
  const { albumId }= useParams();
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [songNumber, setSongNumber] = useState("");
  const [discNumber, setDiscNumber] = useState("");
  const [duration, setDuration] = useState("");
  const [audioFile, setAudioFile] = useState(null);

  const handleAddSong = async () => {
    try {
      const form = document.getElementById("addForm") as HTMLFormElement;
      const submitter = document.getElementsByTagName("button[type=submit]")[0] as HTMLElement;
      const formData = new FormData(form, submitter);
      formData.append("title", title);
      formData.append("artist", artist);
      formData.append("songNumber", songNumber);
      formData.append("discNumber", discNumber);
      formData.append("duration", duration);
      if (audioFile !== null) {
        formData.append("audioFile", audioFile);
      }

      await axios.post(`http://localhost:3000/api/premium-album/${albumId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Song added successfully!");
    } catch (error) {
      console.error("Error adding Song:", error);
    }
  };

    return (
      <div className="w-full max-w-xs ml-[450px] mt-[50px]">
        <form id="addForm" className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-2 text-2xl font-bold">
            Add Song
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
            />
          </div>

          <div className="flex items-center justify-center">
            <button onClick={handleAddSong} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Add
            </button>
          </div>
        </form>
      </div>
    );
  }

export default AddSong;
