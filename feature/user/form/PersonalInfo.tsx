"use client";
import { Button } from "@/components/ui/button";
import { personalInfoSchema, PersonalInfoType } from "@/lib/ValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import InputField from "./InputField";
import { Form } from "@/components/ui/form";
import { EditorProps } from "@/lib/types";

const PersonalInfo = ({ resumeData, setResumeData }: EditorProps) => {
  const form = useForm<PersonalInfoType>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      photo: undefined,
      firstName: resumeData.firstName || "",
      lastName: resumeData.lastName || "",
      jobTitle: resumeData.jobTitle || "",
      city: resumeData.city || "",
      country: resumeData.country || "",
      phone: resumeData.phone || "",
      email: resumeData.email || "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({
        ...resumeData,
        ...values,
      });
    });
    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-bold">Personal Info</h2>
        <p className="text-muted-foreground text-sm">Tell us about yourself</p>
      </div>

      <Form {...form}>
        <form
          className="space-y-8"
          onSubmit={form.handleSubmit((data) => console.log(data))}
        >
          <InputField
            control={form.control}
            name="photo"
            label="Photo"
            placeholder="Photo"
            isFile={true}
          />
          <div className="grid grid-cols-2 gap-4">
            <InputField
              control={form.control}
              name="firstName"
              label="First Name"
              placeholder="First Name"
            />
            <InputField
              control={form.control}
              name="lastName"
              label="Last Name"
              placeholder="Last Name"
            />
          </div>
          <InputField
            control={form.control}
            name="jobTitle"
            label="Job Title"
            placeholder="Job Title"
          />
          <InputField
            control={form.control}
            name="city"
            label="City"
            placeholder="City"
          />
          <InputField
            control={form.control}
            name="country"
            label="Country"
            placeholder="Country"
          />
          <InputField
            control={form.control}
            name="phone"
            label="Phone"
            placeholder="Phone"
          />
          <InputField
            control={form.control}
            name="email"
            label="Email"
            placeholder="Email"
          />
          <Button type="submit" className="w-full cursor-pointer">
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default PersonalInfo;
