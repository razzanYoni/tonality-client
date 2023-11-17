import {number, object, string} from "zod";

export const songFormSchema = object({
  title: string().min(1, "Title cannot be empty"),
  artist: string().min(1, "Artist cannot be empty"),
  songNumber: number().min(1, "Song Number must be greater than or equal to 1"),
  discNumber: number().min(1, "Disc Number must be greater than or equal to 1"),
  duration: number().min(1, "Duration must be greater than or equal to 1"),
});
