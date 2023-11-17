import { useState } from "react";
import { useParams } from "react-router";
import { number, object, string } from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import api from "@/api/api.ts";

const songSchema = object({
  title: string().min(1, "Title cannot be empty"),
  artist: string().min(1, "Artist cannot be empty"),
  songNumber: number().int("Song Number must be an integer").min(1, "Song Number must be greater than or equal to 1"),
  discNumber: number().int("Disc Number must be an integer").min(1, "Disc Number must be greater than or equal to 1"),
  duration: number().int("Duration must be an integer").min(1, "Duration must be greater than or equal to 1"),
});

const AddSong = () => {
  const { albumId }= useParams();
  const form = useForm({
    resolver: zodResolver(songSchema),
    defaultValues: {
      title: "",
      artist: "",
      songNumber: "",
      discNumber: "",
      duration: "",
    }
  })
  const [audioFile, setAudioFile] = useState<File | null>(null);

  const handleAddSong = form.handleSubmit(async (data) => {
    try {
      const form = document.getElementById("addForm") as HTMLFormElement;
      const submitter = document.getElementsByTagName("button[type=submit]")[0] as HTMLElement;
      const formData = new FormData(form, submitter);
      if (audioFile == null) {
        alert("Please select an audio file.");
        return;
      }
      formData.append("title", data.title);
      formData.append("artist", data.artist);
      formData.append("songNumber", data.songNumber);
      formData.append("discNumber", data.discNumber);
      formData.append("duration", data.duration);
      formData.append("audioFile", audioFile);

      await api.post(`/premium-album/${albumId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Song added successfully!");
    } catch (error) {
      console.error("Error adding Song:", error);
    }
  });

    return (
      <div className="w-full max-w-xs ml-[450px] mt-[50px]">
        <form id="addForm" className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleAddSong}>
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
              onChange={(e) => {
                if (e.target.files) {
                  setAudioFile(e.target.files[0]);
              }}}
            />
          </div>

          <div className="flex items-center justify-center">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Add
            </button>
          </div>
        </form>
      </div>
    );
  }

export default AddSong;
