import * as z from "zod";
import api from "@/api/api.ts";

const isUsernameAvailable = async (username: string): Promise<boolean> => {
  const res = await api.post(
    "username-availability",
    {
      username: username,
  });

  const responseBody: { usernameAvailable: string } = res.data;

  return responseBody.usernameAvailable === "true";
};

export const signUpFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must have a minimum length of 2.",
    })
    .max(50, {
      message: "Username must have a maximum length of 50.",
    })
    .refine(isUsernameAvailable, {
      message: "Username already exists.",
    }),
  password: z
    .string()
    .min(8, {
      message: "Password must have a minimum length of 8.",
    })
    .max(255, {
      message: "Password must have a maximum length of 255.",
    }),
});
