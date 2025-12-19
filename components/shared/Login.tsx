"use client";
import InputField from "@/components/user/form/InputField";
import { loginSchema, LoginType } from "@/lib/ValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "./ui/button";
import Link from "next/link";
import google from "@/asset/image/icons8-google-48.png";
import Image from "next/image";
import { signIn } from "@/lib/auth-client";

const Login = () => {
  const form = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });
  const SocialLogin = async () => {
    const data = await signIn.social({
      provider: "google",
      callbackURL: `http://localhost:3000/`,
    });
  };
  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-6 rounded-md border p-6 shadow-md">
      <Form {...form}>
        <form className="space-y-8">
          <InputField
            control={form.control}
            name="email"
            label="Email"
            placeholder="name@example.com"
          />
          <InputField
            control={form.control}
            name="password"
            label="Password"
            placeholder="Password"
          />
          <Button type="submit" className="w-full cursor-pointer">
            Sign In
          </Button>
        </form>
      </Form>
      <div className="mt-2 flex items-center gap-1">
        <hr className="w-full" />
        or
        <hr className="w-full" />
      </div>
      <Button
        className="flex cursor-pointer items-center gap-2"
        variant={"outline"}
        onClick={SocialLogin}
      >
        <Image
          src={google}
          alt="google"
          width={20}
          height={20}
          className="h-8 w-8"
        />
        Login with Google
      </Button>
      <div className="flex justify-center gap-2">
        <p>Don't have an account?</p>
        <Link href="/register" className="text-blue-500">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Login;
