import { useState } from "react";
import { useParams } from "react-router";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import api from "@/api/api.ts";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {songFormSchema} from "@/validations/premium-song-form-validation.ts";
import {StatusCodes} from "http-status-codes";
import {useAuth} from "@/context/auth-context.tsx";


const AddSong = () => {
  const { onLogout } = useAuth();
  const { albumId }= useParams();
  const form = useForm({
    resolver: zodResolver(songFormSchema),
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
      const formData = new FormData();
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
      formData.append("albumId", albumId?.toString() ?? "");

      api.post("/verify-token",).then((response) => {
        if (response.status !== StatusCodes.OK) {
          onLogout();
        }
      });

      await api.post(`/premium-album/${albumId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      form.reset();
      setAudioFile(null);

      console.log("Song added successfully!");
    } catch (error) {
      console.error("Error adding Song:", error);
      setAudioFile(null)
    }
  });

    return (
      <div className="w-full max-w-xs ml-[450px] mt-[50px]">
        <Form {...form}>
          <form id="addForm" className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col gap-y-4" onSubmit={handleAddSong}>
          <div className="mb-2 text-2xl font-bold">
              Add Song
          </div>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={"text-black"}>Title</FormLabel>
                  <FormControl>
                    <Input className={"bg-white text-black placeholder:text-black"} placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="artist"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={"text-black"}>Artist</FormLabel>
                  <FormControl>
                    <Input className={"bg-white text-black placeholder:text-black"} placeholder="Artist" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="songNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={"text-black"}>Song Number</FormLabel>
                  <FormControl>
                    <Input type="number" min={1} className={"bg-white text-black placeholder:text-black"} placeholder="Song Number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="discNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={"text-black"}>Disc Number</FormLabel>
                  <FormControl>
                    <Input type="number" min={1} className={"bg-white text-black placeholder:text-black"} placeholder="Disc Number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={"text-black"}>Duration</FormLabel>
                  <FormControl>
                    <Input type="number" min={1} className={"bg-white text-black placeholder:text-black"} placeholder="Duration" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
        </Form>
      </div>
    );
  }

export default AddSong;
