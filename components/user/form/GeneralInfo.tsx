import { useForm } from "react-hook-form";
import { generalInfoSchema, GeneralInfoType } from "@/lib/ValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import InputField from "./InputField";
import { EditorProps } from "@/lib/types";
import { useEffect } from "react";

const GeneralInfo = ({ resumeData, setResumeData }: EditorProps) => {
  const form = useForm<GeneralInfoType>({
    resolver: zodResolver(generalInfoSchema),
    defaultValues: {
      title: resumeData.title || "",
      description: resumeData.description || "",
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
        <h2 className="text-2xl font-semibold">General Info</h2>
        <p className="text-muted-foreground text-sm">
          This will not appear on your resume
        </p>
      </div>
      <Form {...form}>
        <form className="space-y-8">
          <InputField
            control={form.control}
            name="title"
            label="Project Name"
            placeholder="My cool resume."
          />
          <InputField
            control={form.control}
            name="description"
            label="Project Description"
            placeholder="My project description."
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default GeneralInfo;
