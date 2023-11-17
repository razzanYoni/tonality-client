import api from "@/api/api.ts";
import * as z from "zod";

const isUsernameInvalid = async (username: string): Promise<boolean> => {
  const res = await api.post("username-availability", {
    username: username,
  });

  const responseBody: { usernameAvailable: string } = res.data;

  return responseBody.usernameAvailable === "false";
};

export const loginFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username has a minimum length of 2.",
    })
    .max(50, {
      message: "Username has a maximum length of 50.",
    })
    .refine(isUsernameInvalid, {
      message: "User does not exist.",
    }),
  password: z
    .string()
    .min(8, {
      message: "Password has a minimum length of 8.",
    })
    .max(255, {
      message: "Password has a maximum length of 255.",
    }),
});
