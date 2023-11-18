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
import api  from "@/api/api.ts";
import {loginFormSchema} from "@/validations/login-validation.ts";
import {useAuth} from "@/context/auth-context.tsx";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {
  const { token, onLogin, onLogout, } = useAuth();
  const navigate = useNavigate();

  // Define form
  const loginForm = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });


  if (token) {
    api.post("/verify-token",).then((response) => {
      if (response.status !== StatusCodes.OK) {
        onLogout();
      } else {
        navigate("/album");
      }
    });
  }

  // Define submit handler
  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
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
      navigate("/album");
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
