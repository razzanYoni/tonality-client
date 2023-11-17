import {useState} from "react";
import axios from "axios";
import { date, object, string, z } from "zod";

const albumSchema = object({
  albumName: string().min(1, "Album Name cannot be empty"),
  releaseDate: date(),
  genre: string().min(1, "Genre cannot be empty"),
  artist: string().min(1, "Artist cannot be empty"),
});

export default function AddAlbum() {
  const [albumName, setAlbumName] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [genre, setGenre] = useState("");
  const [artist, setArtist] = useState("");
  const [coverFile, setCoverFile] = useState(null);

  const handleAddAlbum = async () => {
    try {
      const form = document.getElementById("addForm") as HTMLFormElement;
      const submitter = document.getElementsByTagName("button[type=submit]")[0] as HTMLElement;
      const formData = new FormData(form, submitter);
      formData.append("albumName", albumName);
      formData.append("releaseDate", releaseDate);
      formData.append("genre", genre);
      formData.append("artist", artist);
      if (coverFile !== null) {
        formData.append("coverFile", coverFile);
      }

      // Validate
      albumSchema.parse({ albumName, releaseDate, genre, artist });

      await axios.post("http://localhost:3000/api/premium-album", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Album added successfully!");
    } catch (error) {
      console.error("Error adding album:", error);
    }
  };

    return (
      <div className="w-full max-w-xs ml-[450px] mt-[50px]">
        <form id="addForm" className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-2 text-2xl font-bold">
            Add Album
        </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="albumName">
              Album Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="albumName"
              type="text"
              placeholder="Album Name"
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
            <button onClick={handleAddAlbum} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Add
            </button>
          </div>
        </form>

      </div>
    );
  }
