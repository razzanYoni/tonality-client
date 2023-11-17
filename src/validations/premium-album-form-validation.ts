import {object, string} from "zod";

export const albumFormSchema = object({
  albumName: string().min(1, "Album Name cannot be empty"),
  releaseDate: string().refine((str) => {
    if (!str || isNaN(Date.parse(str))) {
      return false;
    }
    return true;
  }, "Release Date must be a date"),
  genre: string().min(1, "Genre cannot be empty"),
  artist: string().min(1, "Artist cannot be empty"),
});
