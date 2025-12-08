import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { EditorProps } from "@/lib/types";
import { SummarySchema, SummaryType } from "@/lib/ValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const SummaryInfo = ({ resumeData, setResumeData }: EditorProps) => {
  const form = useForm<SummaryType>({
    resolver: zodResolver(SummarySchema),
    defaultValues: {
      summary: resumeData.summary || "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (value) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({
        ...resumeData,
        summary: value.summary,
      });
    });
    return unsubscribe;
  }, [form, resumeData, setResumeData]);
  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">Professional Summary</h2>
        <p className="text-muted-foreground text-sm">
          Write a short description of for your resume or let the AI generate
          one from your entered data
        </p>
      </div>
      <Form {...form}>
        <form action="" className="space-y-3">
          <FormField
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Professional Summary</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="A brief engaging text about your self"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default SummaryInfo;
