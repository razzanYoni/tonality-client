// "use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { Link, useNavigate } from "react-router-dom";
import { StatusCodes } from "http-status-codes";
import { useToast } from "@/components/ui/use-toast.ts";
import api from "@/api/api.ts";
import {signUpFormSchema} from "@/validations/signup-validation.ts";


const SignUpPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  // Define form
  const signUpForm = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Define submit handler
  async function onSubmit(values: z.infer<typeof signUpFormSchema>) {
    const res = await api.post("/signup", {
      username: values.username,
      password: values.password,
    });

    if (res.status === StatusCodes.OK) {
      toast({
        description: "You have successfully signed up for Tonality!",
      });
      navigate("/login");
    }
  }

  return (
    <div className="flex flex-col">
      <Form {...signUpForm}>
        <form
          onSubmit={signUpForm.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <FormField
            control={signUpForm.control}
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
            control={signUpForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Sign Up</Button>
        </form>
      </Form>

      <div className="text-neutral-100 mt-6">
        Already have an account?{" "}
        <Link to="/login" className="underline">
          Login here
        </Link>
        .
      </div>
    </div>
  );
};

export default SignUpPage;
