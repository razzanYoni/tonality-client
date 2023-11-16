"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";
import { storeAccessToken } from "@/utils/token.ts";
import { StatusCodes } from "http-status-codes";

const restApiUrl: string = import.meta.env.VITE_REST_API_URL;

const isUsernameInvalid = async (username: string): Promise<boolean> => {
  const res = await axios.post(restApiUrl + "username-availability", {
    username: username,
  });

  const responseBody: { usernameAvailable: string } = res.data;

  return responseBody.usernameAvailable === "false";
};

const loginFormSchema = z.object({
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

const LoginPage = () => {
  // Define form
  const loginForm = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Define submit handler
  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    try {
      const res = await axios.post(
        restApiUrl + "login",
        {
          username: values.username,
          password: values.password,
        },
        {
          withCredentials: true,
        },
      );

      storeAccessToken(res.data.accessToken);
    } catch (err) {
      if (
        axios.isAxiosError(err) &&
        err.response?.status === StatusCodes.UNAUTHORIZED
      ) {
        loginForm.setError("password", {
          message: "Invalid password.",
        });
      } else {
        // Handle other errors, such as network issues or server errors
        console.error("Error occurred during login:", err);
      }
    }
  }

  return (
    <div className="flex flex-col">
      <Form {...loginForm}>
        <form onSubmit={loginForm.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={loginForm.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={loginForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Login</Button>
        </form>
      </Form>

      <div className="text-neutral-100 mt-6">
        Don't have an account?{" "}
        <Link to="/signup" className="underline">
          Sign up for Tonality
        </Link>
        .
      </div>
    </div>
  );
};

export default LoginPage;
