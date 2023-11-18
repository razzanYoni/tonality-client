import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import api from "@/api/api.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useNavigate} from "react-router";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {albumFormSchema} from "@/validations/premium-album-form-validation.ts";
import {useAuth} from "@/context/auth-context.tsx";
import {StatusCodes} from "http-status-codes";


export default function EditAlbum() {
  const { onLogout } = useAuth();
  const navigate = useNavigate();
  const { albumId } = useParams();
  const [coverFile, setCoverFile] = useState<File | null>(null);

  const form = useForm({
    resolver: zodResolver(albumFormSchema),
    defaultValues: {
      albumName: "",
      releaseDate: "",
      genre: "",
      artist: "",
    }
  })

  useEffect(() => {
    const fetchAlbumData = async () => {
      try {
        api.post("/verify-token",).then((response) => {
          if (response.status !== StatusCodes.OK) {
            onLogout();
          }
        });

        const response = await api.get(
          `/premium-album/${albumId}`
        );

        form.setValue("albumName", response.data.data.albumName);

        const releaseDate = new Date(response.data.data.releaseDate);
        releaseDate.setHours(0, 0, 0, 0);
        const formattedReleaseDate = releaseDate.toISOString().split('T')[0];

        form.setValue("releaseDate", formattedReleaseDate);
        form.setValue("genre", response.data.data.genre);
        form.setValue("artist", response.data.data.artist);

        console.log('Album data fetched successfully!');
      } catch (error) {
        console.error('Error fetching album data:', error);
      }
    };

    fetchAlbumData();
  }, [albumId]);

  const handleEditAlbum = form.handleSubmit( async (data) => {
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

      api.post("/verify-token",).then((response) => {
        if (response.status !== StatusCodes.OK) {
          onLogout();
        }
      });

      await api.patch(
        `/premium-album/${albumId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      navigate(`/${albumId}/songs`);
      console.log('Album edited successfully!');
    } catch (error) {
      console.error('Error editing album:', error);
    }
  });

  return (
    <div className="w-full max-w-xs ml-[450px] mt-[50px]">
      <Form {...form}>
        <form id="edit-form" className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleEditAlbum}>
          <div className="mb-2 text-2xl font-bold">
              Edit Album
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
                const files = e.target.files;
                if (files && files.length > 0) {
                  setCoverFile(files[0]);
                }}}
            />
          </div>
          <div className="flex items-center justify-center">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Edit
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
}
