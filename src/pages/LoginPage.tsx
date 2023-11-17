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
import { StatusCodes } from "http-status-codes";
import {useAuth} from "@/TonalityApp.tsx";
import api from "@/api/api.ts";
import {loginFormSchema} from "@/validations/login-validation.ts";


const LoginPage = () => {
  // Define form
  const loginForm = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const { onLogin } = useAuth();

  // Define submit handler
  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    console.log("values", values);
    try {
      const res = await api.post(
        "login",
        {
          username: values.username,
          password: values.password,
        },
        {
          headers: {
            "access-control-expose-headers" : "Set-Cookie",
          }
        },
      );

      onLogin(res.data.accessToken, values.username);
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
                  <Input type={"password"} placeholder="" {...field} />
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
