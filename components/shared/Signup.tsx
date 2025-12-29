"use client";

import Link from "next/link";
import React from "react";

import InputField from "@/components/user/form/InputField";
import { useForm } from "react-hook-form";
import { SignupSchema, SignupType } from "@/lib/ValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import { Button } from "../ui/button";

const Signup = () => {
  const form = useForm<SignupType>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });
  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-6 rounded-md border p-6 shadow-md">
      <Form {...form}>
        <form className="space-y-8">
          <InputField
            control={form.control}
            name="name"
            label="Full name"
            placeholder="Full name"
          />
          <InputField
            control={form.control}
            name="email"
            label="Email"
            placeholder="name@gamil.com"
          />

          <InputField
            control={form.control}
            name="password"
            label="Password"
            placeholder="********"
          />
          <Button type="submit" className="w-full cursor-pointer">
            Sign Up
          </Button>
        </form>
      </Form>

      <div className="flex justify-center gap-2">
        <p>Already have an account?</p>
        <Link href="/login" className="text-blue-500">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Signup;
