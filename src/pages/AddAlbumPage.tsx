import {useState} from "react";
import api from "@/api/api.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {albumFormSchema} from "@/validations/premium-album-form-validation.ts";

export default function AddAlbum() {
  const form = useForm({
    resolver: zodResolver(albumFormSchema),
    defaultValues: {
      albumName: "",
      releaseDate: "",
      genre: "",
      artist: "",
    }
  })
  const [coverFile, setCoverFile] = useState<File | null>(null);

  const handleAddAlbum = form.handleSubmit(async (data) => {
    try {
      const formData = new FormData();
      if (coverFile == null) {
        alert("Please select a cover file.");
        return;
      }
      formData.append("albumName", data.albumName);
      const releaseDate = new Date(data.releaseDate);
      releaseDate.setHours(0, 0, 0, 0);
      formData.append("releaseDate", releaseDate.toISOString());
      formData.append("genre", data.genre);
      formData.append("artist", data.artist);
      formData.append("coverFile", coverFile);

      await api.post("/premium-album",
        formData,
        {
          headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      form.reset();
      setCoverFile(null);
      console.log("Album added successfully!");
    } catch (error) {
      console.error("Error adding album:", error);
    }
  });

    return (
      <div className="w-full max-w-xs ml-[450px] mt-[50px]">
        <Form {...form}>
          <form id="addForm"className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleAddAlbum}>
            <div className="mb-2 text-2xl font-bold">
                Add Album
            </div>
            <FormField
              control={form.control}
              name="albumName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={"text-black"}>Title</FormLabel>
                  <FormControl>
                    <Input className={"bg-white text-black placeholder:text-black"} placeholder="Album Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="releaseDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={"text-black"}>Release Date</FormLabel>
                  <FormControl>
                    <Input type="date" className={"bg-white text-black placeholder:text-black"} placeholder="Release Date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="genre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={"text-black"}>Genre</FormLabel>
                  <FormControl>
                    <Input className={"bg-white text-black placeholder:text-black"} placeholder="Genre" {...field} />
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

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="coverFile">
                Cover File
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="coverFile"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files) {
                    setCoverFile(e.target.files[0]);
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
